const express = require('express');
const axios = require('axios');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const OpenAI = require('openai');
const app = express();
const port = 5000;

const NEWS_API_KEY = process.env.NEWSAPIKEY;
const OPENAI_API_KEY = process.env.OPENAPIKEY;

app.use(cors());
app.use(express.json());

// Rate limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // Limit each to 100 requests per windowMs
});

app.use(limiter);

app.get('/news', async (req, res) => {
    const { query, from, to, page } = req.query;

    const params = {
        apiKey: NEWS_API_KEY,
        pageSize: 5,
        page: page
    };

    if (query) {
        params.q = query;
    }

    if (from) {
        params.from = from;
    }

    if (to) {
        params.to = to;
    }

    try {
        const newsResponse = await axios.get('https://newsapi.org/v2/everything', { params });
        res.json(newsResponse.data);
    } catch (error) {
        console.error('Error fetching news articles:', error);
        res.status(500).send('Error fetching news articles');
    }
});

app.post('/summarize', async (req, res) => {
    const { article } = req.body;

    if (!article || !article.content) {
        return res.status(400).send('Invalid article content');
    }

    try {
        const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
        
        const openAIResponse = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'Summarize the following article in English:' },
                { role: 'user', content: article.content }
            ],
            max_tokens: 100,
        });

        const summary = openAIResponse.choices[0].message.content.trim();
        res.json({ summary });
    } catch (error) {
        console.error('Error summarizing article:', error.response ? error.response.data : error.message);
        res.status(500).send('Error summarizing article');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
