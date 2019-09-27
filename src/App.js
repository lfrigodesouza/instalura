import React from 'react';
import Header from './components/header.jsx';
import Timeline from './components/timeline.jsx';

function App(props) {
  return (
    <div id='root'>
      <div className='main'>
        <Header />
        <Timeline login={props.params.login} />
      </div>
    </div>
  );
}

export default App;
