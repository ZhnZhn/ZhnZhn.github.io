import {
  forwardRef,
  useRef,
  useImperativeHandle,
  getRefElementStyle
} from '../uiApi';

import { CL_BT_ARROW } from './CL';

const ANIMATION_CIRCLE = "circle infinite 1.25s linear"
, BORDER_COLOR = "#1b75bb transparent transparent"

, S_ARROW_SHOW = {
  borderColor: '#1b75bb transparent transparent'
};


const ArrowCell = forwardRef(({
  isShowOption,
  labelId,
  controlsId,
  onClick
}, ref) => {
  const _arrowStyle = isShowOption
    ? S_ARROW_SHOW : void 0
  , _refArrowCell = useRef()
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
       aria-labelledby={labelId}
       aria-label="Toggle suggestions"
       aria-expanded={isShowOption}
       aria-controls={isShowOption ? controlsId : void 0}
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
