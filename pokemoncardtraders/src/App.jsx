import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8050/cards")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCards(data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  return (
    <>
      <h1>Pokemon Cards</h1>
      <div className="cards-container">
        {cards.map((card) => (
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
