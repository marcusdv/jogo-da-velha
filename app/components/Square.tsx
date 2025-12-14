'use client'
import { cellValue } from "../types/Square"

interface SquareProps {
  tabuleiro: cellValue[];
  posicao: number;
  playerTurn: cellValue;
  handleSquareClick: (indice: number, novoValor: cellValue) => void;
  gameEnded: boolean
}


export default function Square({ tabuleiro, posicao, playerTurn, handleSquareClick, gameEnded, }: SquareProps) {
  function handleClick() {
    if (gameEnded) return;
    if (tabuleiro[posicao]) return;
    handleSquareClick(posicao, playerTurn)
  }

  return <button onClick={handleClick} className="square">{tabuleiro[posicao]}</button>;
}