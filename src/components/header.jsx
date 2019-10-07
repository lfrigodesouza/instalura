import React, { Component } from 'react';
import TimeLineApi from '../Logicas/TimeLineApi';

class Header extends Component {
  state = {
    msg: ''
  };

  componentDidMount() {
    this.props.store.subscribe(() => {
      this.setState({ msg: this.props.store.getState().notificacao });
    });
  }

  handleSubmit = evt => {
    evt.preventDefault();
    if (!this.pesquisa.value) return;
    this.props.store.dispatch(TimeLineApi.pesquisa(this.pesquisa.value));
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
              <span>{this.state.msg}</span>
              <a href='#'>♡</a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
