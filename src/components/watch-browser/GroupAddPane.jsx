//import PropTypes from "prop-types";
import {
  useRef,
  useState,
  getInputValue
} from '../uiApi';
import useListen from '../hooks/useListen';

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
    actionCompleted,
    actionFailed,
    forActionType,
    onCreate,
    msgOnIsEmptyName,
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

  useListen((actionType, data) => {
    if (actionType === actionCompleted && data.forActionType === forActionType){
       _hClear()
    } else if (actionType === actionFailed && data.forActionType === forActionType){
       setState(data.messages)
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
  store: PropTypes.shape({
    listen: PropTypes.func
  }),
  actionCompleted: PropTypes.string,
  actionFailed: PropTypes.string,
  forActionType: PropTypes.string,
  msgOnIsEmptyName: PropTypes.func,
  onCreate: PropTypes.func,
  onClose: PropTypes.func
}
*/

export default GroupAddPane
