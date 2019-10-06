import React from 'react';
import Header from './components/header.jsx';
import Timeline from './components/timeline.jsx';
import { createStore, applyMiddleware } from 'redux';
import { timeline } from './Reducers/timeline.js';
import thunkMiddleware from 'redux-thunk';

const store = createStore(timeline, applyMiddleware(thunkMiddleware));

function App(props) {
  return (
    <div id='root'>
      <div className='main'>
        <Header />
        <Timeline login={props.params.login} store={store} />
      </div>
    </div>
  );
}

export default App;
