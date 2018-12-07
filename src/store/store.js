import rootReducer from "../reducers/rootReducer";
import {applyMiddleware} from "redux";
import logger from 'redux-logger'
import {createStore } from "redux";
import thunk  from "redux-thunk";
const middleware = applyMiddleware(thunk,logger);
const store = createStore(rootReducer,middleware);
export default store;