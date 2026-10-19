import { useEffect, useReducer, useState } from "react";
import "./App.css";
import AddNewNotes from "./components/AddNewNotes";
import NoteList from "./components/NoteList";
import NoteStatus from "./components/NoteStatus";
import NoteHeader from "./components/NoteHeader";

const STORAGE_KEY = "note-app:notes:v1";

// Notes must survive app restarts, so they are kept in localStorage
// (persisted inside the Android WebView). Corrupted data falls back to [].
function loadNotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function noteReducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "delete":
      return state.filter((n) => n.id !== action.payload);
    case "toggle":
      return state.map((n) =>
        n.id === action.payload ? { ...n, completed: !n.completed } : n,
      );
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function App() {
  const [notes, dispatch] = useReducer(noteReducer, undefined, loadNotes);
  const [sortBy, setSortBy] = useState("latest");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch {
      // storage full or unavailable: keep working in memory
    }
  }, [notes]);

  const handleAddNote = (newNote) => dispatch({ type: "add", payload: newNote });
  const handleToggle = (id) => dispatch({ type: "toggle", payload: id });
  const handleDelete = (id) => dispatch({ type: "delete", payload: id });

  return (
    <div className='container'>
      <NoteHeader
        notes={notes}
        sortBy={sortBy}
        setSortBy={(e) => setSortBy(e.target.value)}
      />
      <div className='note-app'>
        <div className='add-new-note'>
          <AddNewNotes onAddNote={handleAddNote} />
        </div>
        <div className='note-container'>
          <NoteStatus notes={notes} />
          <NoteList
            sortBy={sortBy}
            notes={notes}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
