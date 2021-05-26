// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyCSHnFe2MHnBKhRHQrwACoNLo5cerY5W74",
  authDomain: "chat-firebase-6a710.firebaseapp.com",
  projectId: "chat-firebase-6a710",
  storageBucket: "chat-firebase-6a710.appspot.com",
  messagingSenderId: "814599624459",
  appId: "1:814599624459:web:5ad9f7936fe596703f340e",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});