//import PropTypes from "prop-types";
import {
  useRef,
  useReducer,
  setRefValue,
  getRefValue
} from '../uiApi';
import useListen from '../hooks/useListen';

import A from './Atoms'

const UPDATE = 'a'
, VALIDATION_ERR = 'b'
, _initState = store => ({
  groups: store.getWatchGroups,
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
  store,
  msgOnNotSelect
) => {
  const [
    {groups, errs},
    dispatch
  ] = useReducer(
    _reducer,
    store,
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

const GroupDeletePane = ({
  store,
  actionCompleted,
  forActionType,
  onDelete,
  msgOnNotSelect,
  onClose
}) => {
  const _refCaption = useRef(null)
  , [
    groups,
    errs,
    updateGroups,
    setErrs
  ] = _useReducer(
    store,
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

  useListen((actionType, data) => {
    if (actionType === actionCompleted) {
      updateGroups(store.getWatchGroups())
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
        Primary={_primaryBt}
        withoutClear={true}
        onClose={onClose}
      />
   </div>
  );
}

/*
GroupDeletePane.propTypes = {
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

export default GroupDeletePane
