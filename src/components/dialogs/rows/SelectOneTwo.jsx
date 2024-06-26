import {
  useRef,
  useState,
  useCallback,
  useImperativeHandle,
  getRefValue,
  setRefValue
} from '../../uiApi';

import useLoadOptions  from '../hooks/useLoadOptions';

import RowInputSelect from './RowInputSelect';
import ShowHide from '../../zhn/ShowHide';

const DF_MSG_ON_NOT_SELECRED = item => `${item} is not selected`
, FN_NOOP = () => {}
, _getCaption = item => (item || {}).caption || ''
, _getValue = item => (item || {}).value || ''
, _crItem = (
  item1,
  item2
) => ({
  caption: `${_getCaption(item1)}: ${_getCaption(item2)}`,
  value: _getValue(item1)
    ? `${_getValue(item1)}${_getValue(item2)}`
    : _getValue(item2)
});

const SelectOneTwo = ({
  refEl,
  isShowLabels,
  isShow=true,
  isHideTwo=false,
  isAddTitle,
  oneOptionNames='Items',
  msgOnNotSelected=DF_MSG_ON_NOT_SELECRED,
  uri,
  oneJsonProp="items",
  oneCaption,
  twoCaption,
  propCaption,
  onSelectOne=FN_NOOP,
  onSelect=FN_NOOP
}) => {
    const [
      state,
      loadOptions
    ] = useLoadOptions(
      isShow,
      uri, oneJsonProp
    )
    , {
      isLoading,
      isLoadingFailed,
      options:oneOptions
    } = state
    , [
      twoOptions,
      setTwoOptions
    ] = useState([])
    , _refOne = useRef(null)
    , _refTwo = useRef(null)

    /*eslint-disable react-hooks/exhaustive-deps */
    , _hSelectOne = useCallback(one => {
       setRefValue(_refOne, one)
       setRefValue(_refTwo, null)
       setTwoOptions(one && one.columns || [])
       onSelectOne(one)
    }, [])
    //onSelectOne
    /*eslint-enable react-hooks/exhaustive-deps */

    /*eslint-disable react-hooks/exhaustive-deps */
    , _hSelectTwo = useCallback(item => {
       const _item = isAddTitle && item
         ? _crItem(getRefValue(_refOne), item)
         : item;
       setRefValue(_refTwo, _item)
       onSelect(_item)
    }, []);
    //onSelect, isAddTitle
    /*eslint-enable react-hooks/exhaustive-deps */

    /*eslint-disable react-hooks/exhaustive-deps */
    useImperativeHandle(refEl, ()=>({
      getValidation:() => {
         const msg = [];
         if (!getRefValue(_refOne)){
           msg.push(msgOnNotSelected(oneCaption));
         }
         if (!getRefValue(_refTwo)){
           msg.push(msgOnNotSelected(twoCaption));
         }

         return msg.length>0
           ? { isValid: false, msg }
           : { isValid: true };
      },
      getValues: () => ({
        one: getRefValue(_refOne),
        two: getRefValue(_refTwo)
      })
    }), [])
   //oneCaption, twoCaption
   /*eslint-enable react-hooks/exhaustive-deps */

    return (
      <div>
         <RowInputSelect
           isShowLabels={isShowLabels}
           caption={oneCaption}
           options={oneOptions}
           optionNames={oneOptionNames}
           propCaption={propCaption}
           isLoading={isLoading}
           isLoadingFailed={isLoadingFailed}
           onLoadOption={loadOptions}
           onSelect={_hSelectOne}
         />
         <ShowHide isShow={!isHideTwo}>
           <RowInputSelect
             isShowLabels={isShowLabels}
             caption={twoCaption}
             options={twoOptions}
             propCaption={propCaption}
             onSelect={_hSelectTwo}
           />
         </ShowHide>
      </div>
    );
};

export default SelectOneTwo
