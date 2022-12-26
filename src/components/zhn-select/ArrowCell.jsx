import {
  forwardRef,
  useRef,
  useImperativeHandle,
  getRefElementStyle
} from '../uiApi';

import { CL_BT_ARROW } from './CL';

const ANIMATION_CIRCLE = "circle infinite 1.25s linear"
, BORDER_COLOR = "#1b75bb transparent transparent";

const ArrowCell = forwardRef(({
  arrowStyle,
  onClick
}, ref) => {
  const _refArrowCell = useRef()
  , _refArrow = useRef();

  useImperativeHandle(ref, () => ({
    startAnimation: () => {
      getRefElementStyle(_refArrowCell).animation = ANIMATION_CIRCLE;
      getRefElementStyle(_refArrow).borderColor = BORDER_COLOR;
    },
    stopAnimation: () => {
      getRefElementStyle(_refArrowCell).animation = "";
    }
  }), [])

  return (
    <button
       type="button"
       ref={_refArrowCell}
       tabIndex="-1"
       className={CL_BT_ARROW}
       onClick={onClick}
    >
      <span
         ref={_refArrow}
         style={arrowStyle}
      />
    </button>
  );
});

export default ArrowCell
