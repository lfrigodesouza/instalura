import { List } from 'immutable';

function TrocaFoto(lista, fotoId, callbackAtualizaPropriedades) {
  const fotoEstadoAntigo = lista.find(f => f.id == fotoId);
  const novasPropriedades = callbackAtualizaPropriedades(fotoEstadoAntigo);
  const fotoEstadoNovo = Object.assign({}, fotoEstadoAntigo, novasPropriedades);

  const indiceLista = lista.findIndex(foto => foto.id === fotoId);
  return lista.set(indiceLista, fotoEstadoNovo);
}

export function timeline(state = new List(), action) {
  if (action.type === 'LISTAGEM') {
    return new List(action.fotos);
  }
  if (action.type === 'COMENTARIO') {
    return TrocaFoto(state, action.fotoId, fotoEstadoAntigo => {
      const novosComentarios = fotoEstadoAntigo.comentarios.concat(
        action.novoComentario
      );
      return { comentarios: novosComentarios };
    });
  }
  if (action.type === 'LIKE') {
    return TrocaFoto(state, action.fotoId, fotoEstadoAntigo => {
      const likeada = !fotoEstadoAntigo.likeada;
      const likerFound = fotoEstadoAntigo.likers.find(
        likerAtual => likerAtual.login === action.liker.login
      );
      let novosLikers;

      if (!likerFound) {
        novosLikers = fotoEstadoAntigo.likers.concat(action.liker);
      } else {
        novosLikers = fotoEstadoAntigo.likers.filter(
          likerAtual => likerAtual.login !== action.liker.login
        );
      }
      return { likers: novosLikers, likeada };
    });
  }
  return state;
}
