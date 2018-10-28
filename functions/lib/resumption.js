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
let resumptionDocRef = db_1.default.collection("academicCalendar").doc("resumptionData");
function resumptionDate(agent) {
    return __awaiter(this, void 0, void 0, function* () {
        let speech;
        try {
            const doc = yield resumptionDocRef.get();
            if (doc.exists) {
                speech = `The new session will start on ${doc.data().resumptionDate}`;
                if (agent.parameters.resumption === 'resumption' || agent.parameters.resumption === 'resumption' && agent.parameters.school === 'school' || agent.parameters.resumption === 'resumption' && agent.parameters.session === 'session' || agent.parameters.session === 'session' && agent.parameters.start === 'start')
                    agent.add(speech);
            }
            else {
                console.log("Resumption document not found");
            }
        }
        catch (error) {
            console.log("An error occured ", error);
        }
        ;
    });
}
exports.default = resumptionDate;
//# sourceMappingURL=resumption.js.map