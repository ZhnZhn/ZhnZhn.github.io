import {
  MSG_OFFLINE,
  NETWORK_ERROR
} from '../constants/Msg';
import {
  showAlertDialogBy
} from '../flux/stores/compStore';

export const resolvePromise = Promise.resolve.bind(Promise)

export const getModuleDefault = module => module.default;

export const throwErrOffline = () => {
  throw new Error(MSG_OFFLINE);
}

export const logErrMsg = err => {
  const errMsg = (err || {}).message || "";
  console.log(errMsg)
  if (errMsg === MSG_OFFLINE) {
    showAlertDialogBy(
      NETWORK_ERROR,
      MSG_OFFLINE
    )
  }
}
