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
const dialogflow_fulfillment_1 = require("dialogflow-fulfillment");
const db_1 = require("./db");
let examDocRef = db_1.default.collection('academicCalendar').doc('examData');
let lectureDocRef = db_1.default.collection('academicCalendar').doc('lectureEndData');
function examDate(agent) {
    return __awaiter(this, void 0, void 0, function* () {
        let speech;
        try {
            const doc = yield examDocRef.get();
            if (doc.exists) {
                const examDates = {
                    examStart: `Examinations will start on ${doc.data().start}. Best of luck! 👍`,
                    examEnd: `By ${doc.data().end}, all faculties except Education should be through with exams 😁💃`,
                    exam: `Exam starts on ${doc.data().start} and ends on ${doc.data().end}`,
                    suggestion: 'Check for Faculty of Education'
                };
                let examSuggestion = examDates.suggestion;
                if (agent.action === 'examDate')
                    speech = examDates.exam;
                else if (agent.action === 'examEnd' || agent.action === 'examStartDateEnd')
                    speech = examDates.examEnd;
                else if (agent.action === 'examStart')
                    speech = examDates.examStart;
                agent.add(speech);
                agent.add(new dialogflow_fulfillment_1.Suggestion(examSuggestion));
            }
            else {
                console.log("Document not found");
            }
        }
        catch (error) {
            console.log("Error occured: ", error);
        }
        ;
    });
}
exports.examDate = examDate;
;
function educationExamDate(agent) {
    return examDocRef.get()
        .then(doc => doc.exists ? agent.add(`Examination in core courses in the Faculty of Education will take place between ${doc.data().facultyOfEducation.start} 
        and ${doc.data().facultyOfEducation.end}.`) : console.log('Education exam date not found'))
        .catch(error => console.log('An error occured: ', error));
}
exports.educationExamDate = educationExamDate;
function lectureEnd(agent) {
    return __awaiter(this, void 0, void 0, function* () {
        let speech;
        try {
            const doc = yield lectureDocRef.get();
            if (doc.exists) {
                const aboutLectures = {
                    end: `All lectures end on ${doc.data().end}`,
                    freeWeek: [`${doc.data().lectureFreeWeek.start} to ${doc.data().lectureFreeWeek.end}. Catch me at the library 😓 📖`,
                        `Hmm...that's from ${doc.data().lectureFreeWeek.start} to ${doc.data().lectureFreeWeek.end}`]
                };
                // Use a random number to get reply for freeWeek from the array
                const freeWeekIndex = Math.floor(Math.random() * aboutLectures.freeWeek.length);
                const freeWeekAnswer = aboutLectures.freeWeek[freeWeekIndex];
                if (agent.parameters.lecture === 'lecture' && agent.parameters.end === 'end')
                    speech = aboutLectures.end;
                else if (agent.parameters.lecture === 'lecture' && agent.parameters.free_week === 'free week')
                    speech = freeWeekAnswer;
                agent.add(speech);
            }
            else {
                console.log('lecture document not found');
            }
        }
        catch (e) {
            console.log('An error occured: ', e);
        }
        ;
    });
}
exports.lectureEnd = lectureEnd;
;
//# sourceMappingURL=examination.js.map