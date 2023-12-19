const express = require("express");
const cors = require("cors");

const { createClient } = require("@libsql/client");
const { drizzle } = require("drizzle-orm/libsql");
const { eq } = require("drizzle-orm");

const { cards } = require("./src/db/schema/cards");

const app = express();

app.use(cors());

const client = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});
const db = drizzle(client);

app.get("/cards", async (req, res) => {
  try {
    const Pikachu = await db
      .select()
      .from(cards)
      .where(eq(cards.cardname, "Pikachu"))
      .execute();
    res.json(Pikachu);
  } catch (error) {
    console.error("Error fetching cards:", error);
    res.status(500).send("Error fetching cards");
  }
});

app.listen(8050, () => console.log("Server running"));
