//import PropTypes from "prop-types";
import { useRef, useState, useCallback, useImperativeHandle, useEffect, forwardRef } from 'react';
import useProperty from '../hooks/useProperty'
import useSelectItem from './hooks/useSelectItem'

import RowInputSelect from './RowInputSelect';

const SelectGroupList = forwardRef((props, ref) => {
  const [_setPrevProps, _getPrevProps] = useProperty(props)
  , {
    store,
    groupCaption, groupOptions,
    listCaption
  } = props
  , _refGroupCaption = useRef()
  , [_refListCaption, _hSelectList] = useSelectItem()
  , [listOptions, setListOptions] = useState([])
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hSelectGroup = useCallback(item => {
      const { caption } = item || {}
      if (item && caption){
        _refGroupCaption.current = caption;
        _refListCaption.current = null
        setListOptions(item.lists || [])
      } else {
        _refGroupCaption.current = null
      }
  }, [])
  //_refListCaption
  /*eslint-enable react-hooks/exhaustive-deps */


  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(()=>{
    const _prevProps = _getPrevProps();
    if (_prevProps !== props) {
     if (_prevProps.groupOptions !== groupOptions) {
       _refGroupCaption.current = null
       _refListCaption.current = null
       setListOptions([])
     } else if (_refGroupCaption.current) {
       const _listOptions = store.getWatchListsByGroup(_refGroupCaption.current);
       if (_listOptions !== listOptions) {
         _refListCaption.current = null
         setListOptions(_listOptions)
       }
     }
     _setPrevProps(props)
    }
  }, [props])
  //_getPrevProps, _setPrevProps, _refListCaption
  //groupOptions, listCaption, store
  /*eslint-enable react-hooks/exhaustive-deps */

  useImperativeHandle(ref, ()=>({
    getValue: () => ({
      captionGroup: _refGroupCaption.current,
      captionList: _refListCaption.current
    })
  }))

  return (
    <div>
       <RowInputSelect
         caption={groupCaption}
         options={groupOptions}
         onSelect={_hSelectGroup}
       />
       <RowInputSelect
         caption={listCaption}
         options={listOptions}
         onSelect={_hSelectList}
       />
    </div>
  );
})

/*
SelectGroupList.propTypes = {
  store: PropTypes.shape({
    listen: PropTypes.func,
    getWatchListsByGroup: PropTypes.func
  }),
  groupCaption: PropTypes.string,
  groupOptions: PropTypes.array,
  listCaption: PropTypes.string
}
*/

export default SelectGroupList
