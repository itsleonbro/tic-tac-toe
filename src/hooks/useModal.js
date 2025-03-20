import { useState, useCallback, useEffect } from "react";

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = useCallback(content => {
    setModalContent(content);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  }, []);

  // close modal on esc key
  useEffect(() => {
    const handleEscape = event => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [closeModal]);

  return {
    isOpen,
    modalContent,
    openModal,
    closeModal,
  };
}
