import { compose, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { reducers } from "./../reducer/index";

const reduxDevTools =
  typeof window.__REDUX_DEVTOOLS_EXTENSION__ === "undefined"
    ? (a) => a
    : window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__();

export const store = createStore(
  reducers,
  compose(applyMiddleware(thunk), reduxDevTools)
);
