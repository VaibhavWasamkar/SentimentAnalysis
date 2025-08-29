# Sentiment Analysis App

A React-based web application to analyze and visualize sentiment in text inputs. Users can interact with quizzes, roadmaps, and live sentiment analysis demonstrations.

---

## Features

- **Real-time Sentiment Analysis**: Analyze text inputs for positive, negative, or neutral sentiments.
- **Interactive Quizzes**: Engage users with quizzes for learning and testing.
- **Drag & Drop Components**: Move items interactively within the app.
- **Roadmap Visualization**: Display steps and progression in an intuitive manner.
- **Responsive Design**: Works well across desktops, tablets, and mobile devices.

---

## Project Structure

```bash
sentiment-analysis-app/
├── public/
│ ├── images/
│ └── background.jpg
├── src/
│ ├── components/
│ │ ├── DragDrop.jsx
│ │ ├── Navbar.jsx
│ │ ├── Quiz.jsx
│ │ ├── RoadMap.jsx
│ │ └── SentimentDemo.jsx
│ ├── pages/
│ │ └── Home.jsx
│ ├── utils/
│ │ ├── DirectionContext.jsx
│ │ └── sentiment.js
│ ├── App.jsx
│ ├── index.css
│ └── main.jsx
├── .gitignore
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/username/sentiment-analysis-app.git
cd sentiment-analysis-app
```
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

---

## Usage

- Open http://localhost:5173 in your browser.
- Use the Navbar to navigate between quizzes, sentiment analysis demo, and roadmap.
- Enter text in the Sentiment Analysis component to see live results.
