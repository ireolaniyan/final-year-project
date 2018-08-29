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
admin.initializeApp();
let firestore = admin.firestore();
let examDocRef = firestore.collection('academicCalendar').doc('examData');
let lectureDocRef = firestore.collection('academicCalendar').doc('lectureEndData');
let managementDocRef = firestore.collection('management').doc('managementData');
// initialising with a placeholder image incase main image doesn't load properly 📶
let image = new dialogflow_fulfillment_1.Image('https://www.kywie.com/wp-content/themes/gecko/assets/images/placeholder.png');
function welcome(agent) {
    // An object of responses used in the welcome function
    const greetings = [
        {
            message: "Hi! I am Unilag's information bot 🤖. What can I help you with?",
            suggestions: ['Resumption Date', 'Exam Date 😓']
        },
        {
            message: 'Hello 😄, what do you want to know about the University of Lagos?',
            suggestions: ["Who's the VC", 'Where is Unilag']
        },
        {
            message: 'Great Akokite 🙌! How may I help you?'
        }
    ];
    const index = Math.floor(Math.random() * greetings.length); // Number used to randomly select a response from the greetings object
    const greeting = greetings[index];
    agent.add(greeting.message);
    if (greeting.suggestions) {
        greeting.suggestions.forEach(suggestion => {
            agent.add(new dialogflow_fulfillment_1.Suggestion(suggestion));
        });
    }
}
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
                // DONE: 1. get faculty of education dates
                // DONE: 2. use suggestion chips
                // DONE: 3. add context i.e When is exam? => When will it end? || When are we finishing?
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
// async function educationExamDate(agent) {
//     try {
//         const doc = await examDocRef.get();
//         if (doc.exists) {
//             const eduExam = {
//                 exam: `Examination in core courses in the Faculty of Education will take place between ${doc.data().facultyOfEducation.start} 
//                 and ${doc.data().facultyOfEducation.end}.`
//             }
//             agent.add(eduExam.exam);
//         } else {
//             console.log('Education exam date not found');
//         }
//     } catch (error) {
//         console.log('An error occured: ', error);
//     };
// };
function educationExamDate(agent) {
    return examDocRef.get()
        .then(doc => doc.exists ? agent.add(`Examination in core courses in the Faculty of Education will take place between ${doc.data().facultyOfEducation.start} 
        and ${doc.data().facultyOfEducation.end}.`) : console.log('Education exam date not found'))
        .catch(error => console.log('An error occured: ', error));
}
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
;
function management(agent) {
    return __awaiter(this, void 0, void 0, function* () {
        let name;
        let deg;
        try {
            const doc = yield managementDocRef.get();
            if (doc.exists) {
                const mgt = {
                    vc: {
                        name: `Meet our Vice-Chancellor, ${doc.data().vc.name}`,
                        degrees: `${doc.data().vc.degrees}`,
                        image: `${doc.data().vc.imageUrl}`
                    },
                    dvc: {
                        academics: {
                            name: `The Deputy Vice-Chancellor (Academic and Research) is ${doc.data().dvc.academics.name}`,
                            image: `${doc.data().dvc.academics.imageUrl}`
                        },
                        management: {
                            name: `${doc.data().dvc.management.name} is the Deputy VC for Management Services`,
                            degrees: `${doc.data().dvc.management.degrees}`,
                            image: `${doc.data().dvc.management.imageUrl}`
                        },
                        development: {
                            name: `${doc.data().dvc.development.name} is the Deputy VC for Development Services`,
                            degrees: `${doc.data().dvc.development.degrees}`,
                            image: `${doc.data().dvc.development.imageUrl}`
                        }
                    },
                    registrar: {
                        name: `The Registrar is ${doc.data().registrar.name}`,
                        degrees: `${doc.data().registrar.degrees}`,
                        image: `${doc.data().registrar.imageUrl}`
                    },
                    bursar: {
                        name: `${doc.data().bursar.name} is our Bursar`,
                        image: `${doc.data().bursar.imageUrl}`
                    },
                    librarian: {
                        name: `Our Librarian is ${doc.data().librarian.name}`,
                        degrees: `${doc.data().librarian.degrees}`,
                        image: `${doc.data().librarian.imageUrl}`
                    }
                };
                if (agent.parameters.vc === 'vc') {
                    name = mgt.vc.name;
                    deg = mgt.vc.degrees;
                    image.setImage(mgt.vc.image);
                }
                else if (agent.parameters.registrar === 'registrar') {
                    name = mgt.registrar.name;
                    deg = mgt.registrar.degrees;
                    image.setImage(mgt.registrar.image);
                }
                else if (agent.parameters.bursar === 'bursar') {
                    name = mgt.bursar.name;
                    // deg = '';
                    image.setImage(mgt.bursar.image);
                }
                else if (agent.parameters.librarian === 'librarian') {
                    name = mgt.librarian.name;
                    deg = mgt.librarian.degrees;
                    image.setImage(mgt.librarian.image);
                }
                // TODO: add dvc
                agent.add(image);
                agent.add(name);
                if (deg)
                    agent.add(deg); // add degree if it's not null 😐
            }
            else {
                console.log('Management document not found');
            }
        }
        catch (error) {
            console.log('An error occured: ', error);
        }
        ;
    });
}
function aboutUs(agent) {
    return __awaiter(this, void 0, void 0, function* () {
        let aboutUsData = {
            title: 'The University of Lagos',
            text: 'Unilag is a federal government university that has its main campus in Akoka, Yaba. It is regarded as the university of first choice in Nigeria...',
            buttonText: 'Learn more...',
            buttonUrl: 'https://unilag.edu.ng/about-us/',
            imageUrl: 'https://unilag.edu.ng/assets/uploads/2017/01/IMG_4919.jpg',
            location: 'The University of Lagos has its main campus in Akoka, Yaba.'
        };
        if (agent.parameters.location === 'location' && agent.parameters.school === 'school') {
            const location = aboutUsData.location;
            agent.add(location);
        }
        else if (agent.parameters.about === 'about' && agent.parameters.school === 'school') {
            let card = new dialogflow_fulfillment_1.Card({
                title: aboutUsData.title,
                imageUrl: aboutUsData.imageUrl,
                text: aboutUsData.text,
                buttonText: aboutUsData.buttonText,
                buttonUrl: aboutUsData.buttonUrl
            });
            agent.add(card);
        }
    });
}
exports.webhook = functions.https.onRequest((request, response) => {
    const agent = new dialogflow_fulfillment_1.WebhookClient({ request, response });
    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Exam Start Date', examDate);
    intentMap.set('Exam End Date', examDate);
    intentMap.set('Exam Start Date - end', examDate);
    intentMap.set('Exam Date', examDate);
    intentMap.set('Education Exam Date', educationExamDate);
    intentMap.set('Lectures', lectureEnd);
    intentMap.set('Management', management);
    intentMap.set('About', aboutUs);
    agent.handleRequest(intentMap);
});
//# sourceMappingURL=index.js.map