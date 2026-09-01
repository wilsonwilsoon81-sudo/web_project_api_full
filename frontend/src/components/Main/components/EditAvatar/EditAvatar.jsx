import { useContext, useState } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext.js";

export default function EditAvatar({ onUpdateAvatar, onClose }) {
  const currentUser = useContext(CurrentUserContext) || {};
  const [avatar, setAvatar] = useState(currentUser?.avatar || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [avatarError, setAvatarError] = useState("");

  const handleAvatarChange = (e) => {
    const value = e.target.value;
    setAvatar(value);
    setAvatarError(value.length < 2 ? "El enlace debe tener al menos 2 caracteres" : "");
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (avatarError || !avatar) return; // Bloquear si hay error
    
    setIsSubmitting(true);
    if (onUpdateAvatar) {
      onUpdateAvatar({ avatar })
        .then(() => onClose())
        .catch((err) => console.error("Error al actualizar avatar:", err))
        .finally(() => setIsSubmitting(false));
    }
  }

  return (
    <form className="popup__form" name="avatar-form" onSubmit={handleSubmit} noValidate>
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_avatar"
          name="avatar"
          placeholder="Enlace de la imagen"
          required
          type="url"
          value={avatar}
          onChange={handleAvatarChange}
        />
        <span className="popup__error">{avatarError}</span>
      </label>

      <button 
        type="submit" 
        className={`button popup__button ${!avatar || avatarError ? 'popup__button_disabled' : ''}`}
        disabled={isSubmitting || !avatar || avatarError}
      >
        {isSubmitting ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}
