import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import styles from "./App.module.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import { GameProvider } from "./contexts/GameContext";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Game from "./components/Game/Game";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <GameProvider>
          <div className={styles.app}>
            <Header />
            <main className={styles.main}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game" element={<Game />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </div>
        </GameProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
