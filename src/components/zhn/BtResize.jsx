import Svg100 from './svg/Svg100';

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
     <Svg100
       w="12"
       strokeWidth="2"
       strokeLinecap="round"
       fill="none"
     >
        <path d="M 1,6 L 11,6" />
        <path d="M 6,2 L 1,6 6,10" />
     </Svg100>
   </button>
);

export default BtResize
