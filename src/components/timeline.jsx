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

    PubSub.subscribe('atualiza-liker', (topic, data) => {
      const fotoAchada = this.state.fotos.find(f => f.id == data.fotoId);
      fotoAchada.likeada = !fotoAchada.likeada;
      const likerFound = fotoAchada.likers.find(
        liker => liker.login === data.liker.login
      );
      if (!likerFound) {
        fotoAchada.likers.push(data.liker);
      } else {
        const novosLikers = fotoAchada.likers.filter(
          liker => liker.login !== data.liker.login
        );
        fotoAchada.likers = novosLikers;
      }
      this.setState({ fotos: this.state.fotos });
    });

    PubSub.subscribe('novo-comentario', (topic, data) => {
      const fotoAchada = this.state.fotos.find(f => f.id == data.fotoId);

      fotoAchada.comentarios.push(data.novoComentario);
      this.setState({ fotos: this.state.fotos });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login !== undefined) {
      this.login = nextProps.login;
      this.carregaFotos();
    }
  }

  handleComment = (comentario, fotoId) => {
    fetch(`http://localhost:8080/api/fotos/${fotoId}/comment`, {
      headers: new Headers({
        'X-AUTH-TOKEN': localStorage.getItem('auth-token'),
        'Content-type': 'application/json'
      }),
      method: 'POST',
      body: JSON.stringify({ texto: comentario })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Não foi possível comentar');
        }
      })
      .then(novoComentario => {
        console.log(novoComentario);
        PubSub.publish('novo-comentario', {
          fotoId,
          novoComentario
        });
      });
  };

  handleLike = fotoId => {
    fetch(`http://localhost:8080/api/fotos/${fotoId}/like`, {
      method: 'POST',
      headers: new Headers({
        'X-AUTH-TOKEN': localStorage.getItem('auth-token')
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Não foi possível realizar o like da foto');
        }
      })
      .then(liker => {
        PubSub.publish('atualiza-liker', {
          fotoId,
          liker
        });
      });
  };

  render() {
    return (
      <div className='fotos container'>
        <CSSTransitionGroup
          transitionName='timeline'
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {this.state.fotos.map(foto => {
            return (
              <FotoItem
                foto={foto}
                key={foto.id}
                onLike={this.handleLike}
                onComment={this.handleComment}
              />
            );
          })}
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default Timeline;
