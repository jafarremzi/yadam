


function NoteHeader({ notes,sortBy,setSortBy }) {
  return (
    <div className='note-header'>
      <h1>My Notes({notes.length})</h1>
      <select value={sortBy} onChange={setSortBy}>
        <option value='latest'>Sort based on latest notes </option>
        <option value='earlist'>Sort based on earlist notes</option>
        <option value='completed'>Sort based on completed notes</option>
      </select>
    </div>
  );
}

export default NoteHeader