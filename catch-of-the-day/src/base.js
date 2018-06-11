import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDu8WDcNeqL9SrIsSLdV6qBwbq7LIdD4pY",
    authDomain: "catch-of-the-day-8f441.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-8f441.firebaseio.com"
})

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

//This is a default export
export default base;