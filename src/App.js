import React from 'react';
import Header from './components/header.jsx';
import Timeline from './components/timeline.jsx';
import TimelineStore from './Logicas/TimelineStore';

const timelineStore = new TimelineStore([]);

function App(props) {
  return (
    <div id='root'>
      <div className='main'>
        <Header />
        <Timeline login={props.params.login} store={timelineStore} />
      </div>
    </div>
  );
}

export default App;
