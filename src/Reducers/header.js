export function notificacao(state = [], action) {
  if (action.type === 'ALERT') {
    return action.mensagem;
  }
  return state;
}
