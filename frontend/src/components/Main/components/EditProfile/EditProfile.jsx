import { useState, useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext.js";

export default function EditProfile({ onUpdateUser, onClose }) {
  const currentUser = useContext(CurrentUserContext) || {};
  const [name, setName] = useState(currentUser?.name || "");
  const [description, setDescription] = useState(currentUser?.about || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setNameError(value.length < 2 ? "Debe tener al menos 2 caracteres" : "");
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);
    setDescriptionError(value.length < 2 ? "Debe tener al menos 2 caracteres" : "");
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (nameError || descriptionError || !name || !description) return; // Bloquear si hay error
    
    setIsSubmitting(true);
    if (onUpdateUser) {
      onUpdateUser({ name, about: description })
        .then(() => onClose())
        .catch((err) => console.error("Error al actualizar perfil:", err))
        .finally(() => setIsSubmitting(false));
    }
  }

  return (
    <form className="popup__form" name="profile-form" onSubmit={handleSubmit} noValidate>
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_name"
          name="name"
          placeholder="Nombre"
          required
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__error">{nameError}</span>
      </label>

      <label className="popup__label">
        <input
          className="popup__input popup__input_type_description"
          name="about"
          placeholder="Acerca de mí"
          required
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="popup__error">{descriptionError}</span>
      </label>

      <button 
        type="submit" 
        className={`button popup__button ${!name || !description || nameError || descriptionError ? 'popup__button_disabled' : ''}`}
        disabled={isSubmitting || !name || !description || nameError || descriptionError}
      >
        {isSubmitting ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}
