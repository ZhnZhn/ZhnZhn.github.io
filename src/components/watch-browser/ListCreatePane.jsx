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

const ListCreatePane = (props) => {
  const {
    onCreate,
    msgOnNotSelect,
    msgOnIsEmptyName,
    useMsEdit,
    getWatchGroups,
    forActionType,
    onClose,
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
    _refCaptionGroup,
    _hSelectGroup
  ] = useSelectItem()
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hCreate = useCallback(() => {
      const captionList = getInputValue(_refInputText)
      , captionGroup = getRefValue(_refCaptionGroup);
      if (captionGroup && captionList) {
        onCreate({ captionGroup, captionList })
      } else {
        const msg = [];
        if (!captionGroup) { msg.push(msgOnNotSelect('In Group')); }
        if (!captionList)  { msg.push(msgOnIsEmptyName('List')); }
        setValidationMessages(msg)
      }
  }, [])
  //onCreate, msgOnNotSelect, msgOnIsEmptyName
  /*eslint-enable react-hooks/exhaustive-deps */
  , _primaryBt = useMemo(() =>(
     <A.Button.Primary
        caption="Create"
        title="Create New List"
        onClick={_hCreate}
     />
  ), [_hCreate]);

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
         caption="In Group:"
         options={groupOptions}
         onSelect={_hSelectGroup}
      />
      <A.RowInputText
         ref={_refInputText}
         caption="List:"
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
ListCreatePane.propTypes = {
  getWatchGroups: PropTypes.func,
  forActionType: PropTypes.string,
  useMsEdit: : PropTypes.func,

  msgOnNotSelect: PropTypes.func,
  msgOnIsEmptyName: PropTypes.func,
  onCreate: PropTypes.func,

  onClose: PropTypes.func
}
*/

export default ListCreatePane
