import React, { Component } from 'react';
import { Link } from 'react-router';

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
  render() {
    return (
      <div className='foto-info'>
        <div className='foto-info-likes'>
          {this.props.foto.likers.map(liker => {
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
          {this.props.foto.comentarios.map(comentario => {
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
  handleLike = evt => {
    evt.preventDefault();
    this.props.onLike(this.props.foto.id);
  };

  handleComment = evt => {
    evt.preventDefault();
    this.props.onComment(this.comentario.value, this.props.foto.id);
    this.comentario.value = '';
  };

  handleLikeada = () => {
    return this.props.foto.likeada
      ? 'fotoAtualizacoes-like-ativo'
      : 'fotoAtualizacoes-like';
  };

  render() {
    return (
      <section className='fotoAtualizacoes'>
        <a onClick={this.handleLike} className={this.handleLikeada()}>
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
        <FotoAtualizacoes
          foto={this.props.foto}
          onLike={this.props.onLike}
          onComment={this.props.onComment}
        />
      </div>
    );
  }
}

export default FotoItem;
