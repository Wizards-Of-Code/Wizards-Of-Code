import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import App from "./components/App";
import Firebase, { FirebaseContext } from "./components/Firebase";
// import store from "./store";
import { Provider } from "react-redux";
const firebase = new Firebase();
export default firebase;

ReactDOM.render(
  // <Provider store={store}>
    <FirebaseContext.Provider value={firebase}>
      <App />
    </FirebaseContext.Provider>
  // </Provider>
  ,
  document.getElementById("root")
);

serviceWorker.unregister();
