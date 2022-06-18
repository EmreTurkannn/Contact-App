
import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
    apiKey: "AIzaSyDYii9AFD2FmEgS_38-ThoXu7UxR5_Q4mI",
    authDomain: "react-contact-369b2.firebaseapp.com",
    projectId: "react-contact-369b2",
    storageBucket: "react-contact-369b2.appspot.com",
    messagingSenderId: "997689832995",
    appId: "1:997689832995:web:61ba1de6488ef91f216396"
  };


  const fireDb=firebase.initializeApp(firebaseConfig);

  export default fireDb.database().ref();