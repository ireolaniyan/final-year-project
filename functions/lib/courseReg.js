"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
let courseRegDocRef = db_1.default.collection('courseRegistration').doc('courseRegData');
function courseRegistration(agent) {
    return __awaiter(this, void 0, void 0, function* () {
        let speech;
        try {
            const doc = yield courseRegDocRef.get();
            if (doc.exists) {
                if (agent.parameters.course === 'course' && agent.parameters.registration === 'registration') {
                    speech = `You can register your courses between ${doc.data().courseReg.start} and ${doc.data().courseReg.end}`;
                }
                else if (agent.parameters.course === 'course' && agent.parameters.edit === 'edit') {
                    speech = `That's from ${doc.data().courseEdit.start} to ${doc.data().courseEdit.end}`;
                }
                agent.add(speech);
            }
            else {
                console.log("Doc not found");
            }
        }
        catch (error) {
            console.log("An error occured", error);
        }
    });
}
exports.default = courseRegistration;
//# sourceMappingURL=courseReg.js.map