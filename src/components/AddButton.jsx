/**
 * Floating "+" control — creates a new yellow note at a staggered position.
 */
import Plus from "../icons/Plus";
import colors from "../assets/colors.json";
import { useContext, useRef } from "react";
import { db } from "../appwrite/databases";
import { NoteContext } from "../context/NoteContext";

const AddButton = () => {
  const { setNotes } = useContext(NoteContext);
  // Offset each new note slightly so they do not stack perfectly on top of each other.
  const startingPos = useRef(10);

  const addNote = async () => {
    const payload = {
      position: JSON.stringify({
        x: startingPos.current,
        y: startingPos.current,
      }),
      // Default to the first palette color (yellow).
      colors: JSON.stringify(colors[0]),
    };

    startingPos.current += 10;

    const response = await db.notes.create(payload);
    setNotes((prevState) => [response, ...prevState]);
  };

  return (
    <div id="add-btn" onClick={addNote}>
      <Plus />
    </div>
  );
};

export default AddButton;
