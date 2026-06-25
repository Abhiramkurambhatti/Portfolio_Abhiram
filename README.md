# Portfolio — Full-Stack Personal Portfolio

A modern, responsive portfolio website built with **React** (Vite) on the frontend and **FastAPI** on the backend.

## Features

- Hero landing with animated intro
- About Me section with stats
- Skills & Tech Stack with animated progress bars
- Projects showcase with hover overlays
- Work Experience timeline
- Blog section with article cards
- Contact form connected to the backend API
- Fully responsive & dark-themed UI
- Smooth scroll-triggered animations (Framer Motion)

## Tech Stack

| Layer    | Technology                     |
| -------- | ------------------------------ |
| Frontend | React 18, Vite, Framer Motion |
| Backend  | Python, FastAPI, Pydantic      |
| Styling  | CSS Modules, CSS Variables     |

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **Python** >= 3.10

### Backend

```bash
cd Portfolio/backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

The API runs at `http://localhost:8000`. Docs at `http://localhost:8000/docs`.

### Contact form email (optional)

The "Get In Touch" form emails submissions to your inbox via SMTP.

1. Copy the example env file and fill it in:

```bash
cd Portfolio/backend
cp .env.example .env
```

2. Create a **Gmail App Password** (requires 2-Step Verification enabled):
   - Go to https://myaccount.google.com/apppasswords
   - Generate a password for "Mail" and paste the 16-character value into `SMTP_PASSWORD` in `.env`.

3. Restart the backend. Submissions now arrive at `CONTACT_RECIPIENT`.

> If `SMTP_USER` / `SMTP_PASSWORD` are not set, the form still works but returns an error status instead of sending email. The `.env` file is git-ignored.

### Frontend

```bash
cd Portfolio/frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173`. API calls are proxied to the backend automatically.

## Project Structure

```
Portfolio/
├── backend/
│   ├── main.py              # FastAPI app with all endpoints
│   └── requirements.txt
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css         # Global styles & CSS variables
│       └── components/
│           ├── Navbar.jsx / .module.css
│           ├── Hero.jsx / .module.css
│           ├── About.jsx / .module.css
│           ├── Skills.jsx / .module.css
│           ├── Projects.jsx / .module.css
│           ├── Experience.jsx / .module.css
│           ├── Blog.jsx / .module.css
│           ├── Contact.jsx / .module.css
│           └── Footer.jsx / .module.css
└── README.md
```

## Customization

Replace the placeholder data in `backend/main.py` with your own:

- **Projects** — update the `PROJECTS` list
- **Experience** — update the `EXPERIENCES` list
- **Blog posts** — update the `BLOG_POSTS` list
- **Skills** — update the skills dict in the `/api/skills` endpoint
- **Personal info** — search for "John Doe" across the frontend components and replace with your name, links, and bio
