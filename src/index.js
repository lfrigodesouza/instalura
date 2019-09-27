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
  <Router history={browserHistory}>
    <Route path='/' component={Login} />
    <Route path='/timeline(/:login)' component={App} onEnter={handleAuth} />
    <Route path='/logout' component={Logout} />
  </Router>,
  document.getElementById('root')
);
