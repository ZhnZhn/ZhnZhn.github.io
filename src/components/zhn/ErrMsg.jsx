import {
  S_ERR_MSG
} from './Input.Style';

const ErrMsg = ({
  msg
}) => msg
  ? <div style={S_ERR_MSG}>{msg}</div>
  : null;

export default ErrMsg
