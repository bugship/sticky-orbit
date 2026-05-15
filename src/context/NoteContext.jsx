/**
 * NoteContext — global notes state for the board.
 *
 * Provides:
 *  - notes / setNotes
 *  - selectedNote / setSelectedNote  (for color picker targeting)
 *  - error                           (Appwrite load failures)
 *  - loading spinner on first fetch
 */
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

  /** Load all notes from Appwrite once on mount. */
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
