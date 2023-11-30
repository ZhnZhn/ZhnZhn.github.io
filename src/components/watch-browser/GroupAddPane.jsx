//import PropTypes from "prop-types";
import {
  getInputValue,
  clearInputValue
} from '../uiApi';

import useValidationMessages from './hooks/useValidationMessages';

import A from './Atoms';
import { getRefFocusLast } from './paneFn';

const GroupAddPane = (props) => {
  const {
    forActionType,
    useMsEdit,
    msgOnIsEmptyName,
    onCreate,
    onClose
  } = props
  , [
    validationMessages,
    setValidationMessages,
    clearInput,
    refInput
  ] = useValidationMessages()
  , _hCreate = () => {
     const caption = getInputValue(refInput);
     if (caption){
       onCreate({ caption })
     } else {
       clearInputValue(refInput)
       setValidationMessages([msgOnIsEmptyName('Group')])
     }
  };

  useMsEdit(msEdit => {
    if (msEdit) {
      if (msEdit.forActionType === forActionType){
        if (msEdit.messages) {
          setValidationMessages(msEdit.messages)
        } else {
          clearInput()
        }
      }
    }
  })

  return (
    <div>
      <A.RowInputText
         ref={refInput}
         caption="Group:"
      />
      <A.ValidationMessages
         validationMessages={validationMessages}
       />
       <A.RowButtons
          refBtClose={getRefFocusLast(props)}
          caption="Create"
          title="Create New Group"
          onPrimary={_hCreate}
          onClear={clearInput}
          onClose={onClose}
       />
    </div>
  );
}

/*
GroupAddPane.propTypes = {
  forActionType: PropTypes.string,
  useMsEdit: PropTypes.func,

  msgOnIsEmptyName: PropTypes.func,
  onCreate: PropTypes.func,
  onClose: PropTypes.func
}
*/

export default GroupAddPane
