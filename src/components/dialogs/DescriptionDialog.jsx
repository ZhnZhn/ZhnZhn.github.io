import {
  useState,
  useEffect
} from '../uiApi';
import useHasNotEqual from '../hooks/useHasNotEqual';
import memoIsShow from '../hoc/memoIsShow';

import { fetchTxt } from '../../utils/fnFetch';

import ModalDialog from '../zhn-moleculs/ModalDialog';
import DivHtml from '../zhn/DivHtml';
import {
  SpinnerLoading,
  LoadFailedMsg
} from '../zhn/Spinner';

const EMPTY_DESCR = '<p class="descr__part">Description empty</p>'
, INITIAL_DESCR = ''
, S_DIALOG = {
  top: 54,
  left: 20,
  width: 'auto',
  maxWidth: '89%',
  marginLeft: 0
}
, S_DIV = { padding: 16 };

const _crState = (
  isLoading,
  isLoadFailed,
  errMsg,
  descrHtml
) => ({
  isLoading,
  isLoadFailed,
  errMsg,
  descrHtml
})

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
      descrHtml },
      setState
  ] = useState(() => _crState(
    false,
    false,
    '',
    INITIAL_DESCR
  ))
  , [_isNextProps] = useHasNotEqual(props)
  , [_isNextDescrUrl, isDescrUrlCurrentValue] = useHasNotEqual(descrUrl)
  , _isLoadDescr = !isLoading && isShow && descrUrl && (
      descrHtml === INITIAL_DESCR
      || _isNextDescrUrl
      || _isNextProps && isLoadFailed
  );

  useEffect(() => {
     if (_isLoadDescr) {
        setState(prevState => ({
          ...prevState,
          isLoading: true
        }))
        fetchTxt({
          uri: descrUrl,
          onFetch: ({ json }={}) => isDescrUrlCurrentValue(descrUrl) && setState(
             _crState(false, false, '', json || EMPTY_DESCR)
          ),
          onCatch: ({ error }={}) => isDescrUrlCurrentValue(descrUrl) && setState(
            _crState(false, true, error.message, EMPTY_DESCR
            )
          )
        })
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
             : <DivHtml style={S_DIV} str={descrHtml} />
      }
    </ModalDialog>
  );
})

export default DescriptionDialog
