import { useEffect, useRef, useState } from "react";

export function useSound() {
  const [isMuted, setIsMuted] = useState(() => {
    const savedMute = localStorage.getItem("sound-muted");
    return savedMute ? JSON.parse(savedMute) : false;
  });

  const clickSound = useRef(null);
  const winSound = useRef(null);
  const drawSound = useRef(null);

  useEffect(() => {
    clickSound.current = new Audio("/sounds/click.mp3");
    winSound.current = new Audio("/sounds/win.mp3");
    drawSound.current = new Audio("/sounds/draw.mp3");

    // preload sounds
    clickSound.current.load();
    winSound.current.load();
    drawSound.current.load();

    return () => {
      //cleanup audio resources
      clickSound.current = null;
      winSound.current = null;
      drawSound.current = null;
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("sound-muted", JSON.stringify(isMuted));
  }, [isMuted]);

  const toggleMute = () => setIsMuted(prev => !prev);

  const playClick = () => {
    if (!isMuted && clickSound.current) {
      clickSound.current.currentTime = 0;
      clickSound.current
        .play()
        .catch(e => console.error("Error playing sound:", e));
    }
  };

  const playWin = () => {
    if (!isMuted && winSound.current) {
      winSound.current.currentTime = 0;
      winSound.current
        .play()
        .catch(e => console.error("Error playing sound:", e));
    }
  };

  const playDraw = () => {
    if (!isMuted && drawSound.current) {
      drawSound.current.currentTime = 0;
      drawSound.current
        .play()
        .catch(e => console.error("Error playing sound:", e));
    }
  };

  return {
    isMuted,
    toggleMute,
    playClick,
    playWin,
    playDraw,
  };
}
