"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let admin = require('firebase-admin');
admin.initializeApp();
const firestore = admin.firestore();
exports.default = firestore;
//# sourceMappingURL=db.js.map