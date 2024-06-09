document.addEventListener('DOMContentLoaded', () => {
    const quoteContainer = document.getElementById('quote-container');
    const quoteText = document.getElementById('quote');
    const quoteAuthor = document.getElementById('author');
    const newQuoteButton = document.getElementById('new-quote');
    const authorSearch = document.getElementById('author-search');
    const searchResults = document.getElementById('search-results');

    const fetchQuote = async () => {
        const response = await fetch('/api/quote');
        const data = await response.json();
        quoteText.textContent = data.q;
        quoteAuthor.textContent = `- ${data.a}`;
    };

    newQuoteButton.addEventListener('click', fetchQuote);

    authorSearch.addEventListener('input', async (event) => {
        const query = event.target.value;
        if (query.length > 2) {
            const response = await fetch(`/api/quotes/${query}`);
            const data = await response.json();
            searchResults.innerHTML = data.map(quote => `
                <p>${quote.quote} - <strong>${quote.author}</strong></p>
            `).join('');
        } else {
            searchResults.innerHTML = '';
        }
    });

    // Initial quote fetch
    fetchQuote();
});
