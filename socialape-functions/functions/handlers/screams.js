const { db } = require("../utils/admin");
const { validatePostScreamData } = require("../utils/validators");

exports.postScream = (req, res) => {
  const { isValid, errors } = validatePostScreamData(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newScream = {
    ...req.body,
    createdAt: new Date().toISOString(),
    userHandle: req.user.handle,
    userImage: req.user.imageUrl,
    likeCount: 0,
    commentCount: 0,
  };

  db.collection("screams")
    .add(newScream)
    .then((doc) => {
      newScream.screamId = doc.id;
      return res.json({ newScream });
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
};

exports.getAllScreams = (req, res) => {
  db.collection("screams")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      const screams = [];
      data.forEach((doc) =>
        screams.push({
          screamId: doc.id,
          ...doc.data(),
        })
      );
      return res.json(screams);
    })
    .catch((err) => console.error(err));
};

exports.getScream = (req, res) => {
  let screamData = {};
  console.log(req.params.screamId);
  db.doc(`Screams/${req.params.screamId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status("404").json("Scream not found");
      }
      screamData = doc.data();
      screamData.screamId = doc.id;
      return db
        .collection("comments")
        .where("screamId", "==", req.params.screamId)
        .orderBy("createdAt", "desc")
        .get();
    })
    .then((docs) => {
      screamData.comments = [];
      docs.forEach((doc) => {
        screamData.comments.push(doc.data());
      });
      return res.json(screamData);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ message: err.code });
    });
};

//posts comment on screams
exports.commentOnScream = (req, res) => {
  if (req.body.body == "") {
    return res.status(400).json({ comment: "Must not be empty" });
  }

  const commentData = {
    screamId: req.params.screamId,
    userHandle: req.user.handle,
    body: req.body.body,
    createdAt: new Date().toISOString(),
    imageUrl: req.user.imageUrl,
  };

  db.collection("comments")
    .add(commentData)
    .then(() => {
      return res.json(commentData);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ message: "Something went wrong" });
    });
};

//like a Scream
exports.likeScream = (req, res) => {
  let likeDocument = db
    .collection("likes")
    .where("userHandle", "==", req.user.handle)
    .where("screamId", "==", req.params.screamId)
    .limit(1);

  const screamDocument = db.doc(`screams/${req.params.screamId}`);
  let screamData;

  screamDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        screamData = doc.data();
        screamData.screamId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: "Scream does not exist" });
      }
    })
    .then((data) => {
      if (data.empty) {
        db.collection("likes")
          .add({
            userHandle: req.user.handle,
            screamId: req.params.screamId,
          })
          .then(() => {
            screamData.likeCount++;
            return screamDocument.update({ likeCount: screamData.likeCount });
          })
          .then(() => {
            return res.json(screamData);
          })
          .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: err });
          });
      } else {
        return res.status(400).json({ message: "Scream already liked" });
      }
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err });
    });
};

exports.unLikeScream = (req, res) => {
  let likeDocument = db
    .collection("likes")
    .where("userHandle", "==", req.user.handle)
    .where("screamId", "==", req.params.screamId)
    .limit(1);

  const screamDocument = db.doc(`screams/${req.params.screamId}`);
  let screamData;

  screamDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        screamData = doc.data();
        screamData.screamId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: "Scream does not exist" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return res.status(400).json({ message: "Scream not liked" });
      } else {
        db.doc(`likes/${data.docs[0].id}`)
          .delete()
          .then(() => {
            screamData.likeCount--;
            screamDocument.update({ likeCount: screamData.likeCount });
          })
          .then(() => {
            res.json(screamData);
          })
          .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: err });
          });
      }
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err });
    });
};

exports.deleteScream = (req, res) => {
  screamDocument = db.doc(`screams/${req.params.screamId}`);

  screamDocument
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json("Scream does not exist");
      }
      if (doc.data().userHandle !== req.user.handle) {
        return res.status(400).json("Unauthorized access");
      }
      screamDocument.delete();
    })
    .then(() => {
      return res.json("Scream deleted successfully");
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err });
    });
};
