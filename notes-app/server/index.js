const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 4000;
const DATA_DIR = path.join(__dirname, 'data');
const NOTES_FILE = path.join(DATA_DIR, 'notes.txt');

app.use(cors());
app.use(express.json());

let nextNoteId = 3;

const users = [
  {
    id: 1,
    name: 'Demo User',
    email: 'demo@notes.com',
    password: '123456',
    token: 'demo-token-123',
  },
];

const notesByUser = {
  1: [
    { id: 1, title: 'Welcome to your notes app' },
    { id: 2, title: 'Tap delete to remove a note' },
  ],
};

function saveNotesToFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  fs.writeFileSync(NOTES_FILE, JSON.stringify(notesByUser, null, 2), 'utf8');
}

function loadNotesFromFile() {
  if (!fs.existsSync(NOTES_FILE)) {
    saveNotesToFile();
    return;
  }

  try {
    const raw = fs.readFileSync(NOTES_FILE, 'utf8');
    if (!raw.trim()) {
      return;
    }

    const parsed = JSON.parse(raw);

    Object.keys(notesByUser).forEach((key) => delete notesByUser[key]);
    Object.entries(parsed).forEach(([userId, notes]) => {
      notesByUser[userId] = Array.isArray(notes) ? notes : [];
    });

    const maxId = Object.values(notesByUser)
      .flat()
      .reduce((max, note) => (note.id > max ? note.id : max), 0);

    nextNoteId = maxId + 1;
  } catch (error) {
    console.error('Could not load notes.txt, using in-memory defaults.');
  }
}

loadNotesFromFile();

function getUserByToken(authHeader) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.replace('Bearer ', '').trim();
  return users.find((user) => user.token === token) || null;
}

app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const existingUser = users.find((u) => u.email.toLowerCase() === String(email).toLowerCase());
  if (existingUser) {
    return res.status(409).json({ message: 'Email already exists.' });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password,
    token: `token-${Date.now()}`,
  };

  users.push(newUser);
  notesByUser[newUser.id] = [];
  saveNotesToFile();

  return res.status(201).json({
    token: newUser.token,
    user: { id: newUser.id, name: newUser.name, email: newUser.email },
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  return res.json({
    token: user.token,
    user: { id: user.id, name: user.name, email: user.email },
  });
});

app.get('/profile', (req, res) => {
  const user = getUserByToken(req.headers.authorization);

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  return res.json({ user: { id: user.id, name: user.name, email: user.email } });
});

app.get('/notes', (req, res) => {
  const user = getUserByToken(req.headers.authorization);

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  return res.json({ notes: notesByUser[user.id] || [] });
});

app.post('/notes', (req, res) => {
  const user = getUserByToken(req.headers.authorization);

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const rawTitle = req.body?.title ?? req.body?.note;
  const title = typeof rawTitle === 'string' ? rawTitle.trim() : '';

  if (!title) {
    return res.status(400).json({ message: 'Title is required.' });
  }

  const note = { id: nextNoteId++, title };

  if (!notesByUser[user.id]) {
    notesByUser[user.id] = [];
  }

  notesByUser[user.id].unshift(note);
  saveNotesToFile();

  return res.status(201).json({ note });
});

app.delete('/notes/:id', (req, res) => {
  const user = getUserByToken(req.headers.authorization);

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const noteId = Number(req.params.id);
  const existingNotes = notesByUser[user.id] || [];

  notesByUser[user.id] = existingNotes.filter((note) => note.id !== noteId);
  saveNotesToFile();

  return res.json({ message: 'Note deleted.' });
});

app.listen(PORT, () => {
  console.log(`Mock server running at http://localhost:${PORT}`);
});
