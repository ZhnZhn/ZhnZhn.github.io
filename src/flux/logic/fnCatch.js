
import Msg from '../../constants/Msg';

export const fnCatch = function({error, option, onFailed}){
  if (error instanceof TypeError){
    if (error.message.indexOf('fetch') !== -1) {
       option.alertCaption = Msg.Alert.NETWORK_ERROR.caption;
       option.alertDescr = Msg.Alert.NETWORK_ERROR.descr;
    } else {
       option.alertCaption = (error.errCaption)
           ? error.errCaption
           : Msg.Alert.RUNTIME_ERROR.caption;
       option.alertDescr = error.message;
    }
  } else {
     option.alertCaption = (error.errCaption)
        ? error.errCaption
        : Msg.Alert.RUNTIME_ERROR.caption;
     option.alertDescr = error.message;
  }

  onFailed(option);
}
