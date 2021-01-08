const functions = require("firebase-functions");
const app = require("express")();
const {
  getAllScreams,
  postScream,
  getScream,
  commentOnScream,
  likeScream,
  unLikeScream,
  deleteScream,
} = require("./handlers/screams");
const {
  signIn,
  signUp,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
  getUser,
  markNotificationsRead,
} = require("./handlers/users");
const FBAuth = require("./utils/fbAuth");

const { db } = require("./utils/admin");

// Scream routes
app.post("/scream", FBAuth, postScream);
app.get("/screams", getAllScreams);
app.get("/scream/:screamId", getScream);
app.delete("/scream/:screamId", FBAuth, deleteScream);
app.post("/scream/:screamId/comment", FBAuth, commentOnScream);
app.get("/scream/:screamId/like", FBAuth, likeScream);
app.get("/scream/:screamId/unlike", FBAuth, unLikeScream);

// User routes
app.post("/signup", signUp);
app.post("/signin", signIn);
app.post("/user/image", FBAuth, uploadImage);
app.post("/user", FBAuth, addUserDetails);
app.get("/user", FBAuth, getAuthenticatedUser);
app.get("/user/:handle", getUser);
app.post("/notifications", FBAuth, markNotificationsRead);

exports.api = functions.https.onRequest(app);

//Cloud triggers
exports.createNotificationOnLike = functions.firestore
  .document("likes/{likeId}")
  .onCreate((snapshot) => {
    return db
      .doc(`screams/${snapshot.data().screamId}`)
      .get()
      .then((doc) => {
        if (
          doc.exists &&
          doc.data().userHandle !== snapshot.data().userHandle
        ) {
          return db.doc(`notifications/${snapshot.id}`).set({
            sender: snapshot.data().userHandle,
            receiver: doc.data().userHandle,
            createdAt: new Date().toISOString(),
            screamId: doc.id,
            type: "like",
            read: false,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  });

exports.deleteNotificationOnUnLike = functions.firestore
  .document("likes/{likeId}")
  .onDelete((snapshot) => {
    return db
      .doc(`screams/${snapshot.data().screamId}`)
      .get()
      .then((doc) => {
        return db.doc(`notifications/${snapshot.id}`).delete();
      })
      .catch((err) => {
        console.error(err);
      });
  });

exports.createNotificationOnComment = functions.firestore
  .document("comments/{commentId}")
  .onCreate((snapshot) => {
    return db
      .doc(`screams/${snapshot.data().screamId}`)
      .get()
      .then((doc) => {
        if (
          doc.exists &&
          doc.data().userHandle !== snapshot.data().userHandle
        ) {
          return db.doc(`notifications/${snapshot.id}`).set({
            sender: snapshot.data().userHandle,
            receiver: doc.data().userHandle,
            createdAt: new Date().toISOString(),
            screamId: doc.id,
            type: "comment",
            read: false,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  });

exports.onImageChange = functions.firestore
  .document("users/{userId}")
  .onUpdate((change) => {
    previousData = change.before.data();
    nextData = change.after.data();
    if (previousData.imageUrl === nextData.imageUrl) {
      return true;
    }
    return db
      .collection(`screams`)
      .where("userHandle", "==", nextData.handle)
      .get()
      .then((docs) => {
        const batch = db.batch();
        docs.forEach((doc) => {
          const scream = db.doc(`screams/${doc.id}`);
          console.log(scream, { userImage: nextData.imageUrl });
          batch.update(scream, { userImage: nextData.imageUrl });
        });
        return batch.commit();
      })
      .catch((err) => {
        console.error(err);
      });
  });

exports.onScreamDelete = functions.firestore
  .document("/screams/{screamId}")
  .onDelete((change, context) => {
    const batch = db.batch();
    console.log("me");
    return db
      .collection("likes")
      .where("screamId", "==", context.params.screamId)
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          const like = db.doc(`likes/${doc.id}`);
          console.log(doc.data);
          batch.delete(like);
        });
        return db
          .collection("comments")
          .where("screamId", "==", context.params.screamId)
          .get();
      })
      .then((docs) => {
        docs.forEach((doc) => {
          const comment = db.doc(`comments/${doc.id}`);
          batch.delete(comment);
        });
        return db
          .collection("notifications")
          .where("screamId", "==", context.params.screamId)
          .get();
      })
      .then((docs) => {
        docs.forEach((doc) => {
          const notification = db.doc(`notifications/${doc.id}`);
          batch.delete(notification);
        });
        return batch.commit();
      })
      .catch((err) => console.error(err));
  });
