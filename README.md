# Sticky Orbit

Interactive sticky-notes board built with React, Vite, and Appwrite Databases. Create notes, drag them on a freeform board, pick colors, and auto-save changes to the cloud.

## Features

- Create, edit, and delete notes
- Drag-and-drop positioning on the board
- Color themes (palette in `src/assets/colors.json`)
- Debounced auto-save of note body and position
- Loading spinner and error banner when Appwrite is unreachable
- Appwrite as Backend-as-a-Service (no custom API server required)

## Tech Stack

| Layer | Choice |
|-------|--------|
| UI | React 18 + Vite |
| Backend | Appwrite Databases (BaaS) |
| State | React Context |

## Structure

```
sticky-orbit/
├── public/
├── src/
│   ├── appwrite/       # Client + collection CRUD helpers
│   ├── assets/         # Color palette
│   ├── components/     # NoteCard, Controls, buttons
│   ├── context/        # NotesProvider
│   ├── icons/
│   ├── pages/          # NotesPage
│   └── utils.js        # Drag math, textarea grow, body parse
├── package.json
└── vite.config.js
```

## Setup

```bash
git clone https://github.com/bugship/sticky-orbit.git
cd sticky-orbit
npm install
cp .env.example .env
# fill Appwrite project/database/collection IDs
npm run dev
```

App: `http://localhost:5173`

### Appwrite collection fields

| Field | Type | Content |
|-------|------|---------|
| `body` | string | Note text (JSON-encoded string) |
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
