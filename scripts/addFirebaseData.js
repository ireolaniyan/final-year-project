require('dotenv').config({ path: '../.env' })
const { firestore } = require('./firebase.js');

const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// you will also
// need to update code expecting a Date to instead expect a Timestamp. For example:

//   // Old:
//   const date = snapshot.get('created_at');
//   // New:
//   const timestamp = snapshot.get('created_at');
//   const date = timestamp.toDate();

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
        const res = await firestore.collection('academicCalendar').doc('examData').set(examData);
        console.log('Response added', res);
    } catch (error) {
        console.log('Unable to add record');
    }
}

addExamDate();