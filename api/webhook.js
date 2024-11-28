const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const VERIFY_TOKEN = "your_unique_verify_token"; // Update with your verify token

app.use(bodyParser.json());

// Webhook verification
app.get("/api/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === VERIFY_TOKEN) {
    console.log("Webhook Verified!");
    res.status(200).send(challenge);
  } else {
    res.status(403).send("Forbidden");
  }
});

// Webhook event handling
app.post("/api/webhook", (req, res) => {
  const body = req.body;

  console.log("Webhook Event Received:", JSON.stringify(body, null, 2));

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
    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.status(404).send("Not Found");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
