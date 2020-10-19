import { useRef, useState, useCallback, useEffect } from 'react'

import MenuTitle from './MenuTitle'
import MenuList from './MenuList'
import ErrMsg from './ErrMsg'

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
  const { text, id, type } = item;
  return type === 'l'
     ? onClickNext.bind(null, `${rootId}/${id}`, text, pageNumber)
     : fOnClickItem({
         id: `${rootId}/${id}`,
         ...dfProps,
         text,
         proxy
       });
};

const Frame = ({
  refFirstItem,
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
  , [state, setState] = useState({ model: [], errMsg: null})
  , { model, errMsg } = state
  , proxy = _getProxy(store, dfProps)
  , _fOnClickItem = useCallback(
      _fOnClick.bind(null,
         proxy, id, dfProps, pageNumber,
         onClickNext, fOnClickItem
       )
      , [proxy]);

  useEffect(()=>{
    if (title) {
      loadItems(`${dfProps.rootUrl}/${id}`, proxy)
        .then(model => {
          if (_isArr(model)){
            setState({ model, errMsg: null })
          } else {
            throw new Error('Response is not array')
          }
        })
        .catch(err => setState({
           model: [], errMsg: err.message
         }))
    }
    return () => {
      clearTimeout(_refId.current)
      _refTitle.current = null
    }
  }, [])

  useEffect(()=>{
    if ( pageNumber === pageCurrent ) {
      _refId.current = setTimeout(()=>{
        const _titleNode = _refTitle.current;
        if (_titleNode) {
          _titleNode.focus()
        }
      }, FOCUS_FIRST_MLS)
    }
  }, [pageNumber, pageCurrent])

  const _isTitle = title && onClickPrev;

  return (
    <div style={style}>
      { _isTitle && <MenuTitle
          innerRef={_refTitle}
          title={title}
          onClick={onClickPrev.bind(null, pageNumber)}
        />
      }
      <MenuList
        refFirstItem={refFirstItem}
        model={model}
        fOnClickItem={_fOnClickItem}
      />
      <ErrMsg errMsg={errMsg} />
    </div>
  );
}

export default Frame
