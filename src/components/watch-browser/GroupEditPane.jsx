//import PropTypes from "prop-types";
import {
  getRefValue,
  getInputValue
} from '../uiApi';

import useSelectItem from './hooks/useSelectItem';
import useValidationMessages from './hooks/useValidationMessages';
import useGroupOptions from './hooks/useGroupOptions';

import WatchPane from './WatchPane';
import RowInputSelect from './RowInputSelect';
import RowInputText from './RowInputText';

import { getRefFocusLast } from './paneFn';

const GroupEditPane = (props) => {
  const {
    msgOnNotSelect,
    msgOnIsEmptyName,
    onRename,
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
    _refCaptionFrom,
    _hSelectGroup
  ] = useSelectItem()
  , _hRename = () => {
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
  };

  return (
    <WatchPane
      validationMessages={validationMessages}
      refBtClose={getRefFocusLast(props)}
      caption="Edit"
      title="Edit Group Name"
      onPrimary={_hRename}
      onClear={_hClear}
      onClose={onClose}
    >
       <RowInputSelect
          caption="Group From"
          options={groupOptions}
          onSelect={_hSelectGroup}
       />
       <RowInputText
         refEl={_refInputText}
         caption="Group To"
       />
    </WatchPane>
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
