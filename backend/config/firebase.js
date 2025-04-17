const admin = require("firebase-admin");
const serviceAccount = require("./firebaseServiceAccountKey.json"); // 🔥 여기!

function initializeFirebase() {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

module.exports = { admin, initializeFirebase };