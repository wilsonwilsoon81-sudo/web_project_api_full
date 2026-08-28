import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import ImagePopup from './ImagePopup/ImagePopup';
import EditProfile from './Main/components/EditProfile/EditProfile';
import NewCard from './Main/components/NewCard/NewCard';
import EditAvatar from './Main/components/EditAvatar/EditAvatar';
import Popup from './Main/components/Popup/Popup';
import Register from './Register/Register';
import Login from './Login/Login';
import InfoTooltip from './InfoTooltip/InfoTooltip';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/api';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(!!localStorage.getItem('jwt'));
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

  const [currentUser, setCurrentUser] = useState({ name: '', avatar: '', email: '' });
  const [cards, setCards] = useState([]);
  
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [isEditAvatarOpen, setIsEditAvatarOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

    useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    
    if (jwt) {
      api.setToken(jwt); 
      
      api.getUserInfo()
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
          return api.getInitialCards();
        })
        .then((cardsData) => {
          setCards(Array.isArray(cardsData) ? cardsData : []);
        })
        .catch((err) => {
          console.error("Error al verificar token:", err);
          localStorage.removeItem('jwt');
          api.setToken(''); 
          setIsLoggedIn(false);
          setCurrentUser({ name: '', avatar: '', email: '' });
          setCards([]);
        })
        .finally(() => {
          setIsLoading(false); 
        });
    } 
}, []);

  const handleRegister = ({ email, password }) => {
    api.register({ email, password })
      .then(() => {
        setIsRegisterSuccess(true);
        setIsInfoTooltipOpen(true);
        navigate('/signin');
      })
      .catch(() => {
        setIsRegisterSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  };

  const handleLogin = ({ email, password }) => {
    api.authorize({ email, password })
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          api.setToken(data.token);
          
          return api.getUserInfo().then((userData) => {
            setCurrentUser(userData);
            setIsLoggedIn(true);
            navigate('/', { replace: true });
          });
        }
      })
      .catch(() => {
        setIsRegisterSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    api.setToken('');
    setIsLoggedIn(false);
    setCurrentUser({ name: '', avatar: '', email: '' });
    setCards([]);
    navigate('/signin', { replace: true });
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(id => id === currentUser._id || id._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((updatedCard) => {
        setCards((prevCards) => prevCards.map((c) => (c._id === card._id ? updatedCard : c)));
      })
      .catch((err) => console.error("Error al dar like:", err));
  };

  const handleCardDelete = (card) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta tarjeta?")) return;

    api.deleteCard(card._id)
      .then(() => {
        setCards((prevCards) => prevCards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.error("Error al eliminar tarjeta:", err));
  };

  const handleUpdateUser = ({ name, about }) => {
    return api.setUserInfo({ name, about })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
      });
  };

  const handleUpdateAvatar = ({ avatar }) => {
    return api.setUserAvatar({ avatar })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
      });
  };

  const handleAddCard = ({ name, link }) => {
    return api.addCard({ name, link })
      .then((newCard) => {
        setCards((prevCards) => [newCard, ...prevCards]);
      });
  };

  const closeAllPopups = () => {
    setIsEditProfileOpen(false);
    setIsAddCardOpen(false);
    setIsEditAvatarOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  };

  if (isLoading) {
    return <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Cargando...</div>;
  }

  return (
    <CurrentUserContext.Provider value={currentUser || { name: '', avatar: '', email: '' }}>
      <Header 
        loggedIn={isLoggedIn} 
        email={currentUser.email}
        onSignOut={handleSignOut}
      />
      
      <Routes>
        <Route path="/signup" element={
          isLoggedIn ? <Navigate to="/" replace /> : <Register onRegister={handleRegister} />
        } />
        <Route path="/signin" element={
          isLoggedIn ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
        } />
        <Route 
          path="/" 
          element={
            <ProtectedRoute 
              loggedIn={isLoggedIn}
              component={Main}
              cards={cards}
              onEditProfile={() => setIsEditProfileOpen(true)}
              onAddCard={() => setIsAddCardOpen(true)}
              onEditAvatar={() => setIsEditAvatarOpen(true)}
              onCardClick={setSelectedCard}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          } 
        />
        
        <Route path="*" element={
          isLoggedIn ? <Navigate to="/" replace /> : <Navigate to="/signin" replace />
        } />
      </Routes>

      {isLoggedIn && isEditProfileOpen && (
        <Popup title="Editar perfil" onClose={closeAllPopups}>
          <EditProfile 
            onUpdateUser={handleUpdateUser} 
            onClose={closeAllPopups}
          />
        </Popup>
      )}

      {isLoggedIn && isEditAvatarOpen && (
        <Popup title="Actualizar avatar" onClose={closeAllPopups}>
          <EditAvatar 
            onUpdateAvatar={handleUpdateAvatar} 
            onClose={closeAllPopups}
          />
        </Popup>
      )}

      {isLoggedIn && isAddCardOpen && (
        <Popup title="Nuevo lugar" onClose={closeAllPopups}>
          <NewCard 
            onAddPlace={handleAddCard} 
            onClose={closeAllPopups}
          />
        </Popup>
      )}

      {isLoggedIn && selectedCard && (
        <ImagePopup 
          card={selectedCard} 
          onClose={closeAllPopups} 
        />
      )}

      <InfoTooltip 
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        isRegisterSuccess={isRegisterSuccess}
      />
      
      {location.pathname === '/' && <Footer />}
    </CurrentUserContext.Provider>
  );
}

export default App;
