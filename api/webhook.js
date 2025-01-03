const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const VERIFY_TOKEN = "your_unique_verify_token"; // Replace with your actual token

app.use(bodyParser.json());

// Webhook Verification (GET)
app.get("/api/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.status(403).send("Forbidden");
  }
});

// Webhook Event Handling (POST)
app.post("/api/webhook", (req, res) => {
  console.log("Webhook event received:", req.body);
  res.status(200).send("EVENT_RECEIVED");
});

// Define the port and start the server
const PORT = process.env.PORT || 3001; // Change the port here if required
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
