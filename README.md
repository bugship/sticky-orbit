# Ideal System

Interactive sticky-notes board built with React, Vite, and Appwrite. Drag notes freely, pick colors, and auto-save changes through Appwrite Databases.

## Features

- Create, edit, and delete notes
- Drag-and-drop positioning
- Color themes
- Debounced auto-save
- Loading and error states for Appwrite connectivity

## Tech Stack

| Layer | Choice |
|-------|--------|
| UI | React 18 + Vite |
| Backend | Appwrite (BaaS) |
| State | React Context |

## Structure

```
ideal-system/
├── public/
├── src/
│   ├── appwrite/       # Client + collection helpers
│   ├── assets/         # Color palette
│   ├── components/     # NoteCard, Controls, buttons
│   ├── context/        # NotesProvider
│   ├── icons/
│   ├── pages/          # NotesPage
│   └── utils.js
├── package.json
└── vite.config.js
```

## Setup

```bash
git clone https://github.com/bugship/ideal-system.git
cd ideal-system
npm install
cp .env.example .env
# fill Appwrite project/database/collection IDs
npm run dev
```

App: `http://localhost:5173`

### Appwrite collection fields

| Field | Type | Content |
|-------|------|---------|
| `body` | string | Note text (JSON string) |
| `colors` | string | JSON color object |
| `position` | string | JSON `{ x, y }` |

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview build |
| `npm run lint` | ESLint |

## License

MIT
