//import PropTypes from "prop-types";
import {
  useRef,
  useState,
  getInputValue
} from '../uiApi';

import useValidationMessages from './hooks/useValidationMessages';

import ValidationMessages from '../zhn/ValidationMessages';
import SelectGroupList from './SelectGroupList';
import RowButtons from './RowButtons';

import { getRefFocusLast } from './paneFn';

const ListDeletePane = (props) => {
  const {
    getWatchListsByGroup,
    useMsEdit,
    getWatchGroups,
    forActionType,
    onDelete,
    msgOnNotSelect,
    onClose
  } = props
  , _refSelectGroupList = useRef()
  , [
    validationMessages,
    setValidationMessages,
    _hClear
  ] = useValidationMessages()
  , [
    groupOptions,
    setGroupOptions
  ] = useState(() => getWatchGroups())
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hDelete = () => {
    const {
      captionGroup,
      captionList
    } = getInputValue(_refSelectGroupList) || {};
    if (captionGroup && captionList){
      onDelete({ captionGroup, captionList })
    } else {
      const msg = [];
      if (!captionGroup) { msg.push(msgOnNotSelect('Group')) }
      if (!captionList)  { msg.push(msgOnNotSelect('List'))  }
      setValidationMessages(msg)
    }
  };

  useMsEdit(msEdit => {
    if (msEdit) {
      if (!msEdit.messages) {
        if (msEdit.forActionType === forActionType) {
          _hClear()
        }
        setGroupOptions(getWatchGroups())
      }
    }
  })

  return (
    <div>
       <SelectGroupList
          refEl={_refSelectGroupList}
          getWatchListsByGroup={getWatchListsByGroup}
          groupCaption="In Group:"
          groupOptions={groupOptions}
          listCaption="List:"
       />
       <ValidationMessages
          validationMessages={validationMessages}
       />
       <RowButtons
          refBtClose={getRefFocusLast(props)}
          caption="Delete"
          title="Delete List"
          onPrimary={_hDelete}
          onClear={_hClear}
          onClose={onClose}
       />
    </div>
  );
};

/*
ListDeletePane.propTypes = {
  getWatchGroups: PropTypes.func,
  getWatchListsByGroup: PropTypes.func,
  forActionType: PropTypes.string,
  useMsEdit: PropTypes.func,

  msgOnNotSelect: PropTypes.func,
  onDelete: PropTypes.func,
  onClose: PropTypes.func
}
*/

export default ListDeletePane
