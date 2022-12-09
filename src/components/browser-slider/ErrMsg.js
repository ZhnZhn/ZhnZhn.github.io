import { S_MSG_ERR } from './Style';

const ErrMsg = ({
  errMsg
}) => errMsg ? (
  <div style={S_MSG_ERR}>
    {errMsg}
  </div>
) : null;

export default ErrMsg
