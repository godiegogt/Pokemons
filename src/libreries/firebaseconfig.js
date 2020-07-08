import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyBm838VD16XApQx6NfV_IKBbFDxvOIGIqo",
    authDomain: "pokemonespractica.firebaseapp.com",
    databaseURL: "https://pokemonespractica.firebaseio.com",
    projectId: "pokemonespractica",
    storageBucket: "pokemonespractica.appspot.com",
    messagingSenderId: "746258399831",
    appId: "1:746258399831:web:42d6d71bcc51c77588d912"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db =  firebase.firestore();
  const auth=firebase.auth()
  export {auth,firebase,db}