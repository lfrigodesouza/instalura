export function timeline(state = [], action) {
  if (action.type === 'LISTAGEM') {
    return action.fotos;
  }
  if (action.type === 'COMENTARIO') {
    const fotoId = action.fotoId;
    const novoComentario = action.novoComentario;
    const fotoAchada = state.find(f => f.id == fotoId);
    fotoAchada.comentarios.push(novoComentario);
    return state;
  }
  if (action.type === 'LIKE') {
    const fotoAchada = state.find(f => f.id == action.fotoId);
    fotoAchada.likeada = !fotoAchada.likeada;
    const likerFound = fotoAchada.likers.find(
      likerAtual => likerAtual.login === action.liker.login
    );
    if (!likerFound) {
      fotoAchada.likers.push(action.liker);
    } else {
      const novosLikers = fotoAchada.likers.filter(
        likerAtual => likerAtual.login !== action.liker.login
      );
      fotoAchada.likers = novosLikers;
    }
    return state;
  }
  return state;
}
