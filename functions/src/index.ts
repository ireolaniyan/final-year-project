import * as functions from 'firebase-functions';
import { WebhookClient } from 'dialogflow-fulfillment';


import welcome from './welcome';
import { examDate, educationExamDate, lectureEnd } from './examination';
import aboutUnilag from './about';
import management from './management';
import courseRegistration from './courseReg';

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.webhook = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({ request, response });
    let intentMap = new Map();

    intentMap.set('Default Welcome Intent', welcome);

    intentMap.set('Exam Start Date', examDate);
    intentMap.set('Exam End Date', examDate);
    intentMap.set('Exam Start Date - end', examDate);
    intentMap.set('Exam Date', examDate);
    intentMap.set('Education Exam Date', educationExamDate);

    intentMap.set('Lectures', lectureEnd);

    intentMap.set('Management', management);

    intentMap.set('About', aboutUnilag);

    intentMap.set('Course Registration', courseRegistration);

    agent.handleRequest(intentMap);
});