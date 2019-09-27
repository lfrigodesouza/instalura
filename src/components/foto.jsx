import React, { Component } from 'react';
import { Link } from 'react-router';
import PubSub from 'pubsub-js';
import { tsImportEqualsDeclaration } from '@babel/types';

class FotoHeader extends Component {
  render() {
    return (
      <header className='foto-header'>
        <figure className='foto-usuario'>
          <img src={this.props.foto.urlPerfil} alt='foto do usuario' />
          <figcaption className='foto-usuario'>
            <Link to={`/timeline/${this.props.foto.loginUsuario}`}>
              {this.props.foto.loginUsuario}
            </Link>
          </figcaption>
        </figure>
        <time className='foto-data'>{this.props.foto.horario}</time>
      </header>
    );
  }
}

class FotoInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likers: this.props.foto.likers,
      comentarios: this.props.foto.comentarios
    };
  }

  componentWillMount() {
    PubSub.subscribe('atualiza-liker', (topic, data) => {
      if (data.fotoId === this.props.foto.id) {
        const likerFound = this.state.likers.find(
          liker => liker.login === data.liker.login
        );
        if (!likerFound) {
          const novosLikers = this.state.likers.concat(data.liker);
          this.setState({ likers: novosLikers });
        } else {
          const novosLikers = this.state.likers.filter(
            liker => liker.login !== data.liker.login
          );
          this.setState({ likers: novosLikers });
        }
      }
    });

    PubSub.subscribe('novo-comentario', (topic, data) => {
      if (data.fotoId === this.props.foto.id) {
        let novoComentarios = this.state.comentarios.concat(
          data.novoComentario
        );
        this.setState({ comentarios: novoComentarios });
      }
    });
  }

  render() {
    return (
      <div className='foto-info'>
        <div className='foto-info-likes'>
          {this.state.likers.map(liker => {
            return (
              <span>
                <Link key={liker.login} to={`/timeline/${liker.login}`}>
                  {liker.login}
                </Link>{' '}
              </span>
            );
          })}
          curtiram
        </div>

        <p className='foto-info-legenda'>
          <Link
            className='foto-info-autor'
            to={`/timeline/${this.props.foto.loginUsuario}`}
          >
            {this.props.foto.loginUsuario}
          </Link>{' '}
          {this.props.foto.comentario}
        </p>

        <ul className='foto-info-comentarios'>
          {this.state.comentarios.map(comentario => {
            return (
              <li className='comentario' key={comentario.id}>
                <Link
                  className='foto-info-autor'
                  to={`/timeline/${comentario.login}`}
                >
                  {comentario.login}
                </Link>{' '}
                {comentario.texto}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

class FotoAtualizacoes extends Component {
  state = {
    likeada: this.props.foto.likeada
  };

  handleLike = evt => {
    evt.preventDefault();
    fetch(`http://localhost:8080/api/fotos/${this.props.foto.id}/like`, {
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
        this.setState({ likeada: !this.state.likeada });
        PubSub.publish('atualiza-liker', {
          fotoId: this.props.foto.id,
          liker
        });
      });
  };

  handleComment = evt => {
    evt.preventDefault();
    fetch(`http://localhost:8080/api/fotos/${this.props.foto.id}/comment`, {
      headers: new Headers({
        'X-AUTH-TOKEN': localStorage.getItem('auth-token'),
        'Content-type': 'application/json'
      }),
      method: 'POST',
      body: JSON.stringify({ texto: this.comentario.value })
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
        this.comentario.value = '';
        PubSub.publish('novo-comentario', {
          fotoId: this.props.foto.id,
          novoComentario
        });
      });
  };

  render() {
    return (
      <section className='fotoAtualizacoes'>
        <a
          onClick={this.handleLike}
          className={
            this.state.likeada
              ? 'fotoAtualizacoes-like-ativo'
              : 'fotoAtualizacoes-like'
          }
        >
          Likar
        </a>
        <form className='fotoAtualizacoes-form' onSubmit={this.handleComment}>
          <input
            type='text'
            placeholder='Adicione um comentário...'
            className='fotoAtualizacoes-form-campo'
            ref={input => (this.comentario = input)}
          />
          <input
            type='submit'
            value='Comentar!'
            className='fotoAtualizacoes-form-submit'
          />
        </form>
      </section>
    );
  }
}

class FotoItem extends Component {
  render() {
    return (
      <div className='foto'>
        <FotoHeader foto={this.props.foto} />
        <img alt='foto' className='foto-src' src={this.props.foto.urlFoto} />
        <FotoInfo foto={this.props.foto} />
        <FotoAtualizacoes foto={this.props.foto} />
      </div>
    );
  }
}

export default FotoItem;
