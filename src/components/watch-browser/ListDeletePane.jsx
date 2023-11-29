//import PropTypes from "prop-types";
import {
  useRef,
  useState,
  useCallback,
  useMemo,
  getInputValue
} from '../uiApi';

import A from './Atoms';
import { getRefFocusLast } from './paneFn';

const ListDeletePane = (props) => {
  const {
    getWatchListsByGroup,
    useMsEdit,
    getWatchGroups,
    forActionType,
    onDelete,
    msgOnNotSelect,
    onClose
  } = props
  , [
    groupOptions,
    setGroupOptions
  ] = useState(() => getWatchGroups())
  , [
    validationMessages,
    setValidationMessages
  ] = useState([])
  , _refSelectGroupList = useRef()
  , _hClear = useCallback(
    () => setValidationMessages([]),
    []
  )
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hDelete = useCallback(()=>{
    const {
      captionGroup,
      captionList
    } = getInputValue(_refSelectGroupList) || {};
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

  useMsEdit(msEdit => {
    if (msEdit) {
      if (!msEdit.messages) {
        if (msEdit.forActionType === forActionType) {
          _hClear()
        }
        setGroupOptions(getWatchGroups())
      }
    }
  })

  return (
    <div>
       <A.SelectGroupList
         ref={_refSelectGroupList}
         getWatchListsByGroup={getWatchListsByGroup}
         groupCaption="In Group:"
         groupOptions={groupOptions}
         listCaption="List:"
       />
       <A.ValidationMessages
          validationMessages={validationMessages}
       />
       <A.RowButtons
         refBtClose={getRefFocusLast(props)}
         Primary={_primaryBt}
         onClear={_hClear}
         onClose={onClose}
       />
    </div>
  );
};

/*
ListDeletePane.propTypes = {
  getWatchGroups: PropTypes.func,
  getWatchListsByGroup: PropTypes.func,
  forActionType: PropTypes.string,
  useMsEdit: PropTypes.func,

  msgOnNotSelect: PropTypes.func,
  onDelete: PropTypes.func,
  onClose: PropTypes.func
}
*/

export default ListDeletePane
