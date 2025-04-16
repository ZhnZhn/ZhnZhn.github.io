import {
  crNotSelectedCn
} from '../styleFn';
import {
  FILL_NONE,
  Svg100,
  STROKE_LINECAP_ROUND_PROPS
} from '../zhn/svg/Svg';

const CL_BT_RESIZE = crNotSelectedCn("bt-resize");

const BtResize = ({
  style,
  title,
  startResize,
  stopResize,
  onKeyDown
}) => (
  <button
     type="button"
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
       {...STROKE_LINECAP_ROUND_PROPS}
       fill={FILL_NONE}
     >
        <path d="M 1,6 L 11,6" />
        <path d="M 6,2 L 1,6 6,10" />
     </Svg100>
   </button>
);

export default BtResize
