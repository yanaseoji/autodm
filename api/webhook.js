const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const VERIFY_TOKEN = "IGQWRQNmVXRmpfdHZANMlVldXpnWFJhVG5ncXk0c0hkU1hhaFhfMm9BNHlpZAzV2em5HcHlwdW1oNGFGbU9ldU1Nc1NSV25XVXRFaVFNVGd3ZAGZAiVXlwU0tXN1RSSV9TSzF3bW1jeWhjbUt0T0Y2V2dpU2tYbHFaOW8ZD";

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

module.exports = app;
