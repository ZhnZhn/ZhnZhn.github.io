
import Msg from '../../constants/Msg';

const C = {
  FETCH: 'fetch',
  CODE_503: 'code 503'
};

const _fnAddAlert = (option, caption, descr) => {
  Object.assign(option, {
    alertCaption: caption,
    alertDescr: descr
  })
}

const _fnAddDfAlert = (option, error) => {
  const { errCaption, message } = error
      , _caption = error.errCaption
           ? errCaption
           : Msg.Alert.RUNTIME_ERROR.caption;
  _fnAddAlert(option, _caption, message)
}

export const fnCatch = function({ error, option, onFailed }){
  if (error instanceof TypeError){
    if (error.message.indexOf(C.CODE_503) !== -1){
      _fnAddAlert(option,
          Msg.Alert.SERVICE_UNAVAILABLE.caption,
          Msg.Alert.SERVICE_UNAVAILABLE.descr
      )
    } else if (error.message.indexOf(C.FETCH) !== -1) {
       _fnAddAlert(option,
          Msg.Alert.NETWORK_ERROR.caption,
          Msg.Alert.NETWORK_ERROR.descr
       )
    } else {
       _fnAddDfAlert(option, error)
    }
  } else {
      _fnAddDfAlert(option, error)
  }

  onFailed(option)
}
