import { useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext.js";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext) || {};

  // 1. Verificar si el usuario actual es el dueño de la tarjeta (para mostrar el botón de borrar)
  const isOwn = card.owner === currentUser._id || card.owner?._id === currentUser._id;
  const cardDeleteButtonClassName = `card__delete-button ${
    isOwn ? "card__delete-button_visible" : ""
  }`;

  // 2. Verificar si el usuario actual ya dio like a la tarjeta
  const isLiked = card.likes.some(
    (id) => id === currentUser._id || id._id === currentUser._id
  );
  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_is-active" : ""
  }`;

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleImageClick() {
    // ✅ Aquí avisamos a App.jsx que abra el popup con esta tarjeta
    onCardClick(card);
  }

  return (
    <li className="card">
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleImageClick}
      />
      
      <button
        className={cardDeleteButtonClassName}
        type="button"
        aria-label="Eliminar tarjeta"
        onClick={handleDeleteClick}
      />
      
      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>
        <button
          className={cardLikeButtonClassName}
          type="button"
          aria-label="Me gusta"
          onClick={handleLikeClick}
        />
      </div>
    </li>
  );
}
