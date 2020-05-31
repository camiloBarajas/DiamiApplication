const axios = require('axios').default;

async function sendPushNotification(tokenFirebase, data) {
    await axios
        .post(`https://fcm.googleapis.com/fcm/send`, {
            to: tokenFirebase,
            notification: {
                title: data.title,
                text: data.text
            }
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'key=AAAAvnv_VlU:APA91bFnntcy3FVKPp2bjfDplhrHxidYTT2agh5uXjocnvPqfsrN7kzxQQp_Ab4cPdATeF6QwqGLzNwTs2IS0O84320KOIX6b0WGwCD-lPLotRFSsbekFwab6cXUoY2_ezZ6xUxl582i'
            }
        }).then(response => console.log('RESPONSE FIREBASE --> ' + response))
        .catch(err => console.log('ERROR FIREBASE --> ' + err));
}

module.exports = sendPushNotification;