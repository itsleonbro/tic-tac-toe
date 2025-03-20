import { useState } from "react";

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = content => {
    setModalContent(content);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  return {
    isOpen,
    modalContent,
    openModal,
    closeModal,
  };
}
