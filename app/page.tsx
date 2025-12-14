'use client'
import { useState } from "react";
import Square from "./components/Square"
import { cellValue } from './types/Square'
import { checkGame } from "./rules/checkGame";

export default function Home() {
  const [tabuleiro, setTabuleiro] = useState<cellValue[]>(Array(9).fill(''))
  const [playerTurn, setPlayerTurn] = useState<"X" | "O">("X")
  const [gameEnded, setGameEnded] = useState<boolean>(false)
  const [pilha, setPilha] = useState<cellValue[][]>([])
  const [vencedor, setVencedor] = useState<'X' | 'O'>()



  function handleSquareClick(indice: number, novoValor: cellValue): void {
    if (gameEnded || tabuleiro[indice]) return;

    const novoTabuleiro = [...tabuleiro];
    novoTabuleiro[indice] = novoValor
    setTabuleiro(novoTabuleiro);
    setPilha(prevPilha => [...prevPilha, novoTabuleiro])

    // verifica se jogo terminou
    const jogoTerminou = checkGame(novoTabuleiro)


    if (jogoTerminou.ended) {
      setGameEnded(true)
      if (jogoTerminou.winner) {
        setVencedor(playerTurn) // playerTurn é quem jogou agora
      }
    } else {
      setPlayerTurn(prev => prev === 'X' ? 'O' : 'X');
    }
  }



  // ! Fazer com que o jogo continue de onde foi clicado'
  function handleJogadasPilhaClick(idx: number): void {
    if (!gameEnded) return;
    setTabuleiro(pilha[idx])
  }

  function handleResetClick() {
    setGameEnded(false)
    setVencedor(undefined)
    setPilha([])
    setTabuleiro(Array(9).fill(''))
    setPlayerTurn('X')
  }

  return (
    <>
      <h1>
        {gameEnded ?
          (vencedor !== undefined ? ` Winner: ${vencedor} ` : `Empate!`)
          :
          `Turn: ${playerTurn} `
        }
      </h1>

      <ul className="caixa-jogo-da-velha">
        {
          tabuleiro.map((_, i) => {
            return <li
              key={i}
            >
              <Square
                tabuleiro={tabuleiro}
                posicao={i}
                handleSquareClick={handleSquareClick}
                playerTurn={playerTurn}
                gameEnded={gameEnded}
              />
            </li>
          })
        }
      </ul>

      {/* PILHA DE JOGADAS */}
      <ul className="jogadas-lista">

        {

          pilha.map((arr, idx) => {
            return <li key={idx}>
              <button onClick={() => handleJogadasPilhaClick(idx)}>
                <span>{idx + 1}</span>
                {arr.join(' ')}
              </button>
            </li>
          })

        }
      </ul>
      <div className="reset-div">
        {gameEnded &&
          <button onClick={handleResetClick}>reset</button>
        }
      </div>
    </>
  );
}
