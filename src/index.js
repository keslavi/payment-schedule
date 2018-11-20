import React from 'react';
import ReactDOM from 'react-dom';
//import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './helpers';//, history
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './App';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={store}>
        <span>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>    
            <ToastContainer />
            <App></App>
        </span>
    </Provider> 
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
