import React, { Component } from 'react';
import PubSub from 'pubsub-js';

class Header extends Component {
  state = {};

  handleSubmit = evt => {
    evt.preventDefault();
    fetch(`http://localhost:8080/api/public/fotos/${this.pesquisa.value}`)
      .then(res => res.json())
      .then(fotos => {
        PubSub.publish('timeline', fotos);
      });
  };

  render() {
    return (
      <header className='header container'>
        <h1 className='header-logo'>Instalura</h1>

        <form className='header-busca' onSubmit={this.handleSubmit}>
          <input
            type='text'
            name='search'
            placeholder='Pesquisa'
            className='header-busca-campo'
            ref={input => (this.pesquisa = input)}
          />
          <input type='submit' value='Buscar' className='header-busca-submit' />
        </form>

        <nav>
          <ul className='header-nav'>
            <li className='header-nav-item'>
              <a href='#'>♡</a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
