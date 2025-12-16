import { cellValue } from "../types/Square";

export function calcularProximoJogador(novoTabuleiro: cellValue[]): 'X' | 'O' {

  const contadorObj = novoTabuleiro.reduce((acc, val) => {
    if (val === 'X') acc.X += 1;
    if (val === 'O') acc.O += 1;
    return acc;
  }, { X: 0, O: 0 });
  // verifica de quem é a vez
  if (contadorObj.X === contadorObj.O || contadorObj.X === 0 && contadorObj.O === 0) {
    return 'X';
  } else {
    return 'O';
  }
}