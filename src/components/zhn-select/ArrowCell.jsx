import { crAriaExpandedProps } from '../a11yFn';
import { SvgArrowDown } from '../zhn/svg/Svg';
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
    <SvgArrowDown
      style={isShowOption ? S_SVG_OPEN : S_SVG_CLOSE}
    />
  </button>
);

export default ArrowCell
