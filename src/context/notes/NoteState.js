import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props)=>{
  const host = "http://localhost:4000"
    const notesInitial = []
      const [notes, setNotes] = useState(notesInitial);
       // Get All Note
       const getNote= async()=>{
        // API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET', 
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlZmRkZWY5NTI3NDA4YWRhYTIzOTQ1In0sImlhdCI6MTY0MzExMzA0Nn0.GaIKnoif5sjcuDxgrZ2acE17unYpBp_kTpDG45qgtPY"
          }
        });
        const json = await response.json()
        console.log(json);
        setNotes(json);
      }
      
   // Add Note
        const addNote= async(title, description, tag)=>{
            // API Call
            const response = await fetch(`${host}/api/notes/addnote`, {
              method: 'PUT', 
              headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlZmRkZWY5NTI3NDA4YWRhYTIzOTQ1In0sImlhdCI6MTY0MzExMzA0Nn0.GaIKnoif5sjcuDxgrZ2acE17unYpBp_kTpDG45qgtPY"
              },
              body: JSON.stringify({title,description,tag}) 
            });
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
        const deleteNote = async (id)=>{
          // API Call
          const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE', 
            headers: {
              'Content-Type': 'application/json',
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlZmRkZWY5NTI3NDA4YWRhYTIzOTQ1In0sImlhdCI6MTY0MzExMzA0Nn0.GaIKnoif5sjcuDxgrZ2acE17unYpBp_kTpDG45qgtPY"
            },
          });
          const json =  response.json(); 
          console.log(json)
          console.log("Deleting Node with id " + id)
          const newNotes = notes.filter((note)=>{return note._id!==id})
          setNotes(newNotes);
    
        }
      // Edit a Note
        const editNote = async (id,title,description,tag)=>{

          // API Call
          const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT', 
            mode:'cors',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlZmRkZWY5NTI3NDA4YWRhYTIzOTQ1In0sImlhdCI6MTY0MzExMzA0Nn0.GaIKnoif5sjcuDxgrZ2acE17unYpBp_kTpDG45qgtPY"
            },
            body: JSON.stringify({title,description,tag}) 
          });
          const json = await response.json();
          console.log(json)
            let newNotes = JSON.parse(JSON.stringify(notes))
            //Logic to edit client
            for (let index = 0; index < newNotes.length; index++) {
              const element = newNotes[index];
              if(element._id===id){
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
              }
             
            }
            setNotes(newNotes)
        }
    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote,editNote,getNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;