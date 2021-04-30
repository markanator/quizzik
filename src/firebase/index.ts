import firebase from "firebase/app";

// bring in services we want to use
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJ_ID,
  storageBucket: process.env.REACT_APP_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// check for errors
if (!firebaseConfig.apiKey) throw new Error("Mising Firebase field: apiKey");
if (!firebaseConfig.authDomain)
  throw new Error("Mising Firebase field: authDomain");
if (!firebaseConfig.projectId)
  throw new Error("Mising Firebase field: projectId");
if (!firebaseConfig.storageBucket)
  throw new Error("Mising Firebase field: storageBucket");
if (!firebaseConfig.messagingSenderId)
  throw new Error("Mising Firebase field: messagingSenderId");
if (!firebaseConfig.appId) throw new Error("Mising Firebase field: appId");

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

const getNewQuizId = (): string => db.collection("quizzes").doc().id;
const getServerTimeStamp = (): firebase.firestore.FieldValue =>
  firebase.firestore.FieldValue.serverTimestamp();

export { db, firebase, auth, provider, getNewQuizId, getServerTimeStamp };
