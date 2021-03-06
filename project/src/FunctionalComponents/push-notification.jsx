import firebase from 'firebase';
 
export const initializeFirebase = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp({
          apiKey: "AIzaSyCSHnFe2MHnBKhRHQrwACoNLo5cerY5W74",
          authDomain: "chat-firebase-6a710.firebaseapp.com",
          projectId: "chat-firebase-6a710",
          storageBucket: "chat-firebase-6a710.appspot.com",
          messagingSenderId: "814599624459",
          appId: "1:814599624459:web:5ad9f7936fe596703f340e",
          measurementId: "G-S667RQB4PS"
        });
      }
}
const messaging = firebase.messaging();

export const askForPermissionToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await Notification.requestPermission();
    console.log("requestPermission done")

    const token = await messaging.getToken();
    console.log('Your token is:', token);
    localStorage.setItem("MyToken",token);
    return token;
  } catch (error) {
    console.log('error askForPermissionToReceiveNotifications');
    console.error(error);
  }
}
export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
});
