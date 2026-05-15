/**
 * Board geometry and note helpers used by NoteCard.
 */

/**
 * Compute a new {x,y} for a card after a mouse move.
 * Clamps to non-negative coordinates so notes cannot leave the board top-left.
 */
export const setNewOffset = (card, mouseMoveDir = { x: 0, y: 0 }) => {
  const offsetLeft = card.offsetLeft - mouseMoveDir.x;
  const offsetTop = card.offsetTop - mouseMoveDir.y;

  return {
    x: offsetLeft < 0 ? 0 : offsetLeft,
    y: offsetTop < 0 ? 0 : offsetTop,
  };
};

/**
 * Grow a textarea to fit its content (used while typing on a note).
 */
export function autoGrow(textAreaRef) {
  const { current } = textAreaRef;
  current.style.height = "auto";
  current.style.height = current.scrollHeight + "px";
}

/**
 * Bring the selected card to the front and lower z-index of others.
 */
export const setZIndex = (selectedCard) => {
  selectedCard.style.zIndex = 999;

  Array.from(document.getElementsByClassName("card")).forEach((card) => {
    if (card !== selectedCard) {
      card.style.zIndex = selectedCard.style.zIndex - 1;
    }
  });
};

/**
 * Notes store body as a JSON-encoded string in Appwrite.
 * Parse when possible; fall back to raw value for legacy/plain data.
 */
export const bodyParser = (value) => {
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};
