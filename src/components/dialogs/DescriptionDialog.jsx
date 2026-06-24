import {
  isObj,
  isIncludeToken
} from '../../utils/isTypeFn';

import {
  useState,
  useEffect
} from '../uiApi';
import useHasNotEqual from '../hooks/useHasNotEqual';
import memoIsShow from '../hoc/memoIsShow';

import { fetchJson } from '../../utils/fnFetch';

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

const _crState = (
  isLoading,
  isLoadFailed,
  errMsg,
  aboutJson
) => ({
  isLoading,
  isLoadFailed,
  errMsg,
  aboutJson
})

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
  , [{
      isLoading,
      isLoadFailed,
      errMsg,
      aboutJson },
      setState
  ] = useState(() => _crState(
    !1,
    !1,
    '',
    INITIAL_DESCR
  ))
  , [_isNextProps] = useHasNotEqual(props)
  , [_isNextDescrUrl, isDescrUrlCurrentValue] = useHasNotEqual(descrUrl)
  , _isLoadDescr = isShow && descrUrl
      && (_isNextDescrUrl || !isLoading
        && (aboutJson === INITIAL_DESCR || _isNextProps && isLoadFailed)
  );

  useEffect(() => {
     if (_isLoadDescr) {
        setState(prevState => ({
          ...prevState,
          isLoading: !0
        }))

        if (isIncludeToken(descrUrl, 'data')) {
          fetchJson({
            uri: descrUrl.replace('.html', '.json'),
            onFetch: ({ json }={}) => isDescrUrlCurrentValue(descrUrl) && setState(
              _crState(!1, !1, '', json || EMPTY_DESCR)
            ),
            onCatch: ({ error }={}) => isDescrUrlCurrentValue(descrUrl) && setState(
              _crState(!1, !0, error.message, EMPTY_DESCR)
            )
          })
        }
     }
  }, [_isLoadDescr, descrUrl, isDescrUrlCurrentValue])

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
