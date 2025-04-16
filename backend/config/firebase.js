//Firebase Admin SDK 초기화
const admin = require("firebase-admin");

function initializeFirebase() {
    admin.initializeApp({
        credential: admin.credential.applicationDefault()
    });
}

module.exports = {admin, initializeFirebase};