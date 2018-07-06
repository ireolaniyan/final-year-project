const functions = require('firebase-functions');

exports.webhook = functions.https.onRequest((request, response) => {
    console.log("request.body.queryResult.parameters", request.body.queryResult.parameters);
    let params = request.body.queryResult.parameters;

    response.send({
        fulfillmentText: "Hi"
    });

    // firestore.collection('parameters')
    // .add(params)
    // .then(() => {
    //     response.send({
    //         fulfillmentText: "Hello"
    //     });
    // })
    // .catch((e => {
    //     console.log("error: ", e);
    //     response.send({
    //         fulfillmentText: "error ocurred"
    //     });
    // }));
});
