import { filterBoolean } from '../../utils/arrFn';

const CL_ERR_MSG = "err-msg";

const _crMsgErr = msg => filterBoolean([
  'Error occured during rendering', msg
]).join(' ') + '.';

const MsgRenderErr = ({
  isShow,
  style,
  msg
}) => isShow
 ? <div className={CL_ERR_MSG} style={style}>
     {_crMsgErr(msg)}
   </div>
 : null;

 export default MsgRenderErr
