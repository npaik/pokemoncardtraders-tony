const express = require("express");
const cors = require("cors");

const { createClient } = require("@libsql/client");
const { drizzle } = require("drizzle-orm/libsql");
const { eq } = require("drizzle-orm");

const { cards } = require("./src/db/schema/cards");
const { userCards } = require("./src/db/schema/usercards");

const app = express();

app.use(cors());
app.use(express.json());

const client = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});
const db = drizzle(client);

app.get("/user/:userId/selected-cards", async (req, res) => {
  const userId = parseInt(req.params.userId);

  try {
    const userCardRecords = await db
      .select()
      .from(userCards)
      .where(eq(userCards.userId, userId))
      .execute();

    const cardIds = userCardRecords.map((record) => record.cardId);
    const selectedCards = await Promise.all(
      cardIds.map((cardId) =>
        db.select().from(cards).where(eq(cards.id, cardId)).execute()
      )
    );

    res.json(selectedCards.flat());
  } catch (error) {
    console.error("Error fetching user's selected cards:", error);
    res.status(500).send("Error fetching user's selected cards");
  }
});

app.post("/user/:userId/cards", async (req, res) => {
  const userId = parseInt(req.params.userId);
  const { cardIds } = req.body;
  try {
    const insertPromises = cardIds.map((cardId) =>
      db.insert(userCards).values({ userId, cardId }).execute()
    );

    const results = await Promise.all(insertPromises);

    res
      .status(200)
      .json({ success: "Cards added to user successfully", results });
  } catch (error) {
    console.error("Error adding cards to user:", error);
    res.status(500).send("Error adding cards to user");
  }
});

app.get("/cards", async (req, res) => {
  try {
    const Allcards = await db.select().from(cards).execute();
    res.json(Allcards);
  } catch (error) {
    console.error("Error fetching cards:", error);
    res.status(500).send("Error fetching cards");
  }
});

app.listen(8050, () => console.log("Server running"));
