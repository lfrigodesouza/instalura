import React from 'react';
import Header from './components/header.jsx';
import Timeline from './components/timeline.jsx';

function App() {
  return (
    <div id='root'>
      <div className='main'>
        <Header />
        <Timeline />
      </div>
    </div>
  );
}

export default App;
