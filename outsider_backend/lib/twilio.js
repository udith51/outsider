const accountSid = 'AC5cca8aca29016c5b305dc9e5fbb4327d';
const authToken = '4bdd7820220a6235a2592760ba6aeffc';
const client = require('twilio')(accountSid, authToken);

const sendClientMessage = (name) => {
    client.messages
        .create({
            body: `Congratulations! Your reservation with ${name} has been successfully confirmed. Expect a call from the dedicated service provider shortly!`,
            from: '+12059228717',
            to: '+919674775337'
        })
        .then(message => console.log(message.sid))
        .catch(e => console.log(e))
}

const sendProviderMessage = (name) => {
    client.messages
        .create({
            body: `Voila! A fresh reservation from ${name} has just landed. Dive into the system to uncover the details and make that connection happen!`,
            from: '+12059228717',
            to: '+919836548968'
        })
        .then(message => console.log(message.sid))
        .catch(e => console.log(e))
}

module.exports = { sendClientMessage, sendProviderMessage }