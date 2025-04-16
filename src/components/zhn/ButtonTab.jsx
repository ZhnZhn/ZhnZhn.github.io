import {
  crCn,
  crNotSelectedCn
} from '../styleFn';

import Button from './Button';

const CL_BT_TAB = crNotSelectedCn("bt bt-tab")
, CL_ARROW_DOWN = "arrow-down";

const ButtonTab = ({
  is=true,
  isMenu,
  className,
  style,
  caption,
  onClick
}) => is ? (
  <Button
    className={crCn(CL_BT_TAB, className)}
    style={style}
    onClick={onClick}
  >
     {caption}
     {isMenu && <span className={CL_ARROW_DOWN} />}
  </Button>
) : null;

export default ButtonTab
