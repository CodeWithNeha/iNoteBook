import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props)=>{
    const notesInitial = [
        {
          "_id": "61eff7860f92093d16c7731e",
          "user": "61efddef9527408adaa23945",
          "title": "My first Note",
          "description": "Description of first note",
          "tag": "personal",
          "date": "2022-01-25T13:13:42.178Z",
          "__v": 0
        },
        {
          "_id": "61f00eed15af979b3a6cdf3f",
          "user": "61efddef9527408adaa23945",
          "title": "My first Note",
          "description": "Description of first note",
          "tag": "personal",
          "date": "2022-01-25T14:53:33.263Z",
          "__v": 0
        },
        {
          "_id": "61f00eee15af979b3a6cdf43",
          "user": "61efddef9527408adaa23945",
          "title": "My first Note",
          "description": "Description of first note",
          "tag": "personal",
          "date": "2022-01-25T14:53:34.746Z",
          "__v": 0
        },
    
      ]
      const [notes, setNotes] = useState(notesInitial);

      // Add Note
        const addNote=(title, description, tag)=>{
          console.log("Adding a note")
          const note = 
            {
              "_id": "61f00eef15af979b3a6cdf45",
              "user": "61efddef9527408adaa23945",
              "title": title,
              "description": description,
              "tag": tag,
              "date": "2022-01-25T14:53:35.592Z",
              "__v": 0
            }
          setNotes(notes.concat(note));
        }
      // Delete a Node
        const deleteNote = ()=>{

        }
      // Edit a Note
        const editNote = ()=>{

        }
    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;