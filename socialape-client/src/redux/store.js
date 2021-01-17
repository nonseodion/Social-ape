import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

import userReducer from "./reducers/userReducer";
import dataReducer from "./reducers/dataReducer";
import uiReducer from "./reducers/uiReducer";

const middleWare = [thunk];

const initialState = {};

const reducers = combineReducers({
  user: userReducer,
  UI: uiReducer,
  data: dataReducer,
});

const store = createStore(
  reducers,
  initialState,
  compose(applyMiddleware(...middleWare))
);

export default store;
