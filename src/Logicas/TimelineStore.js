import PubSub from 'pubsub-js';

export default class LogicaTimeline {
  constructor(fotos) {
    this.fotos = fotos;
  }

  subscribe(callback) {
    PubSub.subscribe('timeline', (topico, fotos) => {
      callback(fotos);
    });
  }

  lista(urlPerfil) {
    const token = localStorage.getItem('auth-token');
    fetch(urlPerfil, {
      headers: new Headers({
        'X-AUTH-TOKEN': token
      })
    })
      .then(res => res.json())
      .then(fotos => {
        this.fotos = fotos;
        PubSub.publish('timeline', fotos);
      });
  }

  comenta(comentario, fotoId) {
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
        const fotoAchada = this.fotos.find(f => f.id == fotoId);

        fotoAchada.comentarios.push(novoComentario);
        PubSub.publish('timeline', this.fotos);
      });
  }

  like(fotoId) {
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
        const fotoAchada = this.fotos.find(f => f.id == fotoId);
        fotoAchada.likeada = !fotoAchada.likeada;
        const likerFound = fotoAchada.likers.find(
          likerAtual => likerAtual.login === liker.login
        );
        if (!likerFound) {
          fotoAchada.likers.push(liker);
        } else {
          const novosLikers = fotoAchada.likers.filter(
            likerAtual => likerAtual.login !== liker.login
          );
          fotoAchada.likers = novosLikers;
        }
        PubSub.publish('timeline', this.fotos);
      });
  }
}
