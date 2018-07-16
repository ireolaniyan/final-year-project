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

async function addLectureEndDate() {
    try {
        var lectureEndData = {
            end: 'Friday 7th September, 2018',
            lectureFreeWeek: {
                start: 'Monday 10th September, 2018',
                end: 'Friday 14th September, 2018'
            }
        };
        const res = await firestore.collection('academicCalendar').doc('lectureEndData').set(lectureEndData);
        console.log('Response added', res);
    } catch (error) {
        console.log('Unable to add record', error);
    }
}

addLectureEndDate();