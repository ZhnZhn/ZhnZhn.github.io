import LoadGuard from '../../../utils/LoadGuard';

import loadConfigsImplA from './loadConfigsImplA';
import loadConfigsImplB from './loadConfigsImplB';

const MSG_STILL_LOADING = "Another dialog are still loading"
, MSG_INCORRECT_CONFIG = 'Incorrect dialog configuration'
, _isArr = Array.isArray;

const guard = new LoadGuard();

const _crLoadErr = ({
  errMsg,
  message
}) => ({
   errMsg: errMsg || message
});

const _getLoad = props => {
  const { dfQ } = props;
  return !_isArr(dfQ)
    ? loadConfigsImplA
    : dfQ.length === 2
       ? loadConfigsImplB
       : void 0;
};

const loadConfigs = (props) => {
  if (guard.isLoading){
    return Promise.resolve({ errMsg: MSG_STILL_LOADING });
  } else {
    const _load = _getLoad(props);
    if (_load) {
      return _load(guard, props)
        .catch(_crLoadErr)
        .finally(() => guard.stop());
    }
    return Promise.resolve({ errMsg: MSG_INCORRECT_CONFIG });
  }
};

export default loadConfigs
