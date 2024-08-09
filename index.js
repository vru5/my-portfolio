const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// dotenv config
dotenv.config();

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// static files
app.use(express.static(path.join(__dirname, './frontend/build')));

// routes
app.use(`/api/v1/portfolio`, require('./routes/portfolioRoute'));

// to get all the files
app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname, './frontend/build/index.html'));
})

// port
const PORT = process.env.PORT || 8080;

//  listen
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});