import React, { Component } from 'react';
import FotoItem from './foto';
import { CSSTransitionGroup } from 'react-transition-group';
import TimeLineApi from '../Logicas/TimeLineApi';

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fotos: []
    };
    this.login = this.props.login;
  }

  carregaFotos = () => {
    let urlPerfil;
    if (this.login === undefined) {
      urlPerfil = `http://localhost:8080/api/fotos`;
    } else {
      urlPerfil = `http://localhost:8080/api/public/fotos/${this.login}`;
    }

    this.props.store.dispatch(TimeLineApi.lista(urlPerfil));
  };

  componentDidMount() {
    this.carregaFotos();
  }

  componentWillMount() {
    this.props.store.subscribe(() => {
      this.setState({ fotos: this.props.store.getState() });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login !== undefined) {
      this.login = nextProps.login;
      this.carregaFotos();
    }
  }

  handleComment = (comentario, fotoId) => {
    this.props.store.dispatch(TimeLineApi.comenta(comentario, fotoId));
  };

  handleLike = fotoId => {
    this.props.store.dispatch(TimeLineApi.like(fotoId));
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
