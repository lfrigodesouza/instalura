import React, { Component } from 'react';
import FotoItem from './foto';
import { CSSTransitionGroup } from 'react-transition-group';
import TimeLineApi from '../Logicas/TimeLineApi';
import { connect } from 'react-redux';

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.login = this.props.login;
  }

  carregaFotos = () => {
    let urlPerfil;
    if (this.login === undefined) {
      urlPerfil = `http://localhost:8080/api/fotos`;
    } else {
      urlPerfil = `http://localhost:8080/api/public/fotos/${this.login}`;
    }

    this.props.lista(urlPerfil);
  };

  componentDidMount() {
    this.carregaFotos();
  }

  // componentWillMount() {
  //   this.props.store.subscribe(() => {
  //     this.setState({ fotos: this.props.store.getState().timeline });
  //   });
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login !== this.login) {
      this.login = nextProps.login;
      this.carregaFotos();
    }
  }

  // handleComment = (comentario, fotoId) => {
  //   this.props.store.dispatch(TimeLineApi.comenta(comentario, fotoId));
  // };

  // handleLike = fotoId => {
  //   this.props.store.dispatch(TimeLineApi.like(fotoId));
  // };

  render() {
    return (
      <div className='fotos container'>
        <CSSTransitionGroup
          transitionName='timeline'
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {this.props.fotos.map(foto => {
            return (
              <FotoItem
                foto={foto}
                key={foto.id}
                onLike={this.props.handleLike}
                onComment={this.props.handleComment}
              />
            );
          })}
        </CSSTransitionGroup>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { fotos: state.timeline };
};

const mapDispatchToProps = dispatch => {
  return {
    handleLike: fotoId => {
      dispatch(TimeLineApi.like(fotoId));
    },
    handleComment: (comentario, fotoId) => {
      dispatch(TimeLineApi.comenta(comentario, fotoId));
    },
    lista: urlPerfil => {
      dispatch(TimeLineApi.lista(urlPerfil));
    }
  };
};

const TimelineContainer = new connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);

export default TimelineContainer;
