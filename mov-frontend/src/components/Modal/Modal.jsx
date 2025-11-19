import React from "react";
import "./Modal.css";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) {
    return null;
  }

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* O card branco do modal */}
      <div className="modal-content" onClick={handleContentClick}>
        {/* O botão 'X' de fechar */}
        <button className="modal-close-button" onClick={onClose}>
          &times; {/* Isso é um 'X' em HTML */}
        </button>

        {/* O conteúdo (nosso mapa) será renderizado aqui */}
        {children}
      </div>
    </div>
  );
}

export default Modal;
