//import PropTypes from "prop-types";
import {
  useRef,
  useState,
  getInputValue
} from '../uiApi';

import A from './Atoms';
import { getRefFocusLast } from './paneFn'

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
  , _refInput = useRef()
  , [
    validationMessages,
    setState
  ] = useState([])
  , _primaryBt = _usePrimaryBt(
     _refInput,
     setState,
     onCreate,
     msgOnIsEmptyName
  )
  , _hClear = () => {
      _refInput.current.setValue('')
      setState([])
  };

  useMsEdit(msEdit => {
    if (msEdit) {
      if (msEdit.forActionType === forActionType){
        if (msEdit.messages) {
          setState(msEdit.messages)
        } else {
         _hClear()
        }
      }
    }
  })

  return (
    <div>
      <A.RowInputText
         ref={_refInput}
         caption="Group:"
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
