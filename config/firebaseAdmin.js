const admin = require('firebase-admin');

// Initialize firebase admin SDK
const servicesAccount = require('./firebase-key.json')
admin.initializeApp({
    credential: admin.credential.cert(servicesAccount),
    storageBucket: process.env.STORAGE_BUCKET
})

// Cloud storage
const bucket = admin.storage().bucket();

module.exports = {
    bucket
}
