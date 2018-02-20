const Expo = require('expo-server-sdk');
const DeviceToken = require('../api/devices/model/DeviceToken');



function isPushToken(token){
  // To check if something is a push token
  return Expo.isExponentPushToken(token);
}

function dispatchNotification({ token, message = '', data = '' }){
  const expo = new Expo();
  // console.log('token, message, data', token, message, data);
  let messages = [];
  if(!isPushToken(token)){
    return;
  }
  const notification = {
    to: token,
    sound: 'default',
    body: message,
    data: data,
  }
  messages.push(notification);
  (async function() {
    try {
      let receipts = await expo.sendPushNotificationsAsync(messages);
      console.log(receipts);
    } catch (error) {
      console.error(error);
    }
  })();
}

function sendMessageToUser({user, message, data }){
  // console.log('user, message, data', user, message, data);
  DeviceToken.findOne({ user }).exec((err, tokenData)=>{
    const { token } = tokenData;
    dispatchNotification({ token, message, data });
  })
}

module.exports = {
  dispatchNotification: dispatchNotification,
  sendMessageToUser: sendMessageToUser,
}
