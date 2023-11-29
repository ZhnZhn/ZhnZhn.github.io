//import PropTypes from "prop-types";
import {
  useRef,
  useReducer,
  setRefValue,
  getRefValue
} from '../uiApi';

import A from './Atoms';
import { getRefFocusLast } from './paneFn';

const UPDATE = 'a'
, VALIDATION_ERR = 'b'
, _initState = getWatchGroups => ({
  groups: getWatchGroups(),
  errs: []
})
, _crAction = (
  type,
  payload
) => ({
  type,
  payload
});

const _reducer = (
  state,
  {type, payload}
) => {
  switch(type){
    case UPDATE: return {
      groups: payload,
      errs: []
    };
    case VALIDATION_ERR: return {
      ...state,
      errs: payload
    };
    default: return state;
  }
}

const _useReducer = (
  getWatchGroups,
  msgOnNotSelect
) => {
  const [
    {groups, errs},
    dispatch
  ] = useReducer(
    _reducer,
    getWatchGroups,
    _initState
  )
  return [
    groups,
    errs,
    groups => dispatch(_crAction(UPDATE, groups)),
    () => dispatch(_crAction(VALIDATION_ERR, [msgOnNotSelect('Group')]))
 ];
}

const _usePrimaryBt = (
  refCaption,
  onDelete,
  setErrs
) => {
  const _hDeleteGroup = () => {
     const caption = getRefValue(refCaption);
     if (caption){
       onDelete({ caption })
       setRefValue(refCaption, null)
     } else {
       setErrs()
     }
  };
  return (
    <A.Button.Primary
     caption="Delete"
     title="Delete Group"
     onClick={_hDeleteGroup}
  />);
}

const GroupDeletePane = (props) => {
  const {
    onDelete,
    msgOnNotSelect,
    useMsEdit,
    getWatchGroups,
    onClose
  } = props
  , _refCaption = useRef(null)
  , [
    groups,
    errs,
    updateGroups,
    setErrs
  ] = _useReducer(
    getWatchGroups,
    msgOnNotSelect
  )
  , _primaryBt = _usePrimaryBt(
    _refCaption,
    onDelete,
    setErrs
  )
  , _hSelectGroup = item => {
     setRefValue(
       _refCaption,
       (item && item.caption) || null
     )
  };

  useMsEdit(msEdit => {
    if (msEdit && !msEdit.messages) {
      updateGroups(getWatchGroups())
    }
  })

  return (
    <div>
      <A.RowInputSelect
        caption="Group:"
        options={groups}
        onSelect={_hSelectGroup}
      />
      <A.ValidationMessages
        validationMessages={errs}
      />
      <A.RowButtons
        refBtClose={getRefFocusLast(props)}
        Primary={_primaryBt}
        withoutClear={true}
        onClose={onClose}
      />
   </div>
  );
}

/*
GroupDeletePane.propTypes = {
  getWatchGroups: PropTypes.func,
  forActionType: PropTypes.string,
  useMsEdit: PropTypes.func,

  msgOnNotSelect: PropTypes.func,
  onDelete: PropTypes.func,
  onClose: PropTypes.func
}
*/

export default GroupDeletePane
