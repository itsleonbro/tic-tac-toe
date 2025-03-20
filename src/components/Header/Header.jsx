import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useTheme } from "../../contexts/ThemeContext";
import { useSound } from "../../hooks/useSound";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { isMuted, toggleMute } = useSound();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/" className={styles.logoLink}>
          Tic Tac Toe
        </Link>
      </div>

      <div className={styles.actions}>
        {/* sound toggle button */}
        <button
          className={styles.iconButton}
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute sound" : "Mute sound"}
        >
          {isMuted ? "🔇" : "🔊"}
        </button>

        {/* theme toggle button */}
        <button
          className={styles.iconButton}
          onClick={toggleTheme}
          aria-label={
            theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
          }
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
};

export default Header;
