//import PropTypes from "prop-types";
import {
  useMemo,
  getRefValue,
  getInputValue
} from '../uiApi';

import useSelectItem from './hooks/useSelectItem';
import useValidationMessages from './hooks/useValidationMessages';
import useGroupOptions from './hooks/useGroupOptions';

import A from './Atoms';
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
  , _hCreate = useMemo(() => () => {
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
