//import PropTypes from "prop-types";
import { getInputValue } from '../uiApi';

import useValidationMessages from './hooks/useValidationMessages';

import A from './Atoms';
import { getRefFocusLast } from './paneFn';

const _usePrimaryBt = (
  refInput,
  setState,
  onCreate,
  msgOnIsEmptyName
) => {
  const _hCreate = () => {
     const caption = getInputValue(refInput);
     if (caption){
       onCreate({ caption })
     } else {
       refInput.current.setValue('')
       setState([msgOnIsEmptyName('Group')])
     }
  };
  return (
    <A.Button.Primary
       caption="Create"
       title="Create New Group"
       onClick={_hCreate}
    />);
}

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
  , _primaryBt = _usePrimaryBt(
     refInput,
     setValidationMessages,
     onCreate,
     msgOnIsEmptyName
  );

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
          Primary={_primaryBt}
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
