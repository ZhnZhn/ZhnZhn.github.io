//import PropTypes from "prop-types";
import {
  useRef,
  useReducer,
  setRefValue,
  getRefValue
} from '../uiApi';

import WatchPane from './WatchPane';
import RowInputSelect from './RowInputSelect';

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

const useGroupsReducer = (
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
  ] = useGroupsReducer(
    getWatchGroups,
    msgOnNotSelect
  )
  , _hDeleteGroup = () => {
     const caption = getRefValue(_refCaption);
     if (caption){
       onDelete({ caption })
       setRefValue(_refCaption, null)
     } else {
       setErrs()
     }
  }
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
    <WatchPane
      validationMessages={errs}
      refBtClose={getRefFocusLast(props)}
      caption="Delete"
      title="Delete Group"
      onPrimary={_hDeleteGroup}
      withoutClear={true}
      onClose={onClose}
    >
      <RowInputSelect
        caption="Group"
        options={groups}
        onSelect={_hSelectGroup}
      />
   </WatchPane>
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
