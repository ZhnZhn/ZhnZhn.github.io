import {
  forwardRef,
  useRef,
  useImperativeHandle
} from 'react';

import { CL_BT_ARROW } from './CL';

const ANIMATION_CIRCLE = "circle infinite 1.25s linear"
, BORDER_COLOR = "#1b75bb transparent transparent";

const _getStyle = ref => ref.current.style;

const ArrowCell = forwardRef(({
  arrowStyle,
  onClick
}, ref) => {
  const _refArrowCell = useRef()
  , _refArrow = useRef();

  useImperativeHandle(ref, () => ({
    startAnimation: () => {
      _getStyle(_refArrowCell).animation = ANIMATION_CIRCLE;
      _getStyle(_refArrow).borderColor = BORDER_COLOR;
    },
    stopAnimation: () => {
      _getStyle(_refArrowCell).animation = "";
    }
  }), [])

  return (
    <button
       ref={_refArrowCell}
       className={CL_BT_ARROW}
       tabIndex="-1"
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
