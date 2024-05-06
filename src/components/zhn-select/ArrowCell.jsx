import { crAriaExpandedProps } from './InputSelectFn';
import { CL_BT_ARROW } from './CL';

const ARROW_BORDER_COLOR = "#1b75bb transparent transparent"
, S_ARROW_SHOW = {
  borderColor: ARROW_BORDER_COLOR
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
    <span
       style={isShowOption
         ? S_ARROW_SHOW
         : void 0}
    />
  </button>
);

export default ArrowCell
