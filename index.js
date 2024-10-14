const express = require("express");
const cors = require('cors');
require("dotenv").config();

const {dbConnection} = require('./database/config');

const app = express();

dbConnection();

app.use(cors());
const defaultPort = process.env.PORT || 8000;

app.use(express.static("public"));
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

app.listen(defaultPort, () => {
    console.log(`Server started on port http://localhost:${defaultPort}`);
});