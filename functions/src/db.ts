let admin = require('firebase-admin');
admin.initializeApp();

const firestore = admin.firestore();

export default firestore;