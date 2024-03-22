import {
  forwardRef,
  useRef,
  useImperativeHandle,
  getRefElementStyle
} from '../uiApi';

import { crAriaExpandedProps } from './InputSelectFn';
import { CL_BT_ARROW } from './CL';

const ANIMATION_CIRCLE = "circle infinite 1.25s linear"
, ARROW_BORDER_COLOR = "#1b75bb transparent transparent"
, S_ARROW_SHOW = {
  borderColor: ARROW_BORDER_COLOR
};

const ArrowCell = forwardRef(({
  isShowOption,
  labelId,
  controlsId,
  onClick
}, ref) => {
  const _arrowStyle = isShowOption
    ? S_ARROW_SHOW
    : void 0
  , _refArrowCell = useRef()
  , _refArrow = useRef();

  useImperativeHandle(ref, () => ({
    startAnimation: () => {
      getRefElementStyle(_refArrowCell).animation = ANIMATION_CIRCLE;
      getRefElementStyle(_refArrow).borderColor = ARROW_BORDER_COLOR;
    },
    stopAnimation: () => {
      getRefElementStyle(_refArrowCell).animation = "";
    }
  }), [])

  return (
    <button
       {...crAriaExpandedProps(isShowOption, controlsId)}
       aria-labelledby={labelId}
       aria-label="Toggle suggestions"
       aria-haspopup="true"
       type="button"
       ref={_refArrowCell}
       tabIndex="-1"
       className={CL_BT_ARROW}
       onClick={onClick}
    >
      <span
         ref={_refArrow}
         style={_arrowStyle}
      />
    </button>
  );
});

export default ArrowCell
