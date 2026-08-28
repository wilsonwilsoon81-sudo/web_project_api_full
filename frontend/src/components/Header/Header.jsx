import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import '../../blocks/header.css';

function Header({ loggedIn, email, onSignOut }) {
  const location = useLocation();

  if (location.pathname === '/signup') {
    return (
      <header className="header">
        <img src={logo} alt="Logo Around" className="header__logo" />
        <Link to="/signin" className="header__link">
          Iniciar sesión
        </Link>
      </header>
    );
  }

  if (location.pathname === '/signin') {
    return (
      <header className="header">
        <img src={logo} alt="Logo Around" className="header__logo" />
        <Link to="/signup" className="header__link">
          Regístrate
        </Link>
      </header>
    );
  }

  if (loggedIn) {
    return (
      <header className="header">
        <img src={logo} alt="Logo Around" className="header__logo" />
        <div className="header__user">
          <p className="header__email">{email}</p>
          <button 
            type="button" 
            className="header__logout"
            onClick={onSignOut}
          >
            Cerrar sesión
          </button>
        </div>
      </header>
    );
  }

  return null;
}

export default Header;
