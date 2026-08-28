import { useEffect, useRef } from 'react';
import closeIcon from '../../images/close.svg';
import successIcon from '../../images/success-icon.svg';
import errorIcon from '../../images/error-icon.svg';

function InfoTooltip({ isOpen, onClose, isRegisterSuccess }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="tooltip-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div className="tooltip-box">
        <button 
          type="button" 
          className="tooltip-close-btn"
          onClick={onClose}
          aria-label="Cerrar"
        >
          <img src={closeIcon} alt="Cerrar" />
        </button>
        
        {isRegisterSuccess ? (
          <>
            <img src={successIcon} alt="Éxito" className="tooltip-icon" />
            <h3 className="tooltip-title">
              ¡Correcto! Ya estás registrado
            </h3>
          </>
        ) : (
          <>
            <img src={errorIcon} alt="Error" className="tooltip-icon" />
            <h3 className="tooltip-title">
              Uy, ¡Algo salió mal! Por favor, inténtalo de nuevo.
            </h3>
          </>
        )}
      </div>
    </div>
  );
}

export default InfoTooltip;
