const CL_ERR_MSG = "err-msg";

const _crMsgErr = msg => [
  'Error occured during rendering', msg
].filter(Boolean).join(' ') + '.';

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
