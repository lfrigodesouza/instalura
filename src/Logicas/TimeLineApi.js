export default class TimeLineApi {
  static lista(urlPerfil) {
    return dispatch => {
      const token = localStorage.getItem('auth-token');
      fetch(urlPerfil, {
        headers: new Headers({
          'X-AUTH-TOKEN': token
        })
      })
        .then(res => res.json())
        .then(fotos => {
          dispatch({ type: 'LISTAGEM', fotos });
          return fotos;
        });
    };
  }

  static comenta(comentario, fotoId) {
    return dispatch => {
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
          dispatch({ type: 'COMENTARIO', fotoId, novoComentario });
          return novoComentario;
        });
    };
  }

  static like(fotoId) {
    return dispatch => {
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
          dispatch({ type: 'LIKE', fotoId, liker });
          return liker;
        });
    };
  }
}
