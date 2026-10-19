import Message from "./Message"
function NoteStatus({ notes }) {
  const allNotes = notes.length;
  const compeltedNotes = notes.filter((n) => n.completed).length;
  const unCompletedNotes = allNotes - compeltedNotes;
  if (!allNotes) return (
    <Message>
      <h2 className="message">No Notes has already been added <span>😄</span></h2>
   </Message>
  )
  return (
    <ul className='note-status'>
      <li>
        all <span>{allNotes}</span>
      </li>
      <li>
        completed <span>{compeltedNotes}</span>
      </li>
      <li>
        Uncompleted <span>{unCompletedNotes}</span>
      </li>
    </ul>
  );
}

export default NoteStatus;
