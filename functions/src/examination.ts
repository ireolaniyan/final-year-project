import { Suggestion } from 'dialogflow-fulfillment';
import firestore from './db';

let examDocRef = firestore.collection('academicCalendar').doc('examData');
let lectureDocRef = firestore.collection('academicCalendar').doc('lectureEndData');

export async function examDate(agent) {
    let speech;
    try {
        const doc = await examDocRef.get();
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
            agent.add(new Suggestion(examSuggestion));
        } else {
            console.log("Document not found");
        }
    } catch (error) {
        console.log("Error occured: ", error);
    };
};

export function educationExamDate(agent) {
    return examDocRef.get()
        .then(doc => doc.exists ? agent.add(`Examination in core courses in the Faculty of Education will take place between ${doc.data().facultyOfEducation.start} 
        and ${doc.data().facultyOfEducation.end}.`) : console.log('Education exam date not found'))
        .catch(error => console.log('An error occured: ', error));
}

export async function lectureEnd(agent) {
    let speech;
    try {
        const doc = await lectureDocRef.get();
        if (doc.exists) {
            const aboutLectures = {
                end: `All lectures end on ${doc.data().end}`,
                freeWeek: [`${doc.data().lectureFreeWeek.start} to ${doc.data().lectureFreeWeek.end}. Catch me at the library 😓 📖`,
                `Hmm...that's from ${doc.data().lectureFreeWeek.start} to ${doc.data().lectureFreeWeek.end}`]
            }

            // Use a random number to get reply for freeWeek from the array
            const freeWeekIndex = Math.floor(Math.random() * aboutLectures.freeWeek.length);
            const freeWeekAnswer = aboutLectures.freeWeek[freeWeekIndex];

            if (agent.parameters.lecture === 'lecture' && agent.parameters.end === 'end')
                speech = aboutLectures.end;
            else if (agent.parameters.lecture === 'lecture' && agent.parameters.free_week === 'free week')
                speech = freeWeekAnswer;
            agent.add(speech);
        } else {
            console.log('lecture document not found');
        }
    } catch (e) {
        console.log('An error occured: ', e);
    };
};