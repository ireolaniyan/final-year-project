const functions = require('firebase-functions');
const { WebhookClient, Text, Card, Image, Suggestion, Payload } = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

let admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
let firestore = admin.firestore();


// An object of responses used in the welcome intent
const greetings = [
    {
        message: "Hi! I am Unilag's information bot 🤖. What can I help you with?",
        suggestions: ['Resumption Date', 'Exam Date']
    },
    {
        message: 'Hello 😄, what do you want to know about the University of Lagos?'
    },
    {
        message: 'Great Akokite 🙌! How can I help you?'
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

// function displayExamDate(agent) {
//     let examDocRef = firestore.collection('academicCalendar').doc('examData');
//     let speech;

//     examDocRef.get().then(function (doc) {
//         if (doc.exists) {
//             // console.log("Document ", doc.data());
//             if (agent.exam && agent.exam_start) {
//                 speech = `Examinations will start on ${doc.data().start}. Best of luck!`
//             } else if (agent.exam && agent.exam_finish) {
//                 speech = `By ${doc.data().end}, all faculties except Education should be through with exams`
//             } else {
//                 speech = `Exam starts on ${doc.data().start} and ends on ${doc.data().end}`
//             }

//             agent.add(speech);

//             // res.send({
//             //     fulfillmentText: speech
//             // });
//             // TODO: 1. get faculty of education dates
//             // TODO: 2. use suggestion chips
//             // TODO: 3. add context i.e When is exam? => When will it end? || When are we finishing?
//         } else {
//             console.log("Document not found");
//         }
//     }).catch(function (error) {
//         console.log("Error occured: ", error);
//     });
// };



exports.webhook = functions.https.onRequest((request, response) => {
    // console.log("request.body.queryResult.parameters", request.body.queryResult.parameters);
    // let params = request.body.queryResult.parameters;

    const agent = new WebhookClient({ request, response });
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);

    agent.handleRequest(intentMap);

});
