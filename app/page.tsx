'use client'
import { useMemo, useState } from "react";
import Square from "./components/Square"
import { cellValue } from './types/Square'
import { checkGame } from "./rules/checkGame";

export default function Home() {
  const [tabuleiro, setTabuleiro] = useState<cellValue[]>(Array(9).fill(null))
  const [historico, setHistorico] = useState<cellValue[][]>([])

  // Calcular diretamente sem estados separados
  const playerTurn = historico.length % 2 === 0 ? 'X' : 'O'; // X sempre joga quando há par jogadas na pilha
  const resultado = useMemo(() => checkGame(tabuleiro), [tabuleiro]);
  const gameEnded = resultado.ended;
  const vencedor = resultado.winner;


  const handleSquareClick = (indice: number, novoValor: cellValue): void => {
    if (gameEnded || tabuleiro[indice]) return;

    // criando novo tabuleiro com a jogada
    const novoTabuleiro = [...tabuleiro];
    novoTabuleiro[indice] = novoValor

    // adicionando ao tabuleiro e a historico
    setTabuleiro(novoTabuleiro);
    setHistorico(prevPilha => [...prevPilha, novoTabuleiro])

  }

  function handleJogadasPilhaClick(idx: number): void {
    const novoTabuleiro = historico[idx]
    setTabuleiro(novoTabuleiro)

    setHistorico(prev => {
      return prev.slice(0, idx + 1)
    })
  }


  function handleResetClick() {
    setHistorico([])
    setTabuleiro(Array(9).fill(null))
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
            const quadradoVencedor = vencedor && resultado.combination && resultado.combination.includes(i)

            return <li
              key={i}
              className={` ${quadradoVencedor && 'bg-teal-950'} `}
            >
              <Square
                posicao={i}
                value={tabuleiro[i]}
                handleSquareClick={handleSquareClick}
                playerTurn={playerTurn}
              />
            </li>
          })
        }
      </ul>

      {/* RESET */}
      <div className="reset-div">
        {historico.length > 0 &&
          <button onClick={handleResetClick}>reset</button>
        }
      </div>


      {/* PILHA DE JOGADAS */}
      <ul className="jogadas-lista">

        {

          historico.map((arr, idx) => {
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
