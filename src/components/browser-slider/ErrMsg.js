import { S_MSG_ERR } from './Style';

const ErrMsg = ({ errMsg }) => {
  if (!errMsg) return null;
  return (
    <div style={S_MSG_ERR}>
      {errMsg}
    </div>
  );
};

export default ErrMsg
