import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import App from './app';
import {Provider} from 'react-redux';
import store from "./store/store";
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

