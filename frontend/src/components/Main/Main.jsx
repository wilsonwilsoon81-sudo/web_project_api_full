import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import Card from "./components/Card/Card.jsx";

export default function Main({
  cards,
  onCardLike,
  onCardDelete,
  onEditProfile,
  onAddCard,
  onEditAvatar,
  onCardClick,
}) {
  
  const contextUser = useContext(CurrentUserContext) || {};
  
  const currentUser = {
    name: contextUser.name || contextUser.email || "Usuario",
    about: contextUser.about || "Sin descripción",
    avatar: contextUser.avatar || "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/default-avatar.jpg",
    email: contextUser.email || ""
  };

  return (
    <main className="content">
      <section className="profile page__section">
        <div className="profile__image-container" id="avatar-container">
          <img
            className="profile__image"
            src={currentUser.avatar}
            alt={`Avatar de ${currentUser.name}`}
          />
          <button
            type="button"
            className="profile__edit-avatar"
            aria-label="Editar avatar"
            id="edit-avatar-button"
            onClick={onEditAvatar}
          ></button>
        </div>

        <div className="profile__info">
          <h1 className="profile__title">
            {currentUser.name}
          </h1>
          <button
            aria-label="Editar perfil"
            className="profile__edit-button"
            type="button"
            onClick={onEditProfile}
          ></button>
          <p className="profile__description">
            {currentUser.about}
          </p>
        </div>

        <button
          aria-label="Agregar tarjeta"
          className="profile__add-button"
          type="button"
          onClick={onAddCard}
        ></button>
      </section>

      <section className="cards page__section">
        <ul className="cards__list">
          {Array.isArray(cards) && cards.length > 0 ? (
            cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            ))
          ) : (
            <p style={{ color: '#fff', textAlign: 'center', width: '100%' }}>
              No hay tarjetas disponibles en este momento.
            </p>
          )}
        </ul>
      </section>
    </main>
  );
}
