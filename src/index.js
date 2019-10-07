import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/reset.css';
import './css/timeline.css';
import './css/login.css';
import { Router, Route, browserHistory } from 'react-router';
import { matchPattern } from 'react-router/lib/PatternUtils';
import Login from './components/login';
import Logout from './components/logout';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { timeline } from './Reducers/timeline.js';
import { notificacao } from './Reducers/header.js';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';

const reducers = combineReducers({ timeline, notificacao });
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

function handleAuth(nextState, replace) {
  const result = matchPattern(
    '/timeline(/:login)',
    nextState.location.pathname
  );
  if (
    result.paramValues[0] === undefined &&
    localStorage.getItem('auth-token') === null
  ) {
    replace('/?msg=Você precisa estar logado para acessar o endereço');
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={Login} />
      <Route path='/timeline(/:login)' component={App} onEnter={handleAuth} />
      <Route path='/logout' component={Logout} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
