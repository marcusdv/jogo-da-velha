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
  const [vencedor, setVencedor] = useState<'X' | 'O' | null>(null)



  function handleSquareClick(indice: number, novoValor: cellValue): void {
    if (gameEnded || tabuleiro[indice]) return;

    const novoTabuleiro = [...tabuleiro];
    novoTabuleiro[indice] = novoValor

    setTabuleiro(novoTabuleiro);
    setPilha(prevPilha => [...prevPilha, novoTabuleiro])

    // verifica se jogo terminou
    const jogoTerminou = checkGame(novoTabuleiro)
    console.log('jogo terminou', jogoTerminou)

    if (jogoTerminou.ended) {
      setGameEnded(true)
      setVencedor(jogoTerminou.winner) // playerTurn é quem jogou agora
    } else {
      setPlayerTurn(prev => prev === 'X' ? 'O' : 'X');
    }
  }



  function handleJogadasPilhaClick(idx: number): void {
    const novoTabuleiro = pilha[idx]
    setTabuleiro(novoTabuleiro)
    const jogoTerminou = checkGame(novoTabuleiro)
    setGameEnded(jogoTerminou.ended)


    if (jogoTerminou.ended) {
      setGameEnded(true)
      setVencedor(jogoTerminou.winner) // playerTurn é quem jogou agora
    } 
    
    setPilha(prev => {
      return prev.slice(0, idx + 1)
    })

    setPlayerTurn(() => {
      // conta quantos deles estão no tabuleiro
      const contadorObj = novoTabuleiro.reduce((acc, val) => {
        if (val === 'X') acc.X += 1;
        if (val === 'O') acc.O += 1;
        return acc;
      },
        { X: 0, O: 0 }
      )
      // verifica de quem é a vez
      if (contadorObj.X === contadorObj.O || contadorObj.X === 0 && contadorObj.O === 0) {
        return 'X'
      } else {
        return 'O'
      }

    })
  }

  function handleResetClick() {
    setGameEnded(false)
    setVencedor(null)
    setPilha([])
    setTabuleiro(Array(9).fill(''))
    setPlayerTurn('X')
  }

  return (
    <>
      <h1>
        {gameEnded ?
          (vencedor ? ` Winner: ${vencedor} ` : `Empate!`)
          :
          `Turn: ${playerTurn } `
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
