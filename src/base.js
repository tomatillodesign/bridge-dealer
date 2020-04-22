import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
     apiKey: "AIzaSyAmnj0WBhZQsUe-hADDZlUl22Nplioi_Ec",
     authDomain: "bridge-dealer.firebaseapp.com",
     databaseURL: "https://bridge-dealer.firebaseio.com",
     projectId: "bridge-dealer",
     storageBucket: "bridge-dealer.appspot.com",
     messagingSenderId: "759781159430",
     appId: "1:759781159430:web:dafb4c46b5eb0a194d4987"
})

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// This is a default export
export default base;
