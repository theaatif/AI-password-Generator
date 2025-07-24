# PassGen: Modern Password Generator Suite

PassGen is a modern, privacy-focused password and passphrase generator app built with React.js, TailwindCSS, and Node.js. It offers multiple password generation methods, security insights, and a clean, responsive UI.

## Features

- Random password generator
- Passphrase (Diceware) generator
- Pattern-based password generator
- Leet-speak mutation
- AI-themed password generator (Gemini API)
- User-defined charset password generator
- Password entropy and crack time estimation (zxcvbn)
- Visual password strength meter
- Copy to clipboard, password visibility toggle
- Responsive, modern UI with routing

## Project Structure

```
PASS GEN/
  ├── public/
  ├── src/
  │   ├── components/
  │   ├── utils/
  │   ├── App.jsx
  │   └── main.jsx
  ├── server.js
  ├── package.json
  ├── README.md
  └── ...
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### 1. Clone the repository

```
git clone <repo-url>
cd PASS\ GEN
```

### 2. Install dependencies

```
npm install
```

### 3. Environment Variables

Create a `.env` file in the root for the backend:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

For the frontend, you can set the backend API URL in a `.env` file:

```
VITE_API_URL=https://your-backend.onrender.com/api/generate-password
```

### 4. Running Locally

#### Start the backend server:

```
node server.js
```

The backend will run on `http://localhost:3001` by default.

#### Start the frontend (Vite):

```
npm run dev
```

The frontend will run on `http://localhost:5173` by default.

## Deployment

### Frontend

- Deploy the frontend (static site) to Netlify or Vercel.
- Set `VITE_API_URL` in your Netlify environment variables to point to your backend.

### Backend

- Deploy the backend (`server.js`) to Render, Railway, or any Node.js host.
- Set the `GEMINI_API_KEY` environment variable in your backend host.
- Ensure CORS is configured to allow requests from your frontend domain.

## Security Notes

- The Gemini API key is never exposed to the frontend. All AI requests are proxied through the backend.
- Do not commit your `.env` file or API keys to version control.

## License

MIT
