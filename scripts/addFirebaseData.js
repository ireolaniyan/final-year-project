require('dotenv').config({ path: '../.env' })
const { firestore } = require('./firebase.js');

async function addExamDate() {
    try {
        var examData = {
            start: 'Monday, 17th September, 2018',
            end: 'Friday, 28th September, 2018',
            facultyOfEducation: {
                start: 'Tuesday, 2nd October, 2018',
                end: 'Saturday 6th October, 2018'
            }
        };
        const res = await firestore.collection('academicCalendar').add(examData);
        console.log('Response added', res);
    } catch (error) {
        console.log('Unable to add record');
    }
}

addExamDate()

