import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import rootReducer from "./_reducers";
import { composeWithDevTools } from "redux-devtools-extension";

import "antd/dist/antd.css";

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxThunk
)(createStore);

ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(rootReducer, composeWithDevTools())}
  >
    <App />
  </Provider>,
  document.getElementById("root")
);
