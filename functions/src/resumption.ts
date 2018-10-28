import firestore from './db';

let resumptionDocRef = firestore.collection("academicCalendar").doc("resumptionData")

export default async function resumptionDate(agent) {
    let speech;
    try {
        const doc = await resumptionDocRef.get();
        if (doc.exists) {
            speech = `The new session will start on ${doc.data().resumptionDate}`;
            if (agent.parameters.resumption === 'resumption' || agent.parameters.resumption === 'resumption' && agent.parameters.school === 'school' || agent.parameters.resumption === 'resumption' && agent.parameters.session === 'session' || agent.parameters.session === 'session' && agent.parameters.start === 'start')
                agent.add(speech);
        } else {
            console.log("Resumption document not found");
        }
    } catch (error) {
        console.log("An error occured ", error);
    };
}