import firestore from './db';

let courseRegDocRef = firestore.collection('courseRegistration').doc('courseRegData');

export default async function courseRegistration(agent) {
	let speech;
	try {
		const doc = await courseRegDocRef.get();
		if (doc.exists) {
			if (agent.parameters.course === 'course' && agent.parameters.registration === 'registration') {
				speech = `You can register your courses between ${doc.data().courseReg.start} and ${doc.data().courseReg.end}`;
			} else if (agent.parameters.course === 'course' && agent.parameters.edit === 'edit') {
				speech = `That's from ${doc.data().courseEdit.start} to ${doc.data().courseEdit.end}`;
			}
			agent.add(speech);
		} else {
			console.log("Doc not found")
		}
	} catch (error) {
		console.log("An error occured", error);
	}
}