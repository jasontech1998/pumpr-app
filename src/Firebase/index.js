import * as firebase from "firebase/app";
import "firebase/storage";

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDXRH-yPywgLuHkA1g74H1RnJ9L7rrQU30",
    authDomain: "pumpr-182dc.firebaseapp.com",
    databaseURL: "https://pumpr-182dc.firebaseio.com",
    projectId: "pumpr-182dc",
    storageBucket: "pumpr-182dc.appspot.com",
    messagingSenderId: "419507392920",
    appId: "1:419507392920:web:33f0a22834ff041f659bed",
    measurementId: "G-E6SDRZ34ZJ"
  };
  // Initialize Firebase
  export default firebase.initializeApp(firebaseConfig);
  export const storage = firebase.storage();