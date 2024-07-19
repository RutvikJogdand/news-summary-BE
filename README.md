## News and Summary API Documentation
### Overview
- This API provides endpoints to fetch news articles based on a query, date range, and page number, and to summarize a given article using OpenAI's GPT-3.5-turbo model.

### Prerequisites:
1) Node.js installed on your machine
2) npm (Node Package Manager)
3) OpenAI API key
4) NewsAPI key (https://newsapi.org/)

### Installation:
1) Clone the repository:
``` 
git clone <repository-url>
cd <repository-folder> 

```
2) Install all dependencies:
```
npm install

```
3) Ensure to add your OpenAI API and NewsAPI keys in a .env file at the root of your repository:

```
.env: 

NEWSAPIKEY=your_newsapi_key
OPENAPIKEY=your_openai_key

```
### Running the server:

```
node server.js

```
On successful start, the server will display a message: Server is running on http://localhost:5000

### Endpoints:
1. Get News Articles
<small>Endpoint:</small>

```
GET /news
```
#### Query Parameters
- query (optional): The search query for news articles.
- from (optional): The start date for the news articles in YYYY-MM-DD format.
- to (optional): The end date for the news articles in YYYY-MM-DD format.
- page (optional): The page number of the results.
- pageSize: Number of results per page. Default set to 5.

### Example request:
```
GET /news?query=technology&from=2023-07-01&to=2023-07-15&page=1
```

### Example response:
```
{
  "status": "ok",
  "totalResults": 100,
  "articles": [
    {
      "source": {
        "id": "techcrunch",
        "name": "TechCrunch"
      },
      "author": "Author Name",
      "title": "Article Title",
      "description": "Article Description",
      "url": "https://example.com",
      "urlToImage": "https://example.com/image.jpg",
      "publishedAt": "2023-07-15T12:34:56Z",
      "content": "Article content..."
    },
    ...
  ]
}

```

2. Summarize the news article with OpenAI API
<small>Endpoint:</small>

```
POST /summarize
```
#### Query Parameters:
- article (required): An object containing the content of the article to be summarized.

### Example request:

```
{
  "article": {
    "content": "The year 2024 has been remarkable for technological innovations. From advancements in artificial intelligence to breakthroughs in quantum computing..."
  }
}
```

### Example response:

```
{
  "summary": "The year 2024 has seen significant technological advancements in AI and quantum computing..."
}
```

### Error Handling:
- <strong>500 Internal Server Error </strong>: If there is an issue with fetching news articles or summarizing the article, the server will respond with a 500 status code.

### Rate limiting:
- The API uses rate limiting to restrict each IP to 100 requests per 15 minutes.

### Notes:
- Ensure you replace your_newsapi_key and your_openai_key in the .env file with your actual API keys.
- The news articles endpoint fetches a maximum of 5 articles per request by default.
- The summary endpoint uses OpenAI's GPT-3.5-turbo model to generate summaries.
