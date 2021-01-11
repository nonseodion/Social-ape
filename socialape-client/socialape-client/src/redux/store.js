import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "react-redux";
import { thunk } from "react-thunk";

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
  compose(
    applyMiddleware(...middleWare),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
