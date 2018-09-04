"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dialogflow_fulfillment_1 = require("dialogflow-fulfillment");
function aboutUnilag(agent) {
    return __awaiter(this, void 0, void 0, function* () {
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
        }
        else if (agent.parameters.about === 'about' && agent.parameters.school === 'school') {
            let card = new dialogflow_fulfillment_1.Card({
                title: aboutUnilagData.title,
                imageUrl: aboutUnilagData.imageUrl,
                text: aboutUnilagData.text,
                buttonText: aboutUnilagData.buttonText,
                buttonUrl: aboutUnilagData.buttonUrl
            });
            agent.add('Here you go ');
            agent.add(card);
        }
    });
}
exports.default = aboutUnilag;
//# sourceMappingURL=about.js.map