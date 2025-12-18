import { winningCombinations } from "../winning-combinations/combinations";
import { cellValue } from "../types/Square";


export function checkGame(tabuleiro: cellValue[])
  : { ended: boolean, winner: 'X' | 'O' | null, combination: number[] | null } {

  for (const [a, b, c] of winningCombinations) {
    if (
      tabuleiro[a] &&
      tabuleiro[a] === tabuleiro[b] &&
      tabuleiro[b] === tabuleiro[c]
    ) {
      return { ended: true, winner: tabuleiro[a], combination: [a, b, c] }; // ✅ Retorna da função checkGame
    }
  }

  let someEmpty = false;
  for (const cell of tabuleiro) {
    if (cell === null) {
      someEmpty = true;
    }
  }

  // sem espaços vazios, o jogo acabou
  if (!someEmpty) {
    return { ended: true, winner: null, combination: null }
  }

  return { ended: false, winner: null, combination: null };
}