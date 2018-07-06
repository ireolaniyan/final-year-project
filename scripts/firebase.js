const firebase = require('firebase');

const config = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId
};
console.log(config)

firebase.initializeApp(config);
const firestore = firebase.firestore();

module.exports = {
    firestore
};
