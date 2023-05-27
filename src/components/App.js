import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from "./ImagePopup.js";
import api from "../utils/api";
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);


  useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData)
        setCards(cards)
      })
      .catch((err) => {
        console.log(`Произошла ошибка ${err}`)
      })
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api.putLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((err) => {
          console.log(`Произошла ошибка ${err}`)
        });
    } else {
      api.deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((err) => {
          console.log(`Произошла ошибка ${err}`)
        });
    }
  }

  function handleCardDelete(card) {
    api.deleteCardId(card)
      .then(() => {
        setCards((item) => item.filter((c) => c._id !== card._id && c));
      })
      .catch((err) => {
        console.log(`Произошла ошибка ${err}`)
      });
  }

  function handleUpdateUser(profileData) {
    api.sendUserData(profileData)
      .then((card) => {
        setCurrentUser(card);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Произошла ошибка ${err}`)
      })
  }

  function handleUpdateAvatar(avatarLink) {
    api.sendAvatarData(avatarLink)
      .then((avatarUrl) => {
        setCurrentUser(avatarUrl);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Произошла ошибка ${err}`)
      })
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Произошла ошибка ${err}`)
      })
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }


  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Header alt="лого Место" />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}

          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <PopupWithForm
            title="Вы уверены?"
            name="delete"
            submit="Да"
          />

          <ImagePopup
            onClose={closeAllPopups}
            card={selectedCard}
          />

          <Footer
            title="© 2023 Mesto Russia"
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
