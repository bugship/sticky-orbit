/**
 * NoteCard — a single draggable sticky note.
 *
 * Data fields (stored as JSON strings in Appwrite):
 *  - body      → note text
 *  - colors    → { id, colorHeader, colorBody, colorText }
 *  - position  → { x, y }
 *
 * Saves:
 *  - body after 2s debounce on keyup
 *  - position on mouseup after a drag
 */
import { useRef, useEffect, useState, useContext } from "react";
import { db } from "../appwrite/databases";
import DeleteButton from "./DeleteButton";
import Spinner from "../icons/Spinner";
import { setNewOffset, autoGrow, setZIndex, bodyParser } from "../utils";
import { NoteContext } from "../context/NoteContext";

const NoteCard = ({ note }) => {
  const [saving, setSaving] = useState(false);
  const keyUpTimer = useRef(null);
  const { setSelectedNote } = useContext(NoteContext);

  const body = bodyParser(note.body);
  const [position, setPosition] = useState(JSON.parse(note.position));
  const colors = JSON.parse(note.colors);

  const mouseStartPos = useRef({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const textAreaRef = useRef(null);

  useEffect(() => {
    autoGrow(textAreaRef);
    setZIndex(cardRef.current);
  }, []);

  /** Start drag only when the user presses on the header bar (not the textarea). */
  const mouseDown = (e) => {
    if (e.target.className !== "card-header") return;

    mouseStartPos.current = { x: e.clientX, y: e.clientY };
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
    setZIndex(cardRef.current);
    setSelectedNote(note);
  };

  const mouseMove = (e) => {
    const mouseMoveDir = {
      x: mouseStartPos.current.x - e.clientX,
      y: mouseStartPos.current.y - e.clientY,
    };
    mouseStartPos.current = { x: e.clientX, y: e.clientY };
    setPosition(setNewOffset(cardRef.current, mouseMoveDir));
  };

  /** Persist a single field to Appwrite (body or position). */
  const saveData = async (key, value) => {
    const payload = { [key]: JSON.stringify(value) };
    try {
      await db.notes.update(note.$id, payload);
    } catch (error) {
      console.error("Failed to save note:", error);
    } finally {
      setSaving(false);
    }
  };

  /** Debounce body saves so we do not hit the API on every keystroke. */
  const handleKeyUp = () => {
    setSaving(true);
    if (keyUpTimer.current) clearTimeout(keyUpTimer.current);
    keyUpTimer.current = setTimeout(() => {
      saveData("body", textAreaRef.current.value);
    }, 2000);
  };

  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
    const newPosition = setNewOffset(cardRef.current);
    setSaving(true);
    saveData("position", newPosition);
  };

  return (
    <div
      ref={cardRef}
      className="card"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        onMouseDown={mouseDown}
        className="card-header"
        style={{ backgroundColor: colors.colorHeader }}
      >
        <DeleteButton noteId={note.$id} />
        {saving && (
          <div className="card-saving">
            <Spinner color={colors.colorText} />
            <span style={{ color: colors.colorText }}>Saving...</span>
          </div>
        )}
      </div>
      <div className="card-body">
        <textarea
          onKeyUp={handleKeyUp}
          ref={textAreaRef}
          style={{ color: colors.colorText }}
          defaultValue={body}
          onInput={() => autoGrow(textAreaRef)}
          onFocus={() => {
            setZIndex(cardRef.current);
            setSelectedNote(note);
          }}
        />
      </div>
    </div>
  );
};

export default NoteCard;
