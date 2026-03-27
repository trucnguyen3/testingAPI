const express = require('express');
const app = express();

const PORT = 3000;

const SECRET_TOKEN = "top1valorant.aka";

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Missing Authorization header' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  if (token !== SECRET_TOKEN) {
    return res.status(403).json({ message: 'Invalid token' });
  }

  next();
}

let data = {}

app.get('/api/data', authenticateToken, (req, res) => {
  res.json({
    success: true,
    data: data
  });
});

app.post('/webhook', (req, res) => {
  console.log("Webhook received:");
  console.log(req.body);

  // Example: handle event
  const { event, userId } = req.body;

  if (event === "USER_CREATED") {
    console.log(`New user created: ${userId}`);
  }

  res.status(200).json({ message: "Webhook received" });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});