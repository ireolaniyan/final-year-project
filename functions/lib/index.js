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
const functions = require("firebase-functions");
const dialogflow_fulfillment_1 = require("dialogflow-fulfillment");
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
let admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
let firestore = admin.firestore();
let examDocRef = firestore.collection('academicCalendar').doc('examData');
// An object of responses used in the welcome function
const greetings = [
    {
        message: "Hi! I am Unilag's information bot 🤖. What can I help you with?",
        suggestions: ['Resumption Date', 'Exam Date 😓']
    },
    {
        message: 'Hello 😄, what do you want to know about the University of Lagos?',
        suggestions: ["Who's the VC", "How many faculties are there"]
    },
    {
        message: 'Great Akokite 🙌! How may I help you?'
    }
];
function welcome(agent) {
    const index = Math.floor(Math.random() * greetings.length); // Number used to randomly select a response from the greetings object
    const greeting = greetings[index];
    agent.add(greeting.message);
    if (greeting.suggestions) {
        greeting.suggestions.forEach(suggestion => {
            agent.add(new dialogflow_fulfillment_1.Suggestion(suggestion));
        });
    }
}
function displayExamDate(agent) {
    return __awaiter(this, void 0, void 0, function* () {
        let speech;
        try {
            const doc = yield examDocRef.get();
            if (doc.exists) {
                // console.log("Document ", doc.data());
                const examDates = {
                    examStart: `Examinations will start on ${doc.data().start}. Best of luck! 👍`,
                    examEnd: `By ${doc.data().end}, all faculties except Education should be through with exams 😁💃`,
                    exam: `Exam starts on ${doc.data().start} and ends on ${doc.data().end}`,
                    suggestion: 'Check for Faculty of Education'
                };
                let examSuggestion = examDates.suggestion;
                if (agent.action === 'examDate') {
                    speech = examDates.exam;
                }
                else if (agent.action === 'examEnd') {
                    speech = examDates.examEnd;
                }
                else if (agent.action === 'examStart') {
                    speech = examDates.examStart;
                }
                agent.add(speech);
                agent.add(new dialogflow_fulfillment_1.Suggestion(examSuggestion));
                // TODO: 1. get faculty of education dates
                // TODO: 2. use suggestion chips
                // TODO: 3. add context i.e When is exam? => When will it end? || When are we finishing?
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
;
function displayEducationExamDate(agent) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const doc = yield examDocRef.get();
            if (doc.exists) {
                const eduExam = {
                    exam: `Examination in core courses in the Faculty of Education will take place between ${doc.data().facultyOfEducation.start} 
                and ${doc.data().facultyOfEducation.end}.`
                };
                agent.add(eduExam.exam);
            }
            else {
                console.log('Education exam date not found');
            }
        }
        catch (error) {
            console.log('An error occured: ', error);
        }
        ;
    });
}
;
exports.webhook = functions.https.onRequest((request, response) => {
    const agent = new dialogflow_fulfillment_1.WebhookClient({ request, response });
    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Exam Start Date', displayExamDate);
    intentMap.set('Exam End Date', displayExamDate);
    intentMap.set('Exam Date', displayExamDate);
    intentMap.set('Education Exam Date', displayEducationExamDate);
    agent.handleRequest(intentMap);
});
//# sourceMappingURL=index.js.map