import React, { Component } from 'react';
import Foto from './foto';

class Timeline extends Component {
  state = {};
  render() {
    return (
      <div className='fotos container'>
        <Foto />
      </div>
    );
  }
}

export default Timeline;
