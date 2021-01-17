const admin = require("firebase-admin");
const firebase = require("firebase");
const firebaseConfig = require("./config");

//initialize app
admin.initializeApp();
firebase.initializeApp(firebaseConfig);

const db = admin.firestore();

module.exports = { admin, firebase, db };
