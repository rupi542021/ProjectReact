import firebase from 'firebase/app';
import 'firebase/messaging';



var firebaseConfig = {
    apiKey: "AIzaSyCSHnFe2MHnBKhRHQrwACoNLo5cerY5W74",
    authDomain: "chat-firebase-6a710.firebaseapp.com",
    projectId: "chat-firebase-6a710",
    storageBucket: "chat-firebase-6a710.appspot.com",
    messagingSenderId: "814599624459",
    appId: "1:814599624459:web:5ad9f7936fe596703f340e"
  };
  if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);}

const messaging = firebase.messaging();

export const getToken = (setTokenFound) => {
    return messaging.getToken({vapidKey: 'GENERATED_MESSAGING_KEY'}).then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.');
        setTokenFound(false);
        // shows on the UI that permission is required 
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
  }

  export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
});