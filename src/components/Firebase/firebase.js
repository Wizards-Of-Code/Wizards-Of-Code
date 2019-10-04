import app from 'firebase/app';
import 'firebase/auth';
// import 'firebase/database';
import 'firebase/firestore';

// Your web app's Firebase configuration
var devConfig = {

  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID

};
// Initialize Firebase
class Firebase {
  constructor() {
    app.initializeApp(devConfig);

    this.auth = app.auth();
    this.db = app.firestore();

  }

  // auth API
  doCreateUserWithEmailAndPassword = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  };

  doSignInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  };

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => {
    return this.auth.currentUser.updatePassword(password)
  };

  // User API

  user = uid => this.db.collection('users').doc(uid);

  users = () => this.db.collection('users');

}

export default Firebase;
