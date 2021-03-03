import { useState, useCallback, useMemo } from 'react';
import useListen from '../hooks/useListen'
import useSelectItem from './hooks/useSelectItem'
import useInputText from './hooks/useInputText'
//import PropTypes from "prop-types";

import A from './Atoms'

const ListCreatePane = ({
  store,
  onCreate, msgOnNotSelect, msgOnIsEmptyName,
  actionCompleted, actionFailed, forActionType,
  onClose
}) => {
  const [groupOptions, setGroupOptions] = useState(()=>store.getWatchGroups())
  , [validationMessages, setValidationMessages] = useState([])
  , [_refInputText, _hClear] = useInputText(setValidationMessages)
  , [_refCaptionGroup, _hSelectGroup] = useSelectItem()
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hCreate = useCallback(() => {
      const captionList = _refInputText.current.getValue()
      , captionGroup = _refCaptionGroup.current;
      if (captionGroup && captionList){
        onCreate({ captionGroup, captionList })
      } else {
        const msg = [];
        if (!captionGroup) { msg.push(msgOnNotSelect('In Group')); }
        if (!captionList)  { msg.push(msgOnIsEmptyName('List')); }
        setValidationMessages(msg)
      }
  }, [])
  //onCreate, msgOnNotSelect, msgOnIsEmptyName
  /*eslint-enable react-hooks/exhaustive-deps */
  , _primaryBt = useMemo(() =>(
     <A.Button.Primary
        caption="Create"
        title="Create New List"
        onClick={_hCreate}
     />
  ), [_hCreate]);


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
         caption="In Group:"
         options={groupOptions}
         onSelect={_hSelectGroup}
      />
      <A.RowInputText
         ref={_refInputText}
         caption="List:"
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
}

/*
ListCreatePane.propTypes = {
  store: PropTypes.shape({
    listen: PropTypes.func,
    getWatchGroups: PropTypes.func
  }),
  actionCompleted: PropTypes.string,
  actionFailed: PropTypes.string,
  forActionType: PropTypes.string,

  msgOnNotSelect: PropTypes.func,
  msgOnIsEmptyName: PropTypes.func,
  onCreate: PropTypes.func,

  onClose: PropTypes.func
}
*/

export default ListCreatePane
