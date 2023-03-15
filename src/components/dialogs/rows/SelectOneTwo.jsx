import {
  forwardRef,
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

const DF_MSG_ON_NOT_SELECRED = item => `${item} is not selected`;
const FN_NOOP = () => {};

const SelectOneTwo = forwardRef(({
  isShowLabels,
  isShow=true,
  isHideTwo=false,
  oneOptionNames='Items',
  msgOnNotSelected=DF_MSG_ON_NOT_SELECRED,
  uri,
  oneJsonProp="items",
  oneCaption,
  twoCaption,
  onSelectOne=FN_NOOP
}, ref) => {
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

    , _hSelectTwo = useCallback(item => {
       setRefValue(_refTwo, item)
    }, []);

    /*eslint-disable react-hooks/exhaustive-deps */
    useImperativeHandle(ref, ()=>({
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
             onSelect={_hSelectTwo}
           />
         </ShowHide>
      </div>
    );
})

export default SelectOneTwo
