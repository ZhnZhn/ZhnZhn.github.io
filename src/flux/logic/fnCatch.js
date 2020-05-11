
import Msg from '../../constants/Msg';

const M = Msg.Alert;

const C = {
  FETCH: 'fetch',
  CODE_429: '429'
};

const _addErrMsg = (option, msg) => {
  const { caption, descr } = msg;
  Object.assign(option, {
    alertCaption: caption,
    alertDescr: descr
  })
}

const _crAlertDescr = (error)  => {
  const { errCaption, message='' } = error;
  if (error.errCaption) {
    return {
      caption: errCaption,
      descr: message
    };
  } else if (message.indexOf(M.ERR_10.token) !== -1) {
    return M.ERR_10;
  } else {
    return {
      caption: M.RUNTIME_ERROR.caption,
      descr: message
    };
  }
}

const _addDfErrMsg = (option, error) => {
  const _obj = _crAlertDescr(error);
  _addErrMsg(option, _obj)
}

const _isMsgByCode = (err, code) => err
 .message.indexOf(code) !== -1;

export const fnCatch = function({ error, option, onFailed }){
  if (error instanceof TypeError){
    if (_isMsgByCode(error, C.CODE_429)) {
       _addErrMsg(option, M.TOO_MANY_REQUEST)
    } else if (_isMsgByCode(error, C.FETCH)) {
       _addErrMsg(option, M.NETWORK_ERROR)
    } else {
       _addDfErrMsg(option, error)
    }
  } else {
     _addDfErrMsg(option, error)
  }

  if (typeof onFailed === 'function') {
    onFailed(option)
  }
}
