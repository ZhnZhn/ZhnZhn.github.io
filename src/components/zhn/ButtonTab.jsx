import { crCn } from '../styleFn';

import Button from './Button';

const CL_BT_TAB = "not-selected bt-tab"
, CL_BT_TAB__SHOW = `${CL_BT_TAB} bt-tab--show`
, CL_ARROW_DOWN = "arrow-down";

const ButtonTab = ({
  is=true,
  isShow,
  isMenu,
  className,
  style,
  caption,
  onClick
}) => {
  return is ? (
    <Button
      className={crCn(
        isShow ? CL_BT_TAB__SHOW : CL_BT_TAB,
        className
      )}
      style={style}
      onClick={onClick}
    >
       {caption}
       {isMenu && <span className={CL_ARROW_DOWN} />}
    </Button>
  ) : null;
};

export default ButtonTab
