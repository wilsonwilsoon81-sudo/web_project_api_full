import { useRef, useContext, useState } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext.js";

export default function EditAvatar({ onUpdateAvatar, onClose }) {
  const currentUser = useContext(CurrentUserContext) || {};
  const avatarRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    if (onUpdateAvatar) {
      onUpdateAvatar({ avatar: avatarRef.current.value })
        .then(() => onClose())
        .catch((err) => console.error("Error al actualizar avatar:", err))
        .finally(() => setIsSubmitting(false));
    }
  }

  return (
    <form className="popup__form" name="avatar-form" onSubmit={handleSubmit} noValidate>
      <label className="popup__label">
        <input
          ref={avatarRef}
          className="popup__input popup__input_type_avatar"
          name="avatar"
          placeholder="Enlace de la imagen"
          required
          type="url"
          defaultValue={currentUser.avatar}
        />
      </label>

      <button 
        type="submit" 
        className="button popup__button"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}
