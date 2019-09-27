import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: this.props.location.query.msg
    };
  }

  handleSubmit = evt => {
    evt.preventDefault();
    this.setState({ msg: '' });
    const requestInfo = {
      method: 'POST',
      body: JSON.stringify({
        login: this.login.value,
        senha: this.senha.value
      }),
      headers: new Headers({
        'Content-type': 'application/json'
      })
    };
    fetch('http://localhost:8080/api/public/login', requestInfo)
      .then(res => {
        if (res.ok) {
          return res.text();
        } else {
          throw new Error('Não foi possível fazer o login');
        }
      })
      .then(token => {
        localStorage.setItem('auth-token', token);
        browserHistory.push('/timeline');
      })
      .catch(error => {
        this.setState({ msg: error.message });
      });
  };

  render() {
    return (
      <div className='login-box'>
        <h1 className='header-logo'>Instalura</h1>
        <span>{this.state.msg}</span>
        <form onSubmit={this.handleSubmit}>
          <input type='text' ref={input => (this.login = input)} />
          <input type='password' ref={input => (this.senha = input)} />
          <input type='submit' value='login' />
        </form>
      </div>
    );
  }
}

export default Login;
