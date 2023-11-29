//import PropTypes from "prop-types";
import {
  useState,
  useCallback,
  useMemo,
  getRefValue,
  getInputValue
} from '../uiApi';

import useSelectItem from './hooks/useSelectItem';
import useInputText from './hooks/useInputText';

import A from './Atoms';
import { getRefFocusLast } from './paneFn';

const GroupEditPane = (props) => {
  const {
    forActionType,
    onRename,
    msgOnNotSelect,
    msgOnIsEmptyName,
    useMsEdit,
    getWatchGroups,
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
  , [
    _refInputText,
    _hClear
  ] = useInputText(setValidationMessages)
  , [
    _refCaptionFrom,
    _hSelectGroup
  ] = useSelectItem()
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hRename = useCallback(()=>{
    const captionTo = getInputValue(_refInputText)
    , captionFrom = getRefValue(_refCaptionFrom);
    if (captionTo && captionFrom) {
      onRename({ captionFrom, captionTo })
    } else {
      const msg = [];
      if (!captionFrom){
        msg.push(msgOnNotSelect('Group From'))
      }
      if (!captionTo){
        msg.push(msgOnIsEmptyName('Group To'))
      }
      setValidationMessages(msg)
    }
  }, [])
  //onRename, msgOnNotSelect, msgOnIsEmptyName
  /*eslint-enable react-hooks/exhaustive-deps */
  , _primaryBt = useMemo(()=>(
    <A.Button.Primary
       caption="Edit"
       title="Edit Group Name"
       onClick={_hRename}
    />
  ), [_hRename]);

  useMsEdit(msEdit => {
    if (msEdit) {
      if (msEdit.forActionType === forActionType) {
        if (msEdit.messages) {
          setValidationMessages(msEdit.messages)
        } else {
          _hClear()
          setGroupOptions(getWatchGroups())
        }
      } else {
        setGroupOptions(getWatchGroups())
      }
    }
  })

  return (
    <div>
       <A.RowInputSelect
          caption="Group From:"
          options={groupOptions}
          onSelect={_hSelectGroup}
       />
      <A.RowInputText
         ref={_refInputText}
         caption="Group To:"
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
GroupEditPane.propTypes = {
  getWatchGroups: PropTypes.func,
  forActionType: PropTypes.string,
  useMsEdit: PropTypes.func,

  msgOnIsEmptyName: PropTypes.func,
  msgOnNotSelect: PropTypes.func,
  onRename: PropTypes.func,

  onClose: PropTypes.func
}
*/

export default GroupEditPane
