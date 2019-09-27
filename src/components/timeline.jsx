import React, { Component } from 'react';
import FotoItem from './foto';

class Timeline extends Component {
  constructor() {
    super();
    this.state = {
      fotos: []
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('auth-token');
    fetch(`http://localhost:8080/api/fotos?X-AUTH-TOKEN=${token}`)
      .then(res => res.json())
      .then(fotos => {
        this.setState({ fotos: fotos });
      });
  }

  render() {
    return (
      <div className='fotos container'>
        {this.state.fotos.map(foto => {
          return <FotoItem foto={foto} key={foto.id} />;
        })}
      </div>
    );
  }
}

export default Timeline;
