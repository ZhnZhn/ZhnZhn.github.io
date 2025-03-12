import {
  bindTo,
  useRef,
  useState,
  useCallback,
  useEffect,
  setRefValue,
  getRefValue,
  focusRefElement
} from '../uiApi';

import MenuTitle from './MenuTitle';
import Page from './Page';
import { S_FRAME } from './Style';

const _isArr = Array.isArray
, FOCUS_FIRST_MLS = 350;

const _crId = (
  dfProps,
  rootId,
  id
) => dfProps.lT === 'SDN'
  ? id || rootId
  : rootId ? `${rootId}/${id}` : id;

const _fOnClick = (
  proxy,
  rootId,
  dfProps,
  pageNumber,
  onClickNext,
  fOnClickItem,
  item
) => {
  const {
    text,
    id,
    type
  } = item
  , _id = _crId(dfProps, rootId, id);

  return type === 'l'
    ? bindTo(onClickNext, _id, text, pageNumber)
    : fOnClickItem({
        id: _id,
        ...dfProps,
        text,
        proxy
     });
};

const Frame = ({
  style,
  title,
  id='',
  dfProps={},
  pageNumber,
  pageCurrent,
  onClickPrev,
  onClickNext,
  fOnClickItem,
  loadItems,
  getProxy
}) => {
  const _refTitle = useRef()
  , _refId = useRef()
  , [state, setState] = useState({})
  , { model, errMsg } = state
  , proxy = getProxy(dfProps.lT)
  /*eslint-disable react-hooks/exhaustive-deps */
  , _fOnClickItem = useCallback(
      bindTo(
        _fOnClick,
        proxy, id, dfProps, pageNumber,
        onClickNext, fOnClickItem
      )
      , [proxy])
  /*eslint-enable react-hooks/exhaustive-deps */
  , _isTitle = (pageNumber !== 0)
      && title
      && onClickPrev
  , _isFocusTitle = (pageNumber === pageCurrent)
      && (_isTitle || !_isTitle && model);

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(()=>{
    if (title) {
      loadItems(proxy, dfProps, id)
        .then(model => {
          const _nextState = _isArr(model)
            ? { model }
            : { errMsg: 'Response is not array'};
          setState(_nextState)
        })
        .catch(err => setState({
            errMsg: err.message
        }))
    }
    return () => {
      clearTimeout(getRefValue(_refId))
      setRefValue(_refTitle, null)
    }
  }, [])
  /*eslint-enable react-hooks/exhaustive-deps */

  useEffect(() => {
    if (_isFocusTitle) {
      clearTimeout(getRefValue(_refId));
      setRefValue(_refId, setTimeout(()=>{
        focusRefElement(_refTitle)
      }, FOCUS_FIRST_MLS))
    }
  }, [_isFocusTitle])

  return (
    <div style={{...S_FRAME, ...style}}>
      { _isTitle && <MenuTitle
          innerRef={_refTitle}
          title={title}
          onClick={bindTo(onClickPrev, pageNumber)}
        />
      }
      <Page
        refFirstItem={!_isTitle ? _refTitle : void 0}
        model={model}
        fOnClickItem={_fOnClickItem}
        errMsg={errMsg}
      />
    </div>
  );
}

export default Frame
