const { db, firebase, admin } = require("../utils/admin");
const {
  validateSignInData,
  validateSignUpData,
  validateUserDetails,
} = require("../utils/validators");
const config = require("../utils/config");

exports.signUp = (req, res) => {
  const newUser = { ...req.body };
  let token, userId;
  const noImg = "default-pic.png";

  const { isValid, errors } = validateSignUpData(newUser);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  db.doc(`users/${newUser.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({ handle: "this handle is already taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((tokenId) => {
      token = tokenId;
      const userCredentials = {
        email: newUser.email,
        handle: newUser.handle,
        createdAt: new Date().toISOString(),
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
        userId,
      };

      return db.doc(`/users/${newUser.handle}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ email: "This email is already taken" });
      } else {
        return res
          .status(500)
          .json({ GENERAL: "Something went wrong please try again" });
      }
    });
};

exports.signIn = (req, res) => {
  const { isValid, errors } = validateSignInData(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  firebase
    .auth()
    .signInWithEmailAndPassword(req.body.email, req.body.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token });
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(403)
        .json({ general: "Wrong credentials, please try again" });
    });
};

//add user details
exports.addUserDetails = (req, res) => {
  const userDetails = validateUserDetails(req.body);

  db.doc(`users/${req.user.handle}`)
    .update(userDetails)
    .then(() => {
      return res.json({ message: "User Details updated successfully" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

//get user details
exports.getAuthenticatedUser = (req, res) => {
  userDetails = {};
  db.doc(`users/${req.user.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userDetails.credentials = doc.data();
        return db
          .collection(`likes`)
          .where("userHandle", "==", req.user.handle)
          .get();
      }
    })
    .then((data) => {
      userDetails.likes = [];
      data.forEach((doc) => {
        userDetails.likes.push(doc.data());
      });
      return db
        .collection(`notifications`)
        .where("receiver", "==", req.user.handle)
        .orderBy("createdAt", "desc")
        .get();
    })
    .then((docs) => {
      userDetails.notifications = [];
      docs.forEach((doc) => {
        userDetails.notifications.push({
          ...doc.data(),
          notificationId: doc.id,
        });
      });
      return res.json(userDetails);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.uploadImage = (req, res) => {
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");

  const busboy = new BusBoy({ headers: req.headers });
  let imageName, imageToBeUploaded;

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype !== "image/png" && mimetype !== "image/jpeg") {
      return res.status(400).json({ error: "Wrong file type" });
    }

    const imageExtension = filename.split(".").pop();
    imageName = `${Math.round(Math.random() * 10000000)}.${imageExtension}`;
    const imagePath = path.join(os.tmpdir(), imageName);
    imageToBeUploaded = { imagePath, mimetype };
    file.pipe(fs.createWriteStream(imagePath));
  });

  busboy.on("finish", () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.imagePath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype,
          },
        },
      })
      .then(() => {
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageName}?alt=media`;
        db.doc(`users/${req.user.handle}`).update("imageUrl", imageUrl);
      })
      .then(() => {
        return res.json({ message: "Image was uploaded successfully" });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
      });
  });

  busboy.end(req.rawBody);
};

exports.getUser = (req, res) => {
  const userData = {};
  db.doc(`users/${req.params.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.user = doc.data();
        return db
          .collection("screams")
          .where("userHandle", "==", req.params.handle)
          .get();
      } else {
        return res.status(404).json({ message: "user not found" });
      }
    })
    .then((docs) => {
      userData.screams = [];
      docs.forEach((doc) => {
        userData.screams.push({
          ...doc.data(),
          screamId: doc.id,
        });
      });
      return res.json(userData);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err });
    });
};

exports.markNotificationsRead = (req, res) => {
  const batch = db.batch();
  const notificationIds = req.body;
  notificationIds.forEach((notificationId) => {
    const notification = db.doc(`notifications/${notificationId}`);
    batch.update(notification, { read: true });
  });
  batch
    .commit()
    .then(() => res.json({ message: "Notifications marked read" }))
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err });
    });
};
