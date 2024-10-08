//import PropTypes from "prop-types";
import {
  getInputValue,
  clearInputValue
} from '../uiApi';

import useValidationMessages from './hooks/useValidationMessages';

import WatchPane from './WatchPane';
import RowInputText from './RowInputText';

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
    <WatchPane
      validationMessages={validationMessages}
      refBtClose={getRefFocusLast(props)}
      caption="Create"
      title="Create New Group"
      onPrimary={_hCreate}
      onClear={clearInput}
      onClose={onClose}
    >
      <RowInputText
        refEl={refInput}
        caption="Group"
      />
    </WatchPane>
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
