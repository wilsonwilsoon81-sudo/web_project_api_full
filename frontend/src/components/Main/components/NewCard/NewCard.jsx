import { useState } from "react";

export default function NewCard({ onAddPlace, onClose }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    if (onAddPlace) {
      onAddPlace({ name, link })
        .then(() => onClose())
        .catch((err) => console.error("Error al crear tarjeta:", err))
        .finally(() => setIsSubmitting(false));
    }
  }

  return (
    <form className="popup__form" name="new-place-form" onSubmit={handleSubmit} noValidate>
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_name"
          name="name"
          placeholder="Nombre del lugar"
          required
          minLength="2"
          maxLength="30"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label className="popup__label">
        <input
          className="popup__input popup__input_type_url"
          name="link"
          placeholder="Enlace a la imagen"
          required
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </label>

      <button 
        type="submit" 
        className={`button popup__button ${!name || !link ? 'popup__button_disabled' : ''}`}
        disabled={isSubmitting || !name || !link}
      >
        {isSubmitting ? "Creando..." : "Crear"}
      </button>
    </form>
  );
}
