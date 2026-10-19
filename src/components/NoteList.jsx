import { useEffect, useRef, useState } from "react";

function NoteList({ notes, onDelete, onToggle, sortBy }) {
  let sortedNotes = notes;
  if (sortBy === "earlist")
    sortedNotes = [...notes].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    );
  if (sortBy === "latest")
    sortedNotes = [...notes].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
  if (sortBy === "completed")
    sortedNotes = [...notes].sort(
      (a, b) => Number(a.completed) - Number(b.completed),
    );

  return (
    <div className='note-list'>
      {sortedNotes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default NoteList;

function NoteItem({ note, onDelete, onToggle }) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const [isDeleting, setIsDeleting] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleDelete = () => {
    setIsDeleting(true); // start the exit animation
    timer.current = setTimeout(() => onDelete(note.id), 300);
  };

  return (
    <div
      className={`note-item ${note.completed ? "completed" : ""} ${isDeleting ? "deleting" : ""}`}
    >
      <div className='note-item__header'>
        <div>
          <p className='title'>{note.title}</p>
          <p className='desc'>{note.description}</p>
        </div>
        <div className='actions'>
          <button
            className='delete-btn'
            onClick={handleDelete}
            aria-label={`Delete note ${note.title}`}
          >
            ❌
          </button>
          <input
            type='checkbox'
            id={`note-${note.id}`}
            aria-label={`Mark ${note.title} as completed`}
            onChange={() => onToggle(note.id)}
            checked={Boolean(note.completed)}
          />
        </div>
      </div>
      <div className='note-item__footer'>
        {new Date(note.createdAt).toLocaleDateString("en-US", options)}
      </div>
    </div>
  );
}
