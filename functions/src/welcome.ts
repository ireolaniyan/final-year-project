import { Suggestion } from 'dialogflow-fulfillment';

export default function welcome(agent) {
	// An object of responses used in the welcome function
	const greetings = [
		{
			message: "Hi! I am Unilag's information bot 🤖. What can I help you with?",
			suggestions: ['Resumption Date', 'Exam Date 😓']
		},
		{
			message: 'Hello 😄, what do you want to know about the University of Lagos?',
			suggestions: ["Who's the VC", 'Where is Unilag']
		},
		{
			message: 'Great Akokite 🙌! How may I help you?'
		}
	];
	const index = Math.floor(Math.random() * greetings.length);         // Number used to randomly select a response from the greetings object
	const greeting = greetings[index];

	agent.add(greeting.message);
	if (greeting.suggestions) {
		greeting.suggestions.forEach(suggestion => {
				agent.add(new Suggestion(suggestion));
		});
	}
}