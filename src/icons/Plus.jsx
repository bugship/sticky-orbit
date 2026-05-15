/** Plus icon used by the add-note control. */
const Plus = ({ size = "24", color = "#FFFFFF" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke={color} fill="none">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
};
export default Plus;
