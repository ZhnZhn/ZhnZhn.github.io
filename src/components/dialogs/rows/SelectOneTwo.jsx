
import { useState, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import useLoadOptions  from '../hooks/useLoadOptions'

import RowInputSelect from './RowInputSelect';
import ShowHide from '../../zhn/ShowHide'

const DF_MSG_ON_NOT_SELECRED = item => `${item} is not selected`;
const NOOP = () => {};

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
  onSelectOne=NOOP
}, ref) => {
    const [state, loadOptions] = useLoadOptions(isShow, uri, oneJsonProp)
    , { isLoading, isLoadingFailed, options:oneOptions } = state
    , [twoOptions, setTwoOptions] = useState([])
    , _refOne = useRef(null)
    , _refTwo = useRef(null)
    /*eslint-disable react-hooks/exhaustive-deps */
    , _hSelectOne = useCallback(one => {
       _refOne.current = one;
       _refTwo.current = null
       setTwoOptions(one && one.columns || [])
       onSelectOne(one)
    }, [])
    //onSelectOne
    /*eslint-enable react-hooks/exhaustive-deps */
    , _hSelectTwo = useCallback(item => {
       _refTwo.current = item
    }, [])

    /*eslint-disable react-hooks/exhaustive-deps */
    useImperativeHandle(ref, ()=>({
      getValidation:() => {
         const msg = [];
         if (!_refOne.current){
           msg.push(msgOnNotSelected(oneCaption));
         }
         if (!_refTwo.current){
           msg.push(msgOnNotSelected(twoCaption));
         }

         if (msg.length>0){
           return { isValid: false, msg };
         }
         return { isValid: true };
      },
      getValues: () => ({
        one: _refOne.current,
        two: _refTwo.current
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
