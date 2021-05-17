
const CL_BT_RESIZE = "bt-resize not-selected";

const BtResize = ({
  style,
  title,
  startResize,
  stopResize,
  onKeyDown
}) => (
  <button
     className={CL_BT_RESIZE}
     style={style}
     title={title}
     onMouseDown={startResize}
     onMouseUp={stopResize}
     onKeyDown={onKeyDown}
     onTouchStart={startResize}
     onTouchEnd={stopResize}
  >
     <svg viewBox="0 0 12 12" width="100%" height="100%"
       preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
       strokeWidth="2" strokeLinecap="round" fill="none"
     >
        <path d="M 1,6 L 11,6" />
        <path d="M 6,2 L 1,6 6,10" />
     </svg>
   </button>
);

export default BtResize
