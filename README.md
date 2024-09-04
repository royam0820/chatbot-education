# Educational Chatbot

This project is an educational chatbot that provides topic-specific information to users. It uses Next.js for the frontend and backend, and integrates with OpenAI's GPT-3.5 model to generate responses.
Ref! royam/users/chatbot-education-v1

## Features

- Topic selection (History, Geography, Math, Science)
- Topic-specific query handling
- Integration with OpenAI's GPT-3.5 model
- Responsive design

## Project Structure

- `app/components/EducationalChatbot.tsx`: Main component for the chatbot interface
- `app/api/chatgpt/route.ts`: API route for handling chatbot queries
- `pages/api/chatgpt.ts`: (Deprecated) Old API route, to be removed

## Prerequisites

- Node.js (v14 or later)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/educational-chatbot.git
   cd educational-chatbot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   or if you're using yarn:
   ```bash
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your OpenAI API key:
   ```bash
   OPENAI_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   or with yarn:
   ```bash
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Dependencies

- Next.js
- React
- OpenAI API

Make sure to install the latest version of the OpenAI package:

```
npm install openai@latest
```
or
```
yarn add openai@latest
```
