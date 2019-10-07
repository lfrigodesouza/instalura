import React from 'react';
import Header from './components/header.jsx';
import Timeline from './components/timeline.jsx';
import { ReactReduxContext } from 'react-redux';

function App(props) {
  return (
    <ReactReduxContext.Consumer>
      {({ store }) => {
        return (
          <div id='root'>
            <div className='main'>
              <Header store={store} />
              <Timeline login={props.params.login} />
            </div>
          </div>
        );
      }}
    </ReactReduxContext.Consumer>
  );
}

export default App;
