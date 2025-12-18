import { winningCombinations } from "../winning-combinations/combinations";
import { cellValue } from "../types/Square";


/**
 * 
 * @param tabuleiro 
 * @returns objeto com informações do estado do jogo
 * @description Verifica o estado do jogo (acabou, vencedor, combinação vencedora)
 */
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

  // verifica se há algum espaço vazio
  // se não houver, é empate 
  // e o jogo acabou
  const someEmpty = tabuleiro.some(cell => cell === null);
  if (!someEmpty) {
    return { ended: true, winner: null, combination: null }
  }


  // jogo não acabou
  // retorno padrão
  return { ended: false, winner: null, combination: null };
}