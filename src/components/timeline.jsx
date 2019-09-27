import React, { Component } from 'react';
import FotoItem from './foto';

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fotos: []
    };
    this.login = this.props.login;
  }

  carregaFotos = () => {
    const token = localStorage.getItem('auth-token');

    let urlPerfil;
    if (this.login === undefined) {
      urlPerfil = `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${token}`;
    } else {
      urlPerfil = `http://localhost:8080/api/public/fotos/${this.login}`;
    }

    fetch(urlPerfil)
      .then(res => res.json())
      .then(fotos => {
        this.setState({ fotos: fotos });
      });
  };

  componentDidMount() {
    this.carregaFotos();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login !== undefined) {
      this.login = nextProps.login;
      this.carregaFotos();
    }
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
