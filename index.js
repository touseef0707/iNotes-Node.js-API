// Imports
const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
// database connection
connectToMongo();
// App Config
const app = express();
app.use(cors());
const port = 5000;

// Middleware
app.use(express.json());

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});