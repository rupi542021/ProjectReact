importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-messaging.js');

    firebase.initializeApp({
      apiKey: "AIzaSyCSHnFe2MHnBKhRHQrwACoNLo5cerY5W74",
      authDomain: "chat-firebase-6a710.firebaseapp.com",
      projectId: "chat-firebase-6a710",
      storageBucket: "chat-firebase-6a710.appspot.com",
      messagingSenderId: "814599624459",
      appId: "1:814599624459:web:5ad9f7936fe596703f340e",
      measurementId: "G-S667RQB4PS"
    });
const messaging = firebase.messaging();