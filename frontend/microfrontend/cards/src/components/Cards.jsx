import React, { useContext, useEffect } from "react";
// import { CurrentUserContext } from "sharedLib/CurrentUserContext";
import ImagePopup from "./ImagePopup";
import api from "./utils/api";
import "./index.css";
import Card from "./Card";

  // временное решение, чтобы модуль не падал без подключенного контекста
  let CurrentUserContext;
  try {
    CurrentUserContext =
      require("sharedLib/CurrentUserContext").CurrentUserContext;
  } catch (e) {
    debugger
    console.warn("CurrentUserContext не найден, будет использован fallback.");
    CurrentUserContext = React.createContext({
      currentUser: null,
      cards: [],
      setCards: () => {},
    });
  }

export default function Cards() {

  if (CurrentUserContext === undefined) {
    CurrentUserContext = React.createContext({
      currentUser: null,
      cards: [],
      setCards: () => {},
    });
  }
  
  const [selectedCard, setSelectedCard] = React.useState(null);
  const { currentUser, cards, setCards } = useContext(CurrentUserContext);

  useEffect(() => {
    api
      .getCardList()
      .then((res) => {
        const areEqual = JSON.stringify(res) === JSON.stringify(cards);
        if (!areEqual) {
          setCards(res);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  function closeAllPopups() {
    setSelectedCard(null);
  }

  function handleCardLike(card) {
    const isLiked = card?.likes?.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card?._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .removeCard(card?._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleCardClick(card) {
    console.log("popup card click");
    setSelectedCard(card);
  }

  return (
    <>
      <section className="places page__section">
        <ul className="places__list">
          {cards.map((card) => (
            <Card
              key={card?._id}
              card={card}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          ))}
        </ul>
      </section>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </>
  );
}
