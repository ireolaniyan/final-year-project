import { Image } from 'dialogflow-fulfillment';
import firestore from './db';

let managementDocRef = firestore.collection('management').doc('managementData');

// initialising with a placeholder image incase main image doesn't load properly 📶
let image = new Image('https://www.kywie.com/wp-content/themes/gecko/assets/images/placeholder.png');

export default async function management(agent) {
    let name;
    let deg;
    try {
        const doc = await managementDocRef.get();
        if (doc.exists) {
            const mgt = {
                vc: {
                    name: `Meet our Vice-Chancellor, ${doc.data().vc.name}`,
                    degrees: `${doc.data().vc.degrees}`,
                    image: `${doc.data().vc.imageUrl}`
                },
                dvc: {
                    academics: {
                        name: `The Deputy Vice-Chancellor (Academics and Research) is ${doc.data().dvc.academics.name}`,
                        image: `${doc.data().dvc.academics.imageUrl}`
                    },
                    management: {
                        name: `${doc.data().dvc.management.name} is the Deputy VC for Management Services`,
                        degrees: `${doc.data().dvc.management.degrees}`,
                        image: `${doc.data().dvc.management.imageUrl}`
                    },
                    development: {
                        name: `${doc.data().dvc.development.name} is the Deputy VC for Development Services`,
                        degrees: `${doc.data().dvc.development.degrees}`,
                        image: `${doc.data().dvc.development.imageUrl}`
                    }
                },
                registrar: {
                    name: `The Registrar is ${doc.data().registrar.name}`,
                    image: `${doc.data().registrar.imageUrl}`
                },
                bursar: {
                    name: `${doc.data().bursar.name} is our Bursar`,
                    image: `${doc.data().bursar.imageUrl}`
                },
                librarian: {
                    name: `Our Librarian is ${doc.data().librarian.name}`,
                    degrees: `${doc.data().librarian.degrees}`,
                    image: `${doc.data().librarian.imageUrl}`
                }
            };

            if (agent.parameters.dvc === 'dvc') {
                agent.add(new Image(mgt.dvc.academics.image));
                agent.add(mgt.dvc.academics.name);

                agent.add(new Image(mgt.dvc.development.image));
                agent.add(mgt.dvc.development.name);
                agent.add(mgt.dvc.development.degrees);

                agent.add(new Image(mgt.dvc.management.image));
                agent.add(mgt.dvc.management.name);
                agent.add(mgt.dvc.management.degrees);
            } else {
                if (agent.parameters.vc === 'vc') {
                    name = mgt.vc.name;
                    deg = mgt.vc.degrees;
                    image.setImage(mgt.vc.image);
                } else if (agent.parameters.registrar === 'registrar') {
                    name = mgt.registrar.name;
                    image.setImage(mgt.registrar.image);
                } else if (agent.parameters.bursar === 'bursar') {
                    name = mgt.bursar.name;
                    image.setImage(mgt.bursar.image);
                } else if (agent.parameters.librarian === 'librarian') {
                    name = mgt.librarian.name;
                    deg = mgt.librarian.degrees;
                    image.setImage(mgt.librarian.image);
                }
                // TODO: add dvc
                let details = name;
                if (deg) details += deg;
                agent.add(image);
                // agent.add(name);
                // if (deg) agent.add(deg);                // add degree if it's not null 😐
                agent.add(details);
            }
        } else {
            console.log('Management document not found');
        }
    } catch (error) {
        console.log('An error occured: ', error);
    };
}