//import PropTypes from "prop-types";
import {
  useRef,
  useState,
  useCallback,
  useImperativeHandle,
  useEffect,
  setRefValue,
  getRefValue
} from '../uiApi';

import useProperty from '../hooks/useProperty';
import useSelectItem from './hooks/useSelectItem';

import RowInputSelect from './RowInputSelect';

const SelectGroupList = (props) => {
  const [
    _setPrevProps,
    _getPrevProps
  ] = useProperty(props)
  , {
    refEl,
    getWatchListsByGroup,
    groupCaption,
    groupOptions,
    listCaption
  } = props
  , _refGroupCaption = useRef()
  , [
    _refListCaption,
    _hSelectList
  ] = useSelectItem()
  , [
    listOptions,
    setListOptions
  ] = useState([])
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hSelectGroup = useCallback(item => {
      const { caption } = item || {}
      if (item && caption){
        setRefValue(_refGroupCaption, caption)
        setRefValue(_refListCaption, null)
        setListOptions(item.lists || [])
      } else {
        setRefValue(_refGroupCaption, null)
      }
  }, [])
  //_refListCaption
  /*eslint-enable react-hooks/exhaustive-deps */


  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(()=>{
    const _prevProps = _getPrevProps();
    if (_prevProps !== props) {
     if (_prevProps.groupOptions !== groupOptions) {
       setRefValue(_refGroupCaption, null)
       setRefValue(_refListCaption, null)
       setListOptions([])
     } else if (getRefValue(_refGroupCaption)) {
       const _listOptions = getWatchListsByGroup(_refGroupCaption.current);
       if (_listOptions !== listOptions) {
         setRefValue(_refListCaption, null)
         setListOptions(_listOptions)
       }
     }
     _setPrevProps(props)
    }
  }, [props])
  //_getPrevProps, _setPrevProps, _refListCaption
  //groupOptions, listCaption, getWatchListsByGroup
  /*eslint-enable react-hooks/exhaustive-deps */

  useImperativeHandle(refEl, ()=>({
    getValue: () => ({
      captionGroup: getRefValue(_refGroupCaption),
      captionList: getRefValue(_refListCaption)
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
}

/*
SelectGroupList.propTypes = {
  refEl: PropTypes.ref
  getWatchListsByGroup: PropTypes.func
  groupCaption: PropTypes.string,
  groupOptions: PropTypes.array,
  listCaption: PropTypes.string
}
*/

export default SelectGroupList
