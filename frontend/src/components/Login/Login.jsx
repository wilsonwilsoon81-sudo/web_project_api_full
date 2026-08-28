import React from 'react';
import { Link } from 'react-router-dom';

function Login({ onLogin }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({ email, password });
  }

  return (
    <main className="login">
      <h2 className="login__title">Inicia sesión</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="login__input"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="login__input"
          required
        />
        <button type="submit" className="login__button">
          Inicia sesión
        </button>
      </form>
      <p className="login__text">
        ¿Aún no eres miembro?{' '}
        <Link to="/signup" className="login__link">
          Registrarse aquí
        </Link>
      </p>
    </main>
  );
}

export default Login;
