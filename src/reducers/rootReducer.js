import { combineReducers } from "redux";
import vehicleReducer from './vehicleReducer';
import loadmakeReducer from './loadmakeReducer';
import loadmodelReducer from './loadmodelReducer';
import loadyearReducer from './loadyearReducer';

import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    vehicles: vehicleReducer, 
    listmakes:loadmakeReducer,
    listmodels:loadmodelReducer,
    listyears:loadyearReducer,
    form: formReducer
  });
export default rootReducer