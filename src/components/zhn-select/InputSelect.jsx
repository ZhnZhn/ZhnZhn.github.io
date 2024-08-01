import {
  useId,
  useRef,
  useState,
  useMemo,
  useEffect,

  setRefValue,
  getRefValue,
  focusRefElement
} from '../uiApi';

import useToggle from '../hooks/useToggle';

import {
  S_NONE,
  S_BLOCK
} from '../styleFn';

import crAfterInputEl from './crAfterInputEl';
import {
  NO_ITEMS_FOUND_VALUE,
  crAriaExpandedProps,
  crWidthStyle,

  crValue,
  crInitialStateFromProps,
  crFilterOptions,
  crOptionsFromInitialOptions,
  updateOptionsIfFilters,

  makeVisible,
  decorateCurrentComp,
  undecorateComp,

  stepDownOption,
  stepUpOption
} from './InputSelectFn';
import ItemOptionDf from './ItemOptionDf';
import OptionsView from './OptionsView';

import useTouchHandlers from './useTouchHandlers';

import {
  CL_ROOT,
  CL_INPUT
} from './CL';

const FN_NOOP = () => {};

const InputSelect = ({
  labelId,
  propCaption="caption",
  ItemOptionComp=ItemOptionDf,
  options: propsOptions,
  optionName="",
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

  filters,

  onSelect=FN_NOOP,
  onLoadOption=FN_NOOP
}) => {
  const _optionsViewId = useId()
  , _refInput = useRef()

  , _refOptionsComp = useRef()
  , _refIndexNode = useRef()

  , _refIndexActive = useRef()

  , [
    isFocused,
    touchHandlers
  ] = useTouchHandlers()

  , [
    isShowOption,
    toggleIsShowOption
  ] = useToggle()
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

    nAll
  } = state

  , _getItemCaption = useMemo(() => item => crValue(
      (item || {})[propCaption]
    ), [propCaption])

  /*eslint-disable react-hooks/exhaustive-deps */
  , [
    _hideOptions,
    _getCurrentComp,
    _decorateCurrentComp,
    _selectItem
  ] = useMemo(() => [
    () => toggleIsShowOption(false),
    () => {
      const _optionsEl = getRefValue(_refOptionsComp)
      if (_optionsEl) {
        return _optionsEl.childNodes.item(getRefValue(_refIndexActive))
      }
    },
    () => {
      decorateCurrentComp(
        _getCurrentComp(),
        getRefValue(_refIndexNode),
        getRefValue(_refIndexActive)
      )
    },
    // _getCurrentComp
    item => {
      if (!item) {
        onSelect()
      } else if (item.value !== NO_ITEMS_FOUND_VALUE) {
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
    }
    // isWithInput, onSelect
  ], [])
  /*eslint-enable react-hooks/exhaustive-deps */

  , _hInputChange = (evt) => {
    const token = evt.target.value
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
      setState(prevState => ({
        ...prevState,
        value: token,
        options: crFilterOptions(
          tokenLn > valueLn
            ? options
            : initialOptions,
          token, {
          propCaption,
          isWithInput,
          maxInput,
          filters
        })
      }))
      toggleIsShowOption(true)
    }
  }

  /*eslint-disable react-hooks/exhaustive-deps */
  , _clearInput = useMemo(() => () => {
     undecorateComp(_getCurrentComp())
     setRefValue(_refIndexActive, 0)
     _selectItem()

     toggleIsShowOption(false)
     setState(prevState => ({
       ...prevState,
       //options: prevState.initialOptions,
       options: crOptionsFromInitialOptions(prevState),
       value: ""
     }))
  }, [])
  // _getCurrentComp, _selectItem
  /*eslint-enable react-hooks/exhaustive-deps */

  , _hInputKeyDown = (evt) => {
    switch(evt.keyCode){
      // enter
      case 13:{
         const item = options[getRefValue(_refIndexActive)]
         , _value = _getItemCaption(item)
         if (_value){
           toggleIsShowOption(false)
           setState(prevState => ({
             ...prevState,
             value: _value
           }));
           _selectItem(item)
         }
      break; }
      //escape, delete
      case 27: case 46: {
        evt.preventDefault()
        if (isShowOption){
          toggleIsShowOption()
        } else {
          _clearInput()
        }
      break;}
      case 40: //down
        if (!isShowOption){
          toggleIsShowOption()
        } else {
          evt.preventDefault()
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
          evt.preventDefault()
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

  /*eslint-disable react-hooks/exhaustive-deps */
  , _hClickItem = useMemo(() => (item, index) => {
    undecorateComp(_getCurrentComp())
    setRefValue(_refIndexActive, index)

    toggleIsShowOption(false)
    setState(prevState => ({
      ...prevState,
      value: _getItemCaption(item)
    }));
    _selectItem(item)
  }, [_getItemCaption])
  // _getCurrentComp, _selectItem
  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */
  , [
    _focusInput,
    _hClear
  ] = useMemo(() => [
    () => {
      focusRefElement(_refInput)
    },
    () => {
      _clearInput()
      _focusInput()
    }
    // _clearInput
  ], []);
  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    setRefValue(_refIndexActive, 0)
    toggleIsShowOption(false)
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
      _decorateCurrentComp()
      makeVisible(
        _getCurrentComp(),
        getRefValue(_refIndexActive),
        getRefValue(_refOptionsComp)
      )
    }
  }, [isShowOption])
  // _getCurrentComp
  /*eslint-unable react-hooks/exhaustive-deps */

  updateOptionsIfFilters(
    state,
    setState,
    filters,
    propCaption,
    onSelect,
    _getCurrentComp,
    _refIndexActive
  )

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
    labelId,
    _optionsViewId,

    _hClear,
    toggleIsShowOption,
    propsOptions
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
         {...touchHandlers}

         {...crAriaExpandedProps(isShowOption, _optionsViewId)}
         role="combobox"
         aria-autocomplete="list"
         aria-labelledby={labelId}

         ref={_refInput}
         className={CL_INPUT}
         type="text"
         //autoComplete="off"
         autoCorrect="off"
         spellCheck={false}
         value={value}
         placeholder={_placeholder}
         onChange={_hInputChange}
         onKeyDown={_hInputKeyDown}
      />
      {afterInputEl}
      {isShowOption && <OptionsView
        id={_optionsViewId}
        widthStyle={_optionViewWidthStyle}

        optionsStyle={optionsStyle}
        propCaption={propCaption}
        ItemOptionComp={ItemOptionComp}
        noFooterBts={noFooterBts}

        options={options}
        nAll={nAll}

        refOptionsComp={_refOptionsComp}
        refIndexNode={_refIndexNode}
        indexActive={getRefValue(_refIndexActive)}

        onClickItem={_hClickItem}
        onClear={_hClear}
        onClickOutside={_hideOptions}
      />}
    </div>
  );
}

export default InputSelect
