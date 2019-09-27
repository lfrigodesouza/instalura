import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import FotoItem from './foto';
import { CSSTransitionGroup } from 'react-transition-group';

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
      urlPerfil = `http://localhost:8080/api/fotos`;
    } else {
      urlPerfil = `http://localhost:8080/api/public/fotos/${this.login}`;
    }

    fetch(urlPerfil, {
      headers: new Headers({
        'X-AUTH-TOKEN': token
      })
    })
      .then(res => res.json())
      .then(fotos => {
        this.setState({ fotos: fotos });
      });
  };

  componentDidMount() {
    this.carregaFotos();
  }

  componentWillMount() {
    PubSub.subscribe('timeline', (topic, data) => {
      this.setState({ fotos: data });
    });
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
        <CSSTransitionGroup
          transitionName='timeline'
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {this.state.fotos.map(foto => {
            return <FotoItem foto={foto} key={foto.id} />;
          })}
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default Timeline;
