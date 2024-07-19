## News and Summary API Documentation
### Overview
-- This API provides endpoints to fetch news articles based on a query, date range, and page number, and to summarize a given article using OpenAI's GPT-3.5-turbo model.

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
3) Ensure to add your OpenAPI and NewsAPI keys in a .env file at the root of your repository:

```
.env: 

NEWSAPIKEY=your_newsapi_key
OPENAPIKEY=your_openai_key

```