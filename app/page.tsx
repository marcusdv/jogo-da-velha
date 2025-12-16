'use client'
import { useState } from "react";
import Square from "./components/Square"
import { cellValue } from './types/Square'
import { checkGame } from "./rules/checkGame";
import { calcularProximoJogador } from "./rules/calcularProximoJogador";

export default function Home() {
  const [tabuleiro, setTabuleiro] = useState<cellValue[]>(Array(9).fill(null))
  const [pilha, setPilha] = useState<cellValue[][]>([])
  const [playerTurn, setPlayerTurn] = useState<"X" | "O">("X")
  const [gameEnded, setGameEnded] = useState<boolean>(false)
  const [vencedor, setVencedor] = useState<'X' | 'O' | null>(null)


  const handleSquareClick = (indice: number, novoValor: cellValue): void => {
    if (gameEnded || tabuleiro[indice]) return;

    const novoTabuleiro = [...tabuleiro];
    novoTabuleiro[indice] = novoValor

    // adicionando ao tabuleiro e a pilha
    setTabuleiro(novoTabuleiro);
    setPilha(prevPilha => [...prevPilha, novoTabuleiro])

    // verifica se jogo terminou
    const jogoTerminou = checkGame(novoTabuleiro)

    if (checkGame(novoTabuleiro).ended) {
      setGameEnded(true)
      setVencedor(jogoTerminou.winner) // playerTurn é quem jogou agora
    } else {
      setPlayerTurn(calcularProximoJogador(novoTabuleiro))
    }
  }

  function handleJogadasPilhaClick(idx: number): void {
    const novoTabuleiro = pilha[idx]
    setTabuleiro(novoTabuleiro)

    const jogoTerminou = checkGame(novoTabuleiro)
    setGameEnded(jogoTerminou.ended)


    if (jogoTerminou.ended) {
      setGameEnded(true)
      setVencedor(jogoTerminou.winner)
    }

    setPilha(prev => {
      return prev.slice(0, idx + 1)
    })

    setPlayerTurn(calcularProximoJogador(novoTabuleiro))
  }



  function handleResetClick() {
    setGameEnded(false)
    setVencedor(null)
    setPilha([])
    setTabuleiro(Array(9).fill(null))
    setPlayerTurn('X')
  }


  return (
    <>
      <h1>
        {gameEnded ?
          (vencedor ? ` Winner: ${vencedor} ` : `Empate!`)
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
                posicao={i}
                value={tabuleiro[i]}
                handleSquareClick={handleSquareClick}
                playerTurn={playerTurn}
                gameEnded={gameEnded}
              />
            </li>
          })
        }
      </ul>

      {/* RESET */}
      <div className="reset-div">
        {pilha.length > 0 &&
          <button onClick={handleResetClick}>reset</button>
        }
      </div>


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

    </>
  );
}
