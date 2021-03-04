//import PropTypes from "prop-types";
import { useState, useRef, useCallback, useMemo } from 'react';
import useListen from '../hooks/useListen'

import A from './Atoms'

const ListDeletePane = ({
  store,
  actionCompleted, forActionType,
  onDelete, msgOnNotSelect,
  onClose
}) => {
  const [groupOptions, setGroupOptions] = useState(()=>store.getWatchGroups())
  , [validationMessages, setValidationMessages] = useState([])
  , _refSelectGroupList = useRef()
  , _hClear = useCallback(()=>setValidationMessages([]), [])
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hDelete = useCallback(()=>{
    const { captionGroup, captionList } = _refSelectGroupList.current.getValue();
    if (captionGroup && captionList){
      onDelete({ captionGroup, captionList })
    } else {
      const msg = [];
      if (!captionGroup) { msg.push(msgOnNotSelect('Group')) }
      if (!captionList)  { msg.push(msgOnNotSelect('List'))  }
      setValidationMessages(msg)
    }
  }, [])
  //onDelete. msgOnNotSelect
  /*eslint-enable react-hooks/exhaustive-deps */
  , _primaryBt = useMemo(()=>(
     <A.Button.Primary
       caption="Delete"
       title="Delete List"
       onClick={_hDelete}
     />
  ), [_hDelete]);


  useListen(store, (actionType, data)=>{
    if (actionType === actionCompleted){
      if (data.forActionType === forActionType) {
        _hClear()
      }
      setGroupOptions(store.getWatchGroups())
    }
  })

  return (
    <div>
       <A.SelectGroupList
         ref={_refSelectGroupList}
         store={store}
         groupCaption="In Group:"
         groupOptions={groupOptions}
         listCaption="List:"
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
ListDeletePane.propTypes = {
  store: PropTypes.shape({
    listen: PropTypes.func,
    getWatchGroups: PropTypes.func
  }),
  actionCompleted: PropTypes.string,
  forActionType: PropTypes.string,
  msgOnNotSelect: PropTypes.func,
  onDelete: PropTypes.func,
  onClose: PropTypes.func
}
*/

export default ListDeletePane
