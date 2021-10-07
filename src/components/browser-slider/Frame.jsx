import { useRef, useState, useCallback, useEffect } from 'react'

import MenuTitle from './MenuTitle'
import Page from './Page'
import { S_FRAME } from './Style'

const FOCUS_FIRST_MLS = 1000;

const _isArr = Array.isArray;

const _getProxy = (store, dfProps) => store
 .getProxy(dfProps.lT);

const _fOnClick = (
  proxy, rootId,
  dfProps, pageNumber,
  onClickNext, fOnClickItem,
  item
) => {
  const { text, id, type } = item
  , _id = dfProps.lT === 'SDN'
     ? id || rootId
     : rootId ? `${rootId}/${id}` : id;

  return type === 'l'
     ? onClickNext.bind(null, _id, text, pageNumber)
     : fOnClickItem({
         id: _id,
         ...dfProps,
         text,
         proxy
       });
};

const Frame = ({
  style,
  store,
  title, id='',
  dfProps={},
  pageNumber, pageCurrent,
  onClickPrev,
  onClickNext,
  fOnClickItem,
  loadItems
}) => {
  const _refTitle = useRef()
  , _refId = useRef()
  , [state, setState] = useState({})
  , { model, errMsg } = state
  , proxy = _getProxy(store, dfProps)
  , _fOnClickItem = useCallback(
      _fOnClick.bind(null,
         proxy, id, dfProps, pageNumber,
         onClickNext, fOnClickItem
       )
      , [proxy])
  , _isTitle = title && onClickPrev
  , _isFocusTitle = pageNumber === pageCurrent
      && (_isTitle || !_isTitle && model);

  useEffect(()=>{
    if (title) {
      loadItems(proxy, dfProps, id)
        .then(model => {
          const _nextState = _isArr(model)
            ? { model }
            : { errMsg: 'Response is not array'};
          setState(_nextState)
        })
        .catch(err => setState({ errMsg: err.message }))
    }
    return () => {
      clearTimeout(_refId.current)
      _refTitle.current = null
    }
  }, [])

  useEffect(() => {
    if (_isFocusTitle) {
      clearTimeout(_refId.current);
      _refId.current = setTimeout(()=>{
          const _titleNode = _refTitle.current;
          if (_titleNode) {
           _titleNode.focus()
          }
      }, FOCUS_FIRST_MLS)
    }
  }, [_isFocusTitle])

  return (
    <div style={{...S_FRAME, ...style}}>
      { _isTitle && <MenuTitle
          innerRef={_refTitle}
          title={title}
          onClick={onClickPrev.bind(null, pageNumber)}
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
