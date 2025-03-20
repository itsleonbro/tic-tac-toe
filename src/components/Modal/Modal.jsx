import React, { useEffect, useRef } from "react";
import styles from "./Modal.module.css";
import Button from "../Button/Button";

const Modal = ({ isOpen, onClose, children, title }) => {
  const modalRef = useRef(null);

  // close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={modalRef}>
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          <Button
            variant="text"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </Button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
