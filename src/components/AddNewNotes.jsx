import { useState } from "react";

function AddNewNotes({ onAddNote }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanTitle = title.trim();
    const cleanDescription = description.trim();
    if (!cleanTitle || !cleanDescription) return;
    onAddNote({
      title: cleanTitle,
      description: cleanDescription,
      id: Date.now(),
      completed: false,
      createdAt: new Date().toISOString(),
    });
    setTitle("");
    setDescription("");
  };

  return (
    <div className='add-new-note'>
      <h2>Add Note</h2>
      <form className='note-form' onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type='text'
          name='title'
          aria-label='Note title'
          className='text-field'
          placeholder='note title...'
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type='text'
          name='description'
          aria-label='Note description'
          className='text-field'
          placeholder='note description...'
        />
        <button type='submit' className='btn btn--primary'>
          Add Note
        </button>
      </form>
    </div>
  );
}

export default AddNewNotes;
