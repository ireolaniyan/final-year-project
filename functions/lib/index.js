"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const dialogflow_fulfillment_1 = require("dialogflow-fulfillment");
const welcome_1 = require("./welcome");
const examination_1 = require("./examination");
const about_1 = require("./about");
const management_1 = require("./management");
const courseReg_1 = require("./courseReg");
const resumption_1 = require("./resumption");
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
exports.webhook = functions.https.onRequest((request, response) => {
    const agent = new dialogflow_fulfillment_1.WebhookClient({ request, response });
    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome_1.default);
    intentMap.set('Exam Start Date', examination_1.examDate);
    intentMap.set('Exam End Date', examination_1.examDate);
    intentMap.set('Exam Start Date - end', examination_1.examDate);
    intentMap.set('Exam Date', examination_1.examDate);
    intentMap.set('Education Exam Date', examination_1.educationExamDate);
    intentMap.set('Lectures', examination_1.lectureEnd);
    intentMap.set('Management', management_1.default);
    intentMap.set('About', about_1.default);
    intentMap.set('Course Registration', courseReg_1.default);
    intentMap.set('Resumption Date', resumption_1.default);
    agent.handleRequest(intentMap);
});
//# sourceMappingURL=index.js.map