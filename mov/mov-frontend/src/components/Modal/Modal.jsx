import React from "react";
import "./Modal.css";

function Modal({ isOpen, onClose, children }) {
  // Se não estiver aberto, não renderize nada
  if (!isOpen) {
    return null;
  }

  // Impede que o clique DENTRO do card feche o modal
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    // O overlay (fundo escuro com desfoque)
    // Clicar nele chama a função 'onClose'
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
