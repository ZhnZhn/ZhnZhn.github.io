import { crAriaExpandedProps } from '../ariaFn';
import Svg from '../zhn/svg/Svg';
import { CL_BT_ARROW } from './CL';

const S_SVG_OPEN = {
  color: "#1b75bb"
}
, S_SVG_CLOSE = {
  color: "#858585"
};

const ArrowCell = ({
  isShowOption,
  labelId,
  controlsId,
  onClick
}) => (
  <button
     {...crAriaExpandedProps(isShowOption, controlsId)}
     aria-labelledby={labelId}
     aria-label="Toggle suggestions"
     aria-haspopup="true"
     type="button"
     tabIndex="-1"
     className={CL_BT_ARROW}
     onClick={onClick}
  >
    <Svg
      w="20"
      aria-hidden="true"
      focusable="false"
      style={isShowOption ? S_SVG_OPEN : S_SVG_CLOSE}
    >
     <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" />
    </Svg>
  </button>
);

export default ArrowCell
