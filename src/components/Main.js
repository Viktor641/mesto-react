import React, { useEffect, useState } from "react";
import addButton from '../images/addButton.svg';
import editButton from '../images/EditButton.svg';
import api from '../utils/api.js';
import Card from "./Card.js";

function Main(props) {

  const [userInfo, setUserInfo] = useState({});
  const [cards, setCards] = useState([]);



  useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([userData, card]) => {
        setUserInfo(userData)
        setCards(card)
      })
      .catch((err) => {
        console.log(`Произошла ошибка ${err}`)
      })
  }, [])

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__findings">
          <div className="profile__container">
            <div className="profile__change-image">
              <img src={userInfo.avatar} alt="Жак-Ив Кусто" className="profile__avatar" />
              <button type="button" className="profile__pencil" onClick={props.onEditAvatar} />
            </div>
            <div className="profile__info">
              <div className="profile__edit">
                <h1 className="profile__text">{userInfo.name}</h1>
                <button type="button" className="profile__edit-btn button" onClick={props.onEditProfile}>
                  <img
                    src={editButton}
                    alt="карандаш"
                    className="profile__picture"
                  />
                </button>
              </div>
              <p className="profile__paragraph">{userInfo.about}</p>
            </div>
          </div>
          <button type="button" className="profile__add-btn button" onClick={props.onAddPlace}>
            <img
              src={addButton}
              alt="крестик"
              className="profile__btn-image"
            />
          </button>
        </div>
      </section>
      <section className="cards">
        {cards.map((card, _id) => (
          <Card 
            key={card._id}
            card={card}
            link={card.link}
            name={card.name}
            likes={card.likes.length}
            onCardClick={props.onCardClick}
          />
        ))}
      </section>
    </main>
  )
}

export default Main