'use client'
import { cellValue } from "../types/Square"

interface SquareProps {
  value: cellValue;
  posicao: number;
  playerTurn: cellValue;
  handleSquareClick: (indice: number, novoValor: cellValue) => void;
}


export default function Square({ value, posicao, playerTurn, handleSquareClick }: SquareProps) {
  function handleClick() {
    if (value) return; // já tem valor
    handleSquareClick(posicao, playerTurn)
  }

  return <button
    onClick={handleClick}
    className={`square ${value === 'X' ? 'text-blue-300' : value === 'O' ? 'text-pink-300' : ''} `}
  >
    {value}
  </button>;
}