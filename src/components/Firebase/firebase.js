import app, { auth } from "firebase/app";
import "firebase/auth";
// import 'firebase/database';
import "firebase/firestore";
import randomizeUrls from "../../RandomBackground";
import { Character } from "../gamestage/utilities";
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
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  webClientId: process.env.REACT_WEB_CLIENT_ID,
  webClientSecret: process.env.REACT_WEB_CLIENT_SECRET
};

// Initialize Firebase
class Firebase {
  constructor() {
    app.initializeApp(devConfig);
    this.auth = app.auth();
    this.db = app.firestore();
    this.provider = new app.auth.GoogleAuthProvider();
  }

  // auth API
  doCreateUserWithEmailAndPassword = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  };

  doSignInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  };

  doSignInWithGoogle = () => {
    return this.auth.signInWithPopup(this.provider).then(authUser => {
      if (authUser.additionalUserInfo.isNewUser) {
        this.user(authUser.user.uid).set({
          username: authUser.user.email,
          email: authUser.user.email,
          experience: 0,
          maxHealth: 100,
          activeBattle: "",
          imgUrl:
            "https://firebasestorage.googleapis.com/v0/b/wizards-of-code.appspot.com/o/mage_2%20copy.png?alt=media&token=b9f14ef3-a649-453d-bf5f-3449758fecf7"
        });
      }
    });
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
  getRandomProblem = difficulty =>
    this.db
      .collection("problems")
      .where("difficulty", "==", difficulty)
      .get()
      .then(
        docs => docs.docs[Math.floor(Math.random() * docs.docs.length)].ref
      );

  // Skills API
  skill = skillId => this.db.collection("skills").doc(skillId);

  // Battles API
  battle = battleId => this.db.collection("battles").doc(battleId);
  createBattle = user => {
    let randomBackgroundUrl = randomizeUrls();
    return this.db.collection("battles").add({
      player1: user.username,
      player1_health: user.maxHealth,
      player1_exp: user.experience,
      player1_anim: `${Character(user.imgUrl)}-idle`,
      player1_char: Character(user.imgUrl),
      player2_anim: "leaves",
      player2_char: "",
      attack_anim: "",
      status: "open",
      background: randomBackgroundUrl
    });
  };
  openBattles = () => this.db.collection("battles");
  closedBattles = () => this.db.collection("battles");
  findRandomBattle = () =>
    this.db
      .collection("battles")
      .where("status", "==", "open")
      .get()
      .then(openBattles => {
        debugger;
        if (openBattles.docs.length) {
          return openBattles.docs[
            Math.floor(Math.random() * openBattles.docs.length)
          ].ref;
        } else {
          return null;
        }
      });

  // avatars API
  avatars = () => {
    return this.db.collection("avatars");
  };

  increment = amount => {
    return this.db.FieldValue.increment(amount);
  };

  // David's suggestion
  // Have parent component hold all the state for the application & subscribe to parts of firestore depending on user's progress
  // i.e. I'm player1 battling against player2. We both subscribe to the same battle to get updates for it. When player2 solves a problem, the battle gets updated in the database. Since I'm subscribed to the battle, I automatically get the update & can then update my state thanks to the listener
  // When updates happen to the battle, it gets updated in the parent component's state & then trickles down into whatever components need it

  // documentation: https://firebase.google.com/docs/database/admin/retrieve-data
}

export default Firebase;
