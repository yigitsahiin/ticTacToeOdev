import React from 'react';

// Header bileşeni için props
interface HeaderProps {
  nextPlayer: 'X' | 'O'; // Sıradaki oyuncu
  hasWinner: boolean; // Kazananın olup olmadığı
  gameName: string; // Oyun ismi
}

// Header bileşeni
const Header: React.FC<HeaderProps> = ({ nextPlayer, hasWinner, gameName }) => {
  let winnerText = '';
  if (hasWinner) {
    winnerText = nextPlayer === 'X' ? 'X kazandı!' : 'O kazandı!'; // Kazananı belirle
  }

  return (
    <div className="header">
      {/* Oyun ismi */}
      <h1>{gameName || 'Oyun İsmi Girilmedi'}</h1>
      <div>
        {/* Sıradaki oyuncu */}
        <p>Sıradaki Oyuncu: {nextPlayer}</p>
        {/* Kazanan mesajı */}
        {hasWinner && <p>{winnerText}</p>}
      </div>
    </div>
  );
};

export { Header };
