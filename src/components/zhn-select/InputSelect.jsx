import {
  forwardRef,

  useRef,
  useState,
  useCallback,
  useEffect,
  useImperativeHandle,

  setRefValue,
  getRefValue,
  focusRefElement
} from '../uiApi';

import { HAS_TOUCH_EVENTS } from '../has';

import {
  S_NONE,
  S_BLOCK
} from '../styleFn';

import crAfterInputEl from './crAfterInputEl';
import {
  NO_RESULT,
  crWidthStyle,

  crValue,
  crInitialStateFromProps,
  crFilterOptions,

  makeVisible,
  decorateCurrentComp,
  undecorateComp,

  stepDownOption,
  stepUpOption
} from './InputSelectFn';
import ItemOptionDf from './ItemOptionDf';
import OptionsView from './OptionsView';

import {
  CL_ROOT,
  CL_INPUT,
  CL_INPUT_HR
} from './CL';

const FN_NOOP = () => {};

const InputSelect = forwardRef(({
  propCaption='caption',
  ItemOptionComp=ItemOptionDf,
  options: propsOptions,
  optionName='',
  isWithInput=false,
  maxInput=10,
  regInput=/[A-Za-z0-9()^ ]/,

  style,
  width,

  optionsStyle,
  noFooterBts,

  isLoading,
  isLoadingFailed,
  placeholder,
  optionNames,

  onSelect=FN_NOOP,
  onLoadOption=FN_NOOP
}, ref) => {
  const _refInput = useRef()
  , _refIndexActive = useRef()

  , _refHmItems = useRef()
  , _refOptionsComp = useRef()
  , _refIndexNode = useRef()

  , _refBlurId = useRef()

  , _refOptionNode = useCallback((n, index) => {
    const _hmItems = getRefValue(_refHmItems);
    if (_hmItems) {
      _hmItems[`v${index}`] = n
    }
  }, [])

  , [
    state,
    setState
  ] = useState(() => crInitialStateFromProps(
    propCaption,
    propsOptions
  ))
  , {
    value,
    options,
    initialOptions,

    isShowOption,
    isFocused,
    nAll
  } = state

  , _initProperties = () => {
    setRefValue(_refIndexActive, 0)
    setRefValue(_refHmItems, Object.create(null))
  }

  , _getCurrentComp = useCallback(
    () => getRefValue(_refHmItems)[`v${getRefValue(_refIndexActive)}`]
  , [])

  /*eslint-disable react-hooks/exhaustive-deps */
  , _decorateCurrentComp = useCallback(() => {
    decorateCurrentComp(
      _getCurrentComp(),
      getRefValue(_refIndexNode),
      getRefValue(_refIndexActive)
    )
  }, [])
  // _getCurrentComp
  /*eslint-enable react-hooks/exhaustive-deps */

  , _hInputChange = (event) => {
    const token = event.target.value
    , tokenLn = token.length
    , valueLn = value.length;

    if ( isWithInput
         && tokenLn>0
         && !regInput.test(token[tokenLn-1])) {
      return;
    }

    if (tokenLn !== valueLn){
      undecorateComp(_getCurrentComp())
      setRefValue(_refIndexActive, 0)
      _decorateCurrentComp()
      const _options = tokenLn > valueLn
        ? options
        : initialOptions;
      setState(prevState => ({
        ...prevState,
        value: token,
        isShowOption: true,
        options: crFilterOptions(
          _options,
          token, {
          propCaption,
          isWithInput,
          maxInput
        })
      }))
    }
  }

  /*eslint-disable react-hooks/exhaustive-deps */
 , _selectItem = useCallback(item => {
   if (!item) {
     onSelect()
   } else if (item.value !== NO_RESULT) {
     const _item = {...item};
     delete _item._c
     onSelect(_item)
   } else if (!isWithInput) {
     onSelect()
   } else {
     const _value = item.inputValue.trim();
     if (!_value) {
       onSelect()
     } else {
       onSelect({
        caption: _value,
        value: _value,
        isInput: true
      })
     }
   }
 }, [])
 // isWithInput, onSelect
 /*eslint-unable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */
  , _clearInput = useCallback(() => {
    undecorateComp(_getCurrentComp())
    setRefValue(_refIndexActive, 0)
    _selectItem()
    setState(prevState => ({
      ...prevState,
      options: prevState.initialOptions,
      isShowOption: false,
      value: ''
    }))
  }, [])
  // _getCurrentComp, _selectItem
  /*eslint-enable react-hooks/exhaustive-deps */

  , _hInputKeyDown = (event) => {
    switch(event.keyCode){
      // enter
      case 13:{
         const item = options[getRefValue(_refIndexActive)] || {}
         , _value = item[propCaption];

         if (_value){
           setState(prevState => ({
             ...prevState,
             value: crValue(_value),
             isShowOption: false,
           }));
           _selectItem(item)
         }
      break; }
      //escape, delete
      case 27: case 46: {
        event.preventDefault()
        if (isShowOption){
          setState(prevState => ({
            ...prevState,
            isShowOption: false
          }));
        } else {
          _clearInput()
        }
      break;}
      case 40: //down
        if (!isShowOption){
          setState(prevState => ({
            ...prevState,
            isShowOption: true
          }))
        } else {
          event.preventDefault()
          stepDownOption(
            _getCurrentComp,
            _refIndexActive,
            options.length,
            getRefValue(_refIndexNode),
            getRefValue(_refOptionsComp)
          )
        }
        break;
      case 38: //up
        if (isShowOption){
          event.preventDefault()
          stepUpOption(
            _getCurrentComp,
            _refIndexActive,
            options.length,
            getRefValue(_refIndexNode),
            getRefValue(_refOptionsComp)
          )
        }
        break;
      default: return;
    }
  }

  , _hToggleOptions = () => {
    setState(prevState => ({
      ...prevState,
      isShowOption: !prevState.isShowOption
    }))
  }

  /*eslint-disable react-hooks/exhaustive-deps */
  , _hClickItem = useCallback((item, index, propCaption) => {
    undecorateComp(_getCurrentComp())
    setRefValue(_refIndexActive, index)
    setState(prevState => ({
      ...prevState,
      value: crValue(item[propCaption]),
      isShowOption: false
    }));
    _selectItem(item)
  }, [_selectItem])
  // _getCurrentComp
  /*eslint-unable react-hooks/exhaustive-deps */

  , _focusInput = useCallback(() => {
    focusRefElement(_refInput)
  }, [])

  , _hClear = useCallback(() => {
    _clearInput()
    _focusInput()
  }, [])

  , _hFocus = useCallback(() => {
    clearTimeout(getRefValue(_refBlurId))
    setState(prevState => ({
      ...prevState,
      isFocused: true
    }))
  }, [])
  , _hBlur = useCallback(() => {
    setRefValue(_refBlurId, setTimeout(
      () => setState(prevState => ({
        ...prevState,
        isFocused: false
      })),
      800
    ))
  }, [])
  , _refTouchHandlers = useRef(HAS_TOUCH_EVENTS
    ? {
        onFocus: _hFocus,
        onBlur: _hBlur
      }
    : void 0
  )

  useImperativeHandle(ref, () => ({
    clearInput: _clearInput,
    focusInput: _focusInput
  }))

  useEffect(() => {
    _initProperties()
    return () => {
      clearTimeout(getRefValue(_refBlurId))
    }
  }, [])

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    _initProperties()
    setState(crInitialStateFromProps(
      propCaption,
      propsOptions
    ))
  }, [propsOptions])
  //propCaption
  /*eslint-unable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (isShowOption){
      const comp = _getCurrentComp()
      , _indexActive = getRefValue(_refIndexActive);
      _decorateCurrentComp()
      makeVisible(
        comp,
        _indexActive,
        getRefValue(_refOptionsComp)
      )
    }
  }, [isShowOption])
  // _getCurrentComp
  /*eslint-unable react-hooks/exhaustive-deps */


  const _rootWidthStyle = crWidthStyle(width, style)
  , [
    afterInputEl,
    _placeholder
  ] = crAfterInputEl(
    isLoading,
    isLoadingFailed,
    placeholder,
    optionName,
    optionNames,
    onLoadOption,

    isFocused && value,
    isShowOption,

    _hClear,
    _hToggleOptions
  )
  , _optionViewWidthStyle = crWidthStyle(
      width,
      isShowOption ? S_BLOCK : S_NONE
  );

  return (
    <div
      className={CL_ROOT}
      style={_rootWidthStyle}
    >
      <input
         ref={_refInput}
         className={CL_INPUT}
         type="text"
         name="select"
         //autoComplete="off"
         autoCorrect="off"
         autoCapitalize="off"
         spellCheck={false}
         value={value}
         placeholder={_placeholder}
         onChange={_hInputChange}
         onKeyDown={_hInputKeyDown}
         {...getRefValue(_refTouchHandlers)}
      />
      {afterInputEl}
      <hr className={CL_INPUT_HR} />
      {isShowOption && <OptionsView
        widthStyle={_optionViewWidthStyle}

        optionsStyle={optionsStyle}
        propCaption={propCaption}
        ItemOptionComp={ItemOptionComp}
        noFooterBts={noFooterBts}

        options={options}
        nAll={nAll}

        refOptionsComp={_refOptionsComp}
        refOptionNode={_refOptionNode}
        refIndexNode={_refIndexNode}
        indexActive={getRefValue(_refIndexActive)}

        onClickItem={_hClickItem}
        onClear={_hClear}
      />}
    </div>
  );
})

export default InputSelect
