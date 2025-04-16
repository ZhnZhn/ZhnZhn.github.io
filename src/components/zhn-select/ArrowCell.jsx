import { crAriaExpandedProps } from '../ariaFn';
import { Svg } from '../zhn/svg/Svg';
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
      <path d="M 3,6 L 10,12.5 M 10,12.5 L 17,6" />
    </Svg>
  </button>
);

export default ArrowCell
