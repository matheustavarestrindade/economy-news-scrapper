# Project Overview:
The Economy News Scrapper is a Node.js-based application that scrapes news articles from major news websites, summarizes the articles using ChatGPT, and extracts the most important topics. This project provides a seamless way to stay updated with the latest economic news by automating the process of gathering and summarizing articles from various sources.

# Scripts:
The project includes various npm scripts in the package.json file to streamline development and execution:

- `build`: Compiles TypeScript files into JavaScript.
- `start`: Starts the application using Node.js with environment variables loaded from a `.env` file.
- `dev-panel`: Launches the development server with nodemon for live-reloading and debugging features.
- `dev`: Similar to `dev-panel` but with specific environment configurations.

# Environment Variables:
The project relies on environment variables for configuration, which can be set in a `.env` file, like the provided `.env.example`. Key environment variables include:

- `MONGO_DATABASE_NAME`: The name of the MongoDB database.
- `MONGO_DATABASE_URL`: The URL for connecting to the MongoDB instance.
- `EXPRESS_SERVER_PORT`: The port on which the Express server runs.
- `OPENAI_API_KEY`: The API key for OpenAI integration.
- `JWT_SECRET`: The secret key for JSON Web Token (JWT) generation.

# Usage:
To use this project, follow these steps:

1. Clone the repository to your local machine.
2. Create a `.env` file based on the `.env.example` and set the required environment variables.
3. Run `npm install` to install the project's dependencies.
4. Build the project using `npm run build`.
5. Start the application with `npm start` or in development mode using `npm run dev` or `npm run dev-panel`.

This project provides an efficient way to automate the retrieval, summarization, and analysis of economic news from various sources, making it a valuable tool for staying informed about the latest economic developments.
