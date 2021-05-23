import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, HashRouter } from 'react-router-dom';
import * as serviceWorker from './registerServiceWorker';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import {initializeFirebase,askForPermissionToReceiveNotifications} from './FunctionalComponents/push-notification'


ReactDOM.render(
 <HashRouter>
    
      <Route component={App} />
  
  </HashRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
initializeFirebase();

// if(!localStorage.getItem("notification-token")){
//   askForPermissionToReceiveNotifications();
// }
serviceWorker.register();

//,
//"homepage": "https://proj.ruppin.ac.il/igroup54/test2/A/mobile2"