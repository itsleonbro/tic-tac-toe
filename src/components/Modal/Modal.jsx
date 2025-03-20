import React from "react";
import styles from "./Modal.module.css";

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;
  
  // direct handler for close button
  const handleClose = () => {
    onClose();
  };
  
  // prevent clicks inside modal from closing it
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div 
      className={styles.overlay} 
      onClick={handleClose} // close when clicking overlay
    >
      <div 
        className={styles.modal} 
        onClick={handleModalClick} // prevent propagation
      >
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          <button
            type="button"
            className={styles.closeButton}
            onClick={handleClose}
          >
            ✕
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;