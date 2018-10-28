require('dotenv').config({ path: '../.env' })
const { firestore } = require('./firebase.js');

const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

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
}

async function addLectureEndData() {
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
        console.log('Unable to add record');
    }
}

async function addManagementData() {
    try {
        var managementData = {
            vc: {
                name: 'Professor Oluwatoyin T. Ogundipe',
                degrees: 'B.Sc., M.Sc., Ph.D (Ife), MBA (Lagos), F.L.A., FAS',
                imageUrl: 'https://unilag.edu.ng/assets/uploads/2013/01/vc.jpg'
            },
            dvc: {
                academics: {
                    name: 'Professor Oluwole Familoni',
                    imageUrl: 'https://unilag.edu.ng/assets/uploads/2013/01/dvc1-1.jpg'
                },
                management: {
                    name: 'Professor Emukufia A. Oghojafor',
                    degrees: 'B.Sc., M.Sc., Ph.D (Lagos)',
                    imageUrl: 'https://unilag.edu.ng/assets/uploads/2013/01/dvc2-1.jpg'
                },
                development: {
                    name: 'Professor Folashade Ogunsola',
                    degrees: 'Ph.D (Wales), FMCPath (Nig), FWACP (WA)',
                    imageUrl: 'https://unilag.edu.ng/assets/uploads/2013/01/dvc3.jpg'
                }
            },
            registrar: {
                name: 'Mr. Ismaila Oladejo Azeez',
                imageUrl: 'https://unilag.edu.ng/assets/uploads/2018/08/registrar3-1.png'
            },
            bursar: {
                name: 'Mr. Nurudeen Olalekan Ajani Lawal',
                imageUrl: 'https://unilag.edu.ng/assets/uploads/2013/01/bursar-1.jpg'
            },
            librarian: {
                name: 'Dr. (Mrs.) Olukemi Adebimpe Fadehan',
                degrees: 'B.Ed, M.L.S, Ph.D (Ibadan), CLN',
                imageUrl: 'https://unilag.edu.ng/assets/uploads/2013/01/librarian.jpg'
            }
        };
        const res = await firestore.collection('management').doc('managementData').set(managementData);
        console.log('Response added', res);
    } catch (error) {
        console.log('Unable to add record', error);
    }
}

async function addResumptionData() {
    try {
        var resumptionData = {
            resumptionDate: 'Monday 19th November, 2018'
        };
        const res = await firestore.collection('academicCalendar').doc('resumptionData').set(resumptionData);
        console.log('Response added', res);
    } catch (error) {
        console.log('Resumption data not added', error);
    }
}

async function addCourseRegistration() {
    try {
        var courseRegData = {
            courseReg: {
                start: 'Saturday 19th May, 2018',
                end: 'Sunday 15th July, 2018'
            },
            courseEdit: {
                start: 'Monday 23rd July, 2018',
                end: 'Sunday 5th August, 2018'
            }
        };
        const res = await firestore.collection('courseRegistration').doc('courseRegData').set(courseRegData);
        console.log('Added course reg info', res);
    } catch (error) {
        console.log('Course reg not added', error);
    }
}

async function addProgrammes() {
    try {
        var programmesData = {

        }
    } catch (error) {
        console.log('Programmes not added ', error);
    }
}

async function addFaculties() {
    try {
        var faculties = {

        }
    } catch (error) {
        console.log('Faculties not added', error);
    }
}

// addExamData();
// addLectureEndData();
// addManagementData();
// addResumptionData();
// addCourseRegistration();
// addProgrammes();
// addFaculties();