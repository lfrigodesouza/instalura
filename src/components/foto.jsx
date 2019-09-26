import React, { Component } from 'react';

class FotoHeader extends Component {
  render() {
    return (
      <header className='foto-header'>
        <figure className='foto-usuario'>
          <img
            src='https://randomuser.me/api/portraits/men/41.jpg'
            alt='foto do usuario'
          />
          <figcaption className='foto-usuario'>
            <a href='#'>alots</a>
          </figcaption>
        </figure>
        <time className='foto-data'>03/10/2016 20:13</time>
      </header>
    );
  }
}

class FotoInfo extends Component {
  render() {
    return (
      <div className='foto-info'>
        <div className='foto-info-likes'>
          <a href='#'>alots_ssa</a>,<a href='#'>rafael_rollo</a>
          curtiram
        </div>

        <p className='foto-info-legenda'>
          <a className='foto-info-autor'>autor </a>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, illo?
        </p>

        <ul className='foto-info-comentarios'>
          <li className='comentario'>
            <a className='foto-info-autor'>seguidor </a>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem ad,
            molestiae.
          </li>
          <li className='comentario'>
            <a className='foto-info-autor'>seguidor </a>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt
            cumque earum molestias voluptatem modi nihil sit magnam ratione
            eveniet distinctio magni error asperiores dignissimos tempora
            expedita, laborum ex soluta hic maiores veritatis deserunt.
          </li>
          <li className='comentario'>
            <a className='foto-info-autor'>seguidor </a>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum
            laudantium quae ab fuga odio delectus maiores voluptatibus sit
            commodi quidem.
          </li>
        </ul>
      </div>
    );
  }
}

class FotoAtualizacoes extends Component {
  render() {
    return (
      <section className='fotoAtualizacoes'>
        <a href='#' className='fotoAtualizacoes-like'>
          Likar
        </a>
        <form className='fotoAtualizacoes-form'>
          <input
            type='text'
            placeholder='Adicione um comentário...'
            className='fotoAtualizacoes-form-campo'
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

class Foto extends Component {
  state = {};
  render() {
    return (
      <div className='foto'>
        <FotoHeader />
        <img
          alt='foto'
          className='foto-src'
          src='https://picsum.photos/id/511/600'
        />
        <FotoInfo />
        <FotoAtualizacoes />
      </div>
    );
  }
}

export default Foto;
