import {
  isObj,
  isIncludeToken
} from '../../utils/isTypeFn';

import useHasNotEqual from '../hooks/useHasNotEqual';
import memoIsShow from '../hoc/memoIsShow';
import { useLoadJson } from './useLoadJson';

import ModalDialog from '../zhn-moleculs/ModalDialog';
import {
  SpinnerLoading,
  LoadFailedMsg
} from '../zhn/Spinner';
import AboutView from './AboutView';

const EMPTY_DESCR = { descr: 'Description empty' }
, INITIAL_DESCR = {}
, S_DIALOG = {
  top: 54,
  left: 20,
  width: 'auto',
  maxWidth: '89%',
  marginLeft: 0
};

const _getAboutJson = (
  aboutJson
) => isObj(aboutJson)
  ? aboutJson
  : EMPTY_DESCR;

const DescriptionDialog = memoIsShow((props) => {
  const {
    isShow,
    data,
    onClose
  } = props
  , { descrUrl } = data || {}
  , [_isNextProps] = useHasNotEqual(props)
  , [_isNextDescrUrl] = useHasNotEqual(descrUrl)
  /*eslint-disable no-use-before-define*/
  , [
    isLoading,
    isLoadFailed,
    errMsg,
    aboutJson
  ] = useLoadJson(
    INITIAL_DESCR,
    isShow && descrUrl
      && (!_isNextProps || _isNextDescrUrl || isLoadFailed),
    isIncludeToken(descrUrl, 'data')
      ? descrUrl
      : void 0
  );
  //isLoadFailed
  /*eslint-enable no-use-before-define*/

  return (
    <ModalDialog
      caption="About Data Source"
      isShow={isShow}
      style={S_DIALOG}
      onClose={onClose}
    >
      {isLoading
        ? <SpinnerLoading />
        : isLoadFailed
           ? <LoadFailedMsg errMsg={errMsg} />
           : <AboutView aboutJson={_getAboutJson(aboutJson)} />
      }
    </ModalDialog>
  );
})

export default DescriptionDialog
