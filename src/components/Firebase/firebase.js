import app from "firebase/app";
import "firebase/auth";
// import 'firebase/database';
import "firebase/firestore";

// Your web app's Firebase configuration
// don't use var unless you have a reason to
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
    return this.auth.currentUser.updatePassword(password);
  };

  // User API
  user = uid => this.db.collection("users").doc(uid);

  users = () => this.db.collection("users");

  // Problem API
  problem = probId => this.db.collection("problems").doc(probId);


  // Skills API
  skill = skillId => this.db.collection("skills").doc(skillId);

  // Battles API
  battle = battleId => this.db.collection("battles").doc(battleId);

  battles = () => this.db.collection("battles");


  // David's suggestion
  // Have parent component hold all the state for the application & subscribe to parts of firestore depending on user's progress
    // i.e. I'm user1 battling against user2. We both subscribe to the same battle to get updates for it. When user2 solves a problem, the battle gets updated in the database. Since I'm subscribed to the battle, I automatically get the update & can then update my state thanks to the listener
  // When updates happen to the battle, it gets updated in the parent component's state & then trickles down into whatever components need it

  // documentation: https://firebase.google.com/docs/database/admin/retrieve-data
}

export default Firebase;
