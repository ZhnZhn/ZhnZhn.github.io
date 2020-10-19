const CL = "button-circle";

const SvgMinus = ({ style, onClick }) => (
  <button className={CL} style={style} onClick={onClick}>
     <svg
          width="20px" height="20px"
          viewBox="0 0 20 20"
          preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
      >
      <path
         strokeWidth="2"
         strokeLinecap="round"
         d="M 4,10 L 16,10"
      />
     </svg>
  </button>
);

export default SvgMinus
