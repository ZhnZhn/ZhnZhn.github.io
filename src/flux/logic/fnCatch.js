
import Msg from '../../constants/Msg';

const M = Msg.Alert;

const C = {
  FETCH: 'fetch',
  CODE_503: 'code 503',
  CODE_429: '429'
};

const _fnAddAlert = (option, msg) => {
  const { caption, descr } = msg;
  Object.assign(option, {
    alertCaption: caption,
    alertDescr: descr
  })
}

const _fnAddDfAlert = (option, error) => {
  const { errCaption, message } = error
      , caption = error.errCaption
           ? errCaption
           : M.RUNTIME_ERROR.caption;
  _fnAddAlert(option, { caption, descr: message })
}

export const fnCatch = function({ error, option, onFailed }){
  if (error instanceof TypeError){
    if (error.message.indexOf(C.CODE_503) !== -1){
      _fnAddAlert(option, M.SERVICE_UNAVAILABLE)
    } else if (error.message.indexOf(C.CODE_429) !== -1) {
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
