import Msg from '../../constants/Msg';

const M = Msg.Alert;

const C = {
  FETCH: 'fetch',
  CODE_429: '429',
  ERR: 'ERROR'
};

const _assign = Object.assign;

const _addErrDescrTo = (option, msg) => {
  const { caption, descr } = msg;
  _assign(option, {
    alertCaption: caption,
    alertDescr: descr
  })
}

const _crDfErrDescr = (error)  => {
  const { errCaption, message='' } = error || {}
  , caption = errCaption || C.ERR;
  return message.indexOf(M.ERR_10.token) !== -1
    ? M.ERR_10
    : { caption, descr: message };
};

const _isMsgByCode = (err, code) => err
 .message.indexOf(code) !== -1;

const _crErrDescr = (error) => {
  if (error instanceof TypeError){
    if (_isMsgByCode(error, C.CODE_429)) {
      return M.TOO_MANY_REQUEST;
    } else if (_isMsgByCode(error, C.FETCH)) {
      return M.NETWORK_ERROR;
    }
  }
  return _crDfErrDescr(error);
};

const onCatch = function({ error, option, onFailed }){
  const _errDescr = _crErrDescr(error);
  _addErrDescrTo(option, _errDescr)

  if (typeof onFailed === 'function') {
    onFailed(option)
  }
};

export default onCatch
