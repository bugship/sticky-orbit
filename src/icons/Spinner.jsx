/** Loading spinner shown while notes load or a note is saving. */
const Spinner = ({ size = "24", color = "#FFFFFF" }) => {
  return (
    <svg className="spinner" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke={color} fill="none">
      <line x1="12" y1="2" x2="12" y2="6"></line>
      <line x1="12" y1="18" x2="12" y2="22"></line>
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
      <line x1="2" y1="12" x2="6" y2="12"></line>
      <line x1="18" y1="12" x2="22" y2="12"></line>
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
    </svg>
  );
};
export default Spinner;
