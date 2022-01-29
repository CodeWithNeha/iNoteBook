
import React, { useContext,useState, useEffect, useRef } from 'react';
import noteContext from "../context/notes/noteContext"
import AddNote from './AddNote';
import NoteItem from './NoteItem';

export default function Notes() {
    const context = useContext(noteContext);
    const {notes, getNote, editNote} = context
    useEffect(() => {
      getNote()
      // eslint-disable-next-line
    }, []);
    const updateNote = (currentNote)=>{
      ref.current.click();
      setNote({id:currentNote._id, etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
    }
    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""});

    const handleClick = (e)=>{
      console.log("updating note",note);
      editNote(note.id,note.etitle,note.edescription,note.etag);
        refClose.current.click();
    }

    const onChange = (e)=>{
        setNote({
            ...note,[e.target.name]: e.target.value
        })
    }




  return <>
   <AddNote />
 
<button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1"  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form className="my-3">
          <div className="mb-3">
          <label htmlFor="etitle" className="form-label">Title</label>
          <input type="etext" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" minLength={5} required value={note.etitle} onChange={onChange} />
          </div>
          <div className="mb-3">
          <label htmlFor="edescription" className="form-label">description</label>
          <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} minLength={5} required onChange={onChange} />
          </div>
          <div className="mb-3">
          <label htmlFor="etag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
          </div>
          </form>
      </div>
      <div className="modal-footer">
        <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" onClick={handleClick} disabled={note.etitle.length<5||note.edescription.length<5} className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>
  <div className="row my-3">
  <div className = "container mx-2">
    {notes.length===0 &&'No notes to display'}
    </div>
  <h2>Your Notes</h2>
  {notes.map((note)=>{
    return <NoteItem key={note._id} updateNote={updateNote} note={note} />
  })}
  </div>
  </>
}
