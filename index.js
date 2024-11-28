const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Verify Token (जो Meta App Dashboard में आपने सेट किया है)
const VERIFY_TOKEN = "my_unique_verify_token_2024";

// Middleware
app.use(bodyParser.json());

// GET Route: Verify Webhook
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === VERIFY_TOKEN) {
    // Token match हुआ तो Meta को challenge वापस करें
    console.log("Webhook Verified!");
    res.status(200).send(challenge);
  } else {
    // Token mismatch
    res.status(403).send("Forbidden");
  }
});

// POST Route: Handle Webhook Events
app.post("/webhook", (req, res) => {
  const body = req.body;

  console.log("Webhook Event Received:", JSON.stringify(body, null, 2));

  // Event Handle करें
  if (body.object === "instagram") {
    body.entry.forEach((entry) => {
      const changes = entry.changes;
      changes.forEach((change) => {
        if (change.field === "comments") {
          const commentDetails = change.value;
          console.log("New Comment:", commentDetails.message);
        }
      });
    });

    // Success response
    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.status(404).send("Not Found");
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Webhook server is running on port ${PORT}`);
});
