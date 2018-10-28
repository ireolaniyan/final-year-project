import { Card } from 'dialogflow-fulfillment';

export default function aboutUnilag(agent) {
    let aboutUnilagData = {
        title: 'University of Lagos',
        text: 'Unilag is a federal government university that has its main campus in Akoka, Yaba. It is regarded as the university of first choice in Nigeria...',
        buttonText: 'Learn more...',
        buttonUrl: 'https://unilag.edu.ng/about-us/',
        imageUrl: 'https://unilag.edu.ng/assets/uploads/2017/01/IMG_4919.jpg',
        location: 'The University of Lagos has its main campus in Akoka, Yaba.'
    };

    if (agent.parameters.location === 'location' && agent.parameters.school === 'school') {
        agent.add(aboutUnilagData.location);
    } else if (agent.parameters.about === 'about' && agent.parameters.school === 'school') {
        let card = new Card({
            title: aboutUnilagData.title,
            imageUrl: aboutUnilagData.imageUrl,
            text: aboutUnilagData.text,
            buttonText: aboutUnilagData.buttonText,
            buttonUrl: aboutUnilagData.buttonUrl
        });
        agent.add('Here you go!')
        agent.add(card);
    }

}