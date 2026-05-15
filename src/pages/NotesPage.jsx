/**
 * NotesPage — renders every note as a NoteCard plus the floating Controls rail.
 */
import { useContext } from "react";
import NoteCard from "../components/NoteCard";
import Controls from "../components/Controls";
import { NoteContext } from "../context/NoteContext";

const NotesPage = () => {
  const { notes, error } = useContext(NoteContext);

  return (
    <div>
      {/* Banner when Appwrite is misconfigured or unreachable */}
      {error && (
        <div
          style={{
            position: "fixed",
            top: 16,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#5c1a1a",
            color: "#ffb4b4",
            padding: "0.75rem 1.25rem",
            borderRadius: 8,
            zIndex: 10001,
          }}
        >
          {error}
        </div>
      )}
      {notes.map((note) => (
        <NoteCard key={note.$id} note={note} />
      ))}
      <Controls />
    </div>
  );
};

export default NotesPage;
