const functions = require('firebase-functions');

var admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
var firestore = admin.firestore();


function displayExamDate(params, res) {
    var examDocRef = firestore.collection('academicCalendar').doc('examData');
    var speech;

    examDocRef.get().then(function (doc) {
        if (doc.exists) {
            console.log("Document ", doc.data());

            if (params.exam && params.exam_start) {
                speech = `Examinations will start on ${doc.data().start}. Best of luck!`
            } else if (params.exam && params.exam_finish) {
                speech = `By ${doc.data().end}, all faculties except Education should be through with exams`
            } else {
                speech = `Exam starts on ${doc.data().start} and ends on ${doc.data().end}`
            }

            res.send({
                fulfillmentText: speech
            });
            // TODO: 1. get faculty of education dates
            // TODO: 2. use suggestion chip
            // TODO: 3. add context i.e When is exam? => When will it end? || When are we finishing?
        } else {
            console.log("Document not found");
        }
    }).catch(function (error) {
        console.log("Error occured: ", error);
    });
};

exports.webhook = functions.https.onRequest((request, response) => {
    // console.log("request.body.queryResult.parameters", request.body.queryResult.parameters);
    let params = request.body.queryResult.parameters;
    // response.send({
    //             fulfillmentText:
    //                 `${params.name} your hotel booking request for ${params.RoomType} room is forwarded for
    //                 ${params.persons} persons, we will contact you on ${params.email} soon`
    // });
    displayExamDate(params, response);

    // response.send({
    //     fulfillmentText: "Hi"
    // });


});
