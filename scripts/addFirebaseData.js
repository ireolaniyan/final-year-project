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

async function addExamData() {
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
};

async function addLectureEndData() {
    try {
        var lectureEndData = {
            end: 'Friday 7th September, 2018',
            freeWeek: {
                start: 'Monday 10th September, 2018',
                end: 'Friday 14th September, 2018'
            }
        };
        const res = await firestore.collection('academicCalendar').doc('lectureEndData').set(lectureEndData);
        console.log('Response added', res);
    } catch (error) {
        console.log('Unable to add record');
    }
};

async function addManagementData() {
    try {
        var managementData = [
            {
                vc: 'Professor Oluwatoyin T. Ogundipe',
                degrees: 'B.Sc., M.Sc., Ph.D (Ife), MBA (Lagos), F.L.A., FAS',
                imageUrl: 'https://unilag.edu.ng/assets/uploads/2013/01/vc.jpg'
            },
            {
                dvc: [
                    {
                        academics: 'Professor Oluwole Familoni',
                        imageUrl: 'https://unilag.edu.ng/assets/uploads/2013/01/dvc1-1.jpg'
                    },
                    {
                        management: 'Professor Emukufia A. Oghojafor',
                        degrees: 'B.Sc., M.Sc., Ph.D (Lagos)',
                        imageUrl: 'https://unilag.edu.ng/assets/uploads/2013/01/dvc2-1.jpg'
                    },
                    {
                        development: 'Professor Folashade Ogunsola',
                        degrees: 'Ph.D (Wales), FMCPath (Nig), FWACP (WA)',
                        imageUrl: 'https://unilag.edu.ng/assets/uploads/2013/01/dvc3.jpg'
                    }
                ]
            },
            {
                registrar: 'Dr. (Mrs.) Taiwo F. Ipaye',
                degrees: 'B.A Ed. (Ife), M.Ed (Lagos), Ph.D (Lagos), FNIM',
                imageUrl: 'https://unilag.edu.ng/assets/uploads/2013/01/registrar.jpg'
            },
            {
                bursar: 'Mr. Nurudeen Olalekan Ajani Lawal',
                imageUrl: 'https://unilag.edu.ng/assets/uploads/2013/01/bursar-1.jpg'
            },
            {
                librarian: 'Dr. (Mrs.) Olukemi Adebimpe Fadehan',
                imageUrl: 'https://unilag.edu.ng/assets/uploads/2013/01/librarian.jpg'
            },
        ];

        const res = await firestore.collection('management').doc('managementData').set(Object.assign({}, managementData));
        console.log('Response added', res);
    } catch (error) {
        console.log('Unable to add record', error);
    }
};

// addExamData();
// addLectureEndData();
addManagementData();