import { winningCombinations } from "../winning-combinations/combinations";
import { cellValue } from "../types/Square";


export function checkGame(novoTabuleiro: cellValue[])
  :
  {ended: boolean, winner: boolean} {

  for (const [a, b, c] of winningCombinations) {
    if (
      novoTabuleiro[a] &&
      novoTabuleiro[a] === novoTabuleiro[b] &&
      novoTabuleiro[b] === novoTabuleiro[c]
    ) {
      return {ended: true, winner: true}; // ✅ Retorna da função checkGame
    }
  }

  let someEmpty = false;
  for (const cell of novoTabuleiro) {
    if (cell === '') {
      someEmpty = true;
    }
  }

  // sem espaços vazios, o jogo acabou
  if (!someEmpty) {
    return {ended: true, winner: false}
  }

  return {ended: false, winner: false};
}