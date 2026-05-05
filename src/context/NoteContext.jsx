import { createContext, useState, useEffect } from "react";
import Spinner from "../icons/Spinner";
import { db } from "../appwrite/databases";

export const NoteContext = createContext();

const NotesProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const response = await db.notes.list();
      setNotes(response.documents || []);
      setError(null);
    } catch (err) {
      console.error("Failed to load notes:", err);
      setError("Could not load notes. Check your Appwrite configuration.");
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  const contextData = { notes, setNotes, selectedNote, setSelectedNote, error };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Spinner size="100" />
      </div>
    );
  }

  return (
    <NoteContext.Provider value={contextData}>{children}</NoteContext.Provider>
  );
};

export default NotesProvider;
