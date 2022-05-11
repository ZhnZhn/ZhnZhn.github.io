import {
  ERR_10,
  ERR_TOO_MANY_REQUEST,
  ERR_NETWORK
} from '../../constants/Msg';

const FETCH = 'fetch'
, CODE_429 = '429'
, ERROR = 'ERROR';

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
  , caption = errCaption || ERROR;
  return message.indexOf(ERR_10.token) !== -1
    ? ERR_10
    : { caption, descr: message };
};

const _isMsgByCode = (err, code) => err
 .message.indexOf(code) !== -1;

const _crErrDescr = (error) => {
  if (error instanceof TypeError){
    if (_isMsgByCode(error, CODE_429)) {
      return ERR_TOO_MANY_REQUEST;
    } else if (_isMsgByCode(error, FETCH)) {
      return ERR_NETWORK;
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
