import { useRef, useState } from "react";
import DeleteButton from "./DeleteButton";
import { bodyParser } from "../utils";

const NoteCard = ({ note }) => {
  const body = bodyParser(note.body);
  const position = JSON.parse(note.position);
  const colors = JSON.parse(note.colors);
  const [text, setText] = useState(body);
  const cardRef = useRef(null);

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
      <div className="card-header" style={{ backgroundColor: colors.colorHeader }}>
        <DeleteButton noteId={note.$id} />
      </div>
      <div className="card-body">
        <textarea
          style={{ color: colors.colorText }}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </div>
  );
};

export default NoteCard;
