export default function ImagePopup({ card, onClose }) {
  if (!card) {
    return null;
  }

  return (
    <div className="popup popup_is-opened">
      <div className="popup__content popup__content_content_image">
        <button 
          type="button" 
          className="popup__close" 
          onClick={onClose}
          aria-label="Cerrar"
        />
        <img className="popup__image" src={card.link} alt={card.name} />
        <p className="popup__caption">{card.name}</p>
      </div>
    </div>
  );
}
