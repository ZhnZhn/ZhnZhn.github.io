
import Msg from '../../constants/Msg';

const M = Msg.Alert;

const C = {
  FETCH: 'fetch',
  CODE_429: '429'
};

const _fnAddAlert = (option, msg) => {
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
  } else if (message.indexOf(M.ZH_1000.token) !== -1) {
    return M.ZH_1000;
  } else {
    return {
      caption: M.RUNTIME_ERROR.caption,
      descr: message
    };
  }
}

const _fnAddDfAlert = (option, error) => {
  const _obj = _crAlertDescr(error);
  _fnAddAlert(option, _obj)
}

export const fnCatch = function({ error, option, onFailed }){
  if (error instanceof TypeError){
    if (error.message.indexOf(C.CODE_429) !== -1) {
       _fnAddAlert(option, M.TOO_MANY_REQUEST)
    } else if (error.message.indexOf(C.FETCH) !== -1) {
       _fnAddAlert(option, M.NETWORK_ERROR)
    } else {
       _fnAddDfAlert(option, error)
    }
  } else {
     _fnAddDfAlert(option, error)
  }

  onFailed(option)
}
