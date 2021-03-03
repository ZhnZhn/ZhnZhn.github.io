import { useRef, useState, useCallback, useMemo } from 'react';
//import PropTypes from "prop-types";
import useListen from '../hooks/useListen'

import A from './Atoms'

const GroupEditPane = ({
  store,
  actionCompleted, actionFailed, forActionType,
  onRename, msgOnNotSelect, msgOnIsEmptyName,
  onClose
}) => {
  const _refInputText = useRef()
  , _refCaptionFrom = useRef()
  , [groupOptions, setGroupOptions] = useState(() => store.getWatchGroups())
  , [validationMessages, setValidationMessages] = useState([])
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hRename = useCallback(()=>{
    const captionTo = _refInputText.current.getValue()
    , captionFrom = _refCaptionFrom.current;
    if (captionTo && captionFrom) {
      onRename({ captionFrom, captionTo })
    } else {
      const msg = [];
      if (!captionFrom){
        msg.push(msgOnNotSelect('Group From'))
      }
      if (!captionTo){
        msg.push(msgOnIsEmptyName('Group To'))
      }
      setValidationMessages(msg)
    }
  }, [])
  //onRename, msgOnNotSelect, msgOnIsEmptyName
  /*eslint-enable react-hooks/exhaustive-deps */
  , _primaryBt = useMemo(()=>(
    <A.Button.Primary
       caption="Edit"
       title="Edit Group Name"
       onClick={_hRename}
    />
  ), [_hRename])
  , _hSelectGroup = useCallback(item => {
    const { caption } = item || {};
    _refCaptionFrom.current = caption
  }, [])
  , _hClear = useCallback(() => {
    _refInputText.current.setValue('')
    setValidationMessages([])
  }, []);

  useListen(store, (actionType, data)=>{
    if (actionType === actionCompleted){
      if (data.forActionType === forActionType){
        _hClear()
      }
      setGroupOptions(store.getWatchGroups())
    } else if (actionType === actionFailed && data.forActionType === forActionType){
      setValidationMessages(data.messages)
    }
  })

  return (
    <div>
       <A.RowInputSelect
          caption="Group From:"
          options={groupOptions}
          onSelect={_hSelectGroup}
       />
      <A.RowInputText
         ref={_refInputText}
         caption="Group To:"
      />
      <A.ValidationMessages
         validationMessages={validationMessages}
      />
      <A.RowButtons
         Primary={_primaryBt}
         onClear={_hClear}
         onClose={onClose}
      />
    </div>
  );
};

/*
GroupEditPane.propTypes = {
  store: PropTypes.shape({
    listen: PropTypes.func,
    getWatchGroups: PropTypes.func
  }),
  actionCompleted: PropTypes.string,
  actionFailed: PropTypes.string,
  forActionType: PropTypes.string,

  msgOnIsEmptyName: PropTypes.func,
  msgOnNotSelect: PropTypes.func,
  onRename: PropTypes.func,

  onClose: PropTypes.func
}
*/

export default GroupEditPane
