//import PropTypes from "prop-types";
import {
  getRefValue,
  getInputValue
} from '../uiApi';

import useSelectItem from './hooks/useSelectItem';
import useValidationMessages from './hooks/useValidationMessages';
import useGroupOptions from './hooks/useGroupOptions';

import ValidationMessages from '../zhn/ValidationMessages';
import RowInputSelect from './RowInputSelect';
import RowInputText from './RowInputText';
import RowButtons from './RowButtons';

import { getRefFocusLast } from './paneFn';

const ListCreatePane = (props) => {
  const {
    msgOnNotSelect,
    msgOnIsEmptyName,
    onCreate,
    onClose
  } = props
  , [
    validationMessages,
    setValidationMessages,
    _hClear,
    _refInputText
  ] = useValidationMessages()
  , groupOptions = useGroupOptions(
    props,
    setValidationMessages,
    _hClear
  )
  , [
    _refCaptionGroup,
    _hSelectGroup
  ] = useSelectItem()
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hCreate = () => {
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
  };

  return (
    <div>
      <RowInputSelect
         caption="In Group:"
         options={groupOptions}
         onSelect={_hSelectGroup}
      />
      <RowInputText
         refEl={_refInputText}
         caption="List:"
      />
      <ValidationMessages
         validationMessages={validationMessages}
      />
      <RowButtons
         refBtClose={getRefFocusLast(props)}
         caption="Create"
         title="Create New List"
         onPrimary={_hCreate}
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
