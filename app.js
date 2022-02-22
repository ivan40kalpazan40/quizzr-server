const express = require('express');
const app = express();
const routes = require('./routes');
const connectDB = require('./config/db.config');
const PORT = process.env.PORT || 3030;

// Connect DB
connectDB();

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(routes);
app.listen(
  PORT,
  console.log.bind(console, `PORT RUNNING ON PORT ${PORT} ....`)
);
