import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC5sWdqGP3zaNdTE-u9YezeCjERqNvHQDY",
    authDomain: "catch-of-the-day-raul.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-raul.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database())

// this is a named export
export { firebaseApp };

// this is a default export
export default base;