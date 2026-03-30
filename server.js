const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const PORT = 4540;

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

let webhookStore = [];

app.get('/api/data', authenticateToken, (req, res) => {
  res.json({
    success: true,
    data: data
  });
});

app.post('/webhook', (req, res) => {
  console.log("Webhook received:", req.body);

  webhookStore.push({
    data: req.body,
    time: Date.now()
  });

  res.sendStatus(200);
});

app.get("/webhook-data", (req, res) => {
  res.json(webhookStore.data);
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});