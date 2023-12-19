import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [userSelectedCards, setUserSelectedCards] = useState([]);
  const userId = 1;

  useEffect(() => {
    // Fetch all cards
    fetch("http://localhost:8050/cards")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCards(data);
      })
      .catch((error) => console.error("Error fetching data:", error));

    // Fetch user's selected cards
    fetch(`http://localhost:8050/user/${userId}/selected-cards`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserSelectedCards(data);
      })
      .catch((error) =>
        console.error("Error fetching user's selected cards:", error)
      );
  }, []);

  const handleCardBackClick = () => {
    console.log("Backside of card clicked");
    const shuffled = cards.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);
    setSelectedCards(selected);

    const cardIds = selected.map((card) => card.id);
    fetch(`http://localhost:8050/user/${userId}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cardIds }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUserSelectedCards((previousSelected) => [
          ...selected,
          ...previousSelected,
        ]);
      })
      .catch((error) => console.error("Error updating user cards:", error));
  };

  return (
    <>
      <h1>Pokemon Cards</h1>
      <div className="card-back-container">
        <img
          src="/pokemoncardback.jpg"
          alt="Backside of Pokemon card"
          onClick={handleCardBackClick}
        />
      </div>
      <div className="selected-cards-container">
        {selectedCards.map((card) => (
          <div key={card.id} className="selected-card">
            <h3>{card.cardname}</h3>
            <img src={card.cardurl} alt={`Pokemon card ${card.cardname}`} />
          </div>
        ))}
      </div>
      <h2>My Selected Cards</h2>
      <div className="user-selected-cards-container">
        {userSelectedCards.map((card) => (
          <div key={card.id} className="card">
            <h3>{card.cardname}</h3>
            <img src={card.cardurl} alt={`Pokemon card ${card.cardname}`} />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
