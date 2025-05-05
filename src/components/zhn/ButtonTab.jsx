import { IfTrue } from '../uiApi';
import {
  crCn,
  crNotSelectedCn
} from '../styleFn';

import Button from './Button';

const CL_BT_TAB = crNotSelectedCn("bt bt-tab")
, CL_ARROW_DOWN = "arrow-down";

const ButtonTab = (props) => (
  <IfTrue v={props.is ?? true}>
    <Button
      className={crCn(CL_BT_TAB, props.className)}
      style={props.style}
      onClick={props.onClick}
    >
       {props.caption}
       <IfTrue v={props.isMenu}>
         <span className={CL_ARROW_DOWN} />
       </IfTrue>
    </Button>
  </IfTrue>
)

/*
ButtonTab.propTypes = {
 is: PropTypes.bool,
 isMenu: PropTypes.bool,
 className: PropTypes.string,
 style: PropTypes.object,
 caption: PropTypes.string,
 onClick: PropTypes.func
}
*/

export default ButtonTab
