/** Trash icon used by the delete-note control. */
const Trash = ({ size = "24", color = "#FFFFFF" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke={color} fill="none">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
  );
};
export default Trash;
