import React, { useState } from 'react';
import { Header } from './components/header'; 
import { Board } from './components/board'; 
import { TextField, Box, Button } from '@mui/material'; 
import './App.css';

const App: React.FC = () => {
  // Oyun bileşeni için kullanılacak stateler
  const [nextPlayer, setNextPlayer] = useState<'X' | 'O'>('X'); // Sıradaki oyuncuyu tutacak state
  const [hasWinner, setHasWinner] = useState<boolean>(false); // Kazananın olup olmadığını tutacak state
  const [gameName, setGameName] = useState<string>(''); // Oyunun ismini tutacak state
  const [key, setKey] = useState<number>(0); // Oyunu yeniden başlatmak için kullanılacak anahtarı tutacak state

  // Oyun isminin değiştiğinde çağrılacak fonksiyon
  const handleGameNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGameName(event.target.value);
  };

  // Oyuncu değiştirme işlevi
  const changePlayer = () => {
    setNextPlayer(nextPlayer === 'X' ? 'O' : 'X');
  };

  // Oyunu yeniden başlatma işlevi
  const handleRestartGame = () => {
    // Oyunu sıfırlama
    setNextPlayer('X');
    setHasWinner(false);
    setKey(prevKey => prevKey + 1); // Board bileşenini yeniden yüklemek için anahtarı güncelliyoruz
  };

  return (
    <div className="App">
      {/* Oyun ismini girebileceğimiz bir giriş alanı */}
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="Oyun İsmini Girin"
          variant="outlined"
          value={gameName}
          onChange={handleGameNameChange}
        />
      </Box>
      {/* Header bileşeni, sıradaki oyuncu ve kazananı gösterir */}
      <Header nextPlayer={nextPlayer} hasWinner={hasWinner} gameName={gameName} />
      {/* Board bileşeni, oyun tahtasını ve oyun mantığını yönetir */}
      <Board
        key={key} // Board bileşenini yeniden yüklemek için anahtar
        nextPlayer={nextPlayer}
        setNextPlayer={setNextPlayer}
        setHasWinner={setHasWinner}
        changePlayer={changePlayer}
      />
      {/* Oyunu yeniden başlatma düğmesi */}
      <Box sx={{ marginTop: 2 }}>
        <Button variant="contained" color="primary" onClick={handleRestartGame}>
          Oyunu Yeniden Başlat
        </Button>
      </Box>
    </div>
  );
};

export default App;
