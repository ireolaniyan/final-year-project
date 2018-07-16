import * as functions from 'firebase-functions';
import { WebhookClient, Text, Card, Image, Suggestion, Payload } from 'dialogflow-fulfillment';

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

let admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
let firestore = admin.firestore();

let examDocRef = firestore.collection('academicCalendar').doc('examData');
let lectureDocRef = firestore.collection('academicCalendar').doc('lectureEndData');


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
    const index = Math.floor(Math.random() * greetings.length);         // Number used to randomly select a response from the greetings object
    const greeting = greetings[index];

    agent.add(greeting.message);
    if (greeting.suggestions) {
        greeting.suggestions.forEach(suggestion => {
            agent.add(new Suggestion(suggestion));
        });
    }
}

async function examDate(agent) {
    let speech;
    try {
        const doc = await examDocRef.get();
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
            } else if (agent.action === 'examEnd') {
                speech = examDates.examEnd;
            } else if (agent.action === 'examStart') {
                speech = examDates.examStart;
            }

            agent.add(speech);
            agent.add(new Suggestion(examSuggestion));

            // TODO: 1. get faculty of education dates
            // TODO: 2. use suggestion chips
            // TODO: 3. add context i.e When is exam? => When will it end? || When are we finishing?
        } else {
            console.log("Document not found");
        }
    } catch (error) {
        console.log("Error occured: ", error);
    };
};

async function educationExamDate(agent) {
    try {
        const doc = await examDocRef.get();
        if (doc.exists) {
            const eduExam = {
                exam: `Examination in core courses in the Faculty of Education will take place between ${doc.data().facultyOfEducation.start} 
                and ${doc.data().facultyOfEducation.end}.`
            }
            agent.add(eduExam.exam);
        } else {
            console.log('Education exam date not found');
        }
    } catch (error) {
        console.log('An error occured: ', error);
    };
};

async function lectureEnd(agent) {
    let speech;
    try {
        const doc = await lectureDocRef.get();
        if (doc.exists) {
            const aboutLectures = {
                end: `All lectures end on ${doc.data().end}`,
                freeWeek: `${doc.data().lectureFreeWeek.start} to ${doc.data().lectureFreeWeek.end}. Please be the friend that will take me to the library 😓 📖`
            }
            if (agent.parameters.lecture === 'lecture' && agent.parameters.end === 'end')
                speech = aboutLectures.end;
            else if (agent.parameters.lecture === 'lecture' && agent.parameters.free_week === 'free week')
                speech = aboutLectures.freeWeek;
            agent.add(speech);
        } else {
            console.log('lecture document not found');
        }
    } catch (e) {
        console.log('An error occured: ', e);
    };
};


exports.webhook = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({ request, response });

    let intentMap = new Map();

    intentMap.set('Default Welcome Intent', welcome);

    intentMap.set('Exam Start Date', examDate);
    intentMap.set('Exam End Date', examDate);
    intentMap.set('Exam Date', examDate);
    intentMap.set('Education Exam Date', educationExamDate);

    intentMap.set('Lectures', lectureEnd);

    agent.handleRequest(intentMap);
});