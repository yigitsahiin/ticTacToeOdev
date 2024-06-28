import React, { useState } from 'react';

const boardStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "auto auto auto",
  gap: "10px 5px",
  position: 'relative' 
};

const tileStyle: React.CSSProperties = {
  backgroundColor: "grey",
  width: "50px",
  height: "50px",
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  position: 'relative'
};

const lineStyle: React.CSSProperties = {
  position: 'absolute',
  width: 'calc(100% - 20px)', 
  height: '3px',
  backgroundColor: 'red',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
};

// Kazananı kontrol eden fonksiyon win win win
const checkWinner = (tiles: (null | 'X' | 'O')[]): number[] | null => {
  // Kazanma koşulları
  const winningConditions: number[][] = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
  ];

  // Her bir kazanma koşulunu kontrol et
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]) {
      return condition; // Kazanan koşulu döndürrrrrrr
    }
  }

  return null; // kazanamadıkkk
};

// Board bileşeni için props
interface BoardProps {
  nextPlayer: 'X' | 'O'; // Sıradaki oyuncu
  setNextPlayer: React.Dispatch<React.SetStateAction<'X' | 'O'>>; // Sıradaki oyuncuyu ayarlayan fonksiyon
  setHasWinner: React.Dispatch<React.SetStateAction<boolean>>; // Kazananın olup olmadığını ayarlayan fonksiyon
  changePlayer: () => void; // Oyuncu değiştirme fonksiyonu
}

const Board: React.FC<BoardProps> = ({ nextPlayer, setNextPlayer, setHasWinner, changePlayer }) => {
  const [tiles, setTiles] = useState<(null | 'X' | 'O')[]>(Array(9).fill(null)); // Oyun tahtasını tutan state
  const [winnerLine, setWinnerLine] = useState<number[] | null>(null); // Kazananın hattını tutan state

  // Kareye tıklama işlevi
  const handleClickTile = (index: number) => {
    if (tiles[index] === null && !winnerLine) {
      const newTiles = [...tiles];
      newTiles[index] = nextPlayer;
      setTiles(newTiles);

      const line = checkWinner(newTiles); // Kazananı kontrol et
      if (line) {
        setWinnerLine(line); // Kazanan hattını ayarla
        setHasWinner(true); // Kazanan var olarak ayarla
      } else {
        changePlayer(); // Sıradaki oyuncuyu değiştir
      }
    }
  };

  return (
    <div style={boardStyle}>
      {/* Oyun tahtası kareleri */}
      {tiles.map((value, index) => {
        let tileStyleWithLine = { ...tileStyle };
        if (winnerLine && winnerLine.includes(index)) {
          tileStyleWithLine = {
            ...tileStyleWithLine,
            position: 'relative',
            overflow: 'hidden'
          };
        }

        return (
          <div
            key={index}
            style={tileStyleWithLine}
            onClick={() => handleClickTile(index)}
          >
            {value}
            {/* Kazanan hattı gösterimi */}
            {winnerLine && winnerLine.includes(index) && (
              <div
                style={{
                  ...lineStyle,
                  transform: winnerLine.includes(index) ? 'rotate(0deg)' : 'rotate(-45deg)'
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export { Board };
