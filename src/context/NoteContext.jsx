import { createContext, useState, useEffect } from "react";
import { db } from "../appwrite/databases";

export const NoteContext = createContext();

const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    db.notes.list().then((res) => setNotes(res.documents || []));
  }, []);

  return (
    <NoteContext.Provider value={{ notes, setNotes, selectedNote, setSelectedNote }}>
      {children}
    </NoteContext.Provider>
  );
};

export default NotesProvider;
