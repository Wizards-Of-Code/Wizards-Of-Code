import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import game from "./game";
import users from "./users";

const store = createStore(
  combineReducers({ game, users }),
  applyMiddleware(logger, thunk)
);
export default store;
