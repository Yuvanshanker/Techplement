const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/quotes', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Quote Schema and Model
const quoteSchema = new mongoose.Schema({
    author: String,
    quote: String,
});

const Quote = mongoose.model('Quote', quoteSchema);

// Get Random Quote
app.get('/api/quote', async (req, res) => {
    try {
        const response = await axios.get('https://zenquotes.io/api/random');
        res.json(response.data[0]);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// Search Quotes by Author
app.get('/api/quotes/:author', async (req, res) => {
    try {
        const quotes = await Quote.find({ author: new RegExp(req.params.author, 'i') });
        res.json(quotes);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

app.listen(PORT, () => console.log(Server running on port ${PORT}));
app.use(express.static('public'));
