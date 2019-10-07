export function listagem(fotos) {
  return { type: 'LISTAGEM', fotos };
}

export function comentagem(fotoId, novoComentario) {
  return { type: 'COMENTARIO', fotoId, novoComentario };
}

export function likagem(fotoId, liker) {
  return { type: 'LIKE', fotoId, liker };
}

export function alertagem(mensagem) {
  return { type: 'ALERT', mensagem };
}
