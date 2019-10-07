import React from 'react';
import Header from './components/header.jsx';
import Timeline from './components/timeline.jsx';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { timeline } from './Reducers/timeline.js';
import { notificacao } from './Reducers/header.js';
import thunkMiddleware from 'redux-thunk';

const reducers = combineReducers({ timeline, notificacao });
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

function App(props) {
  return (
    <div id='root'>
      <div className='main'>
        <Header store={store} />
        <Timeline login={props.params.login} store={store} />
      </div>
    </div>
  );
}

export default App;
