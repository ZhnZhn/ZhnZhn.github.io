import {
  useId,
  useRef,
  useState,
  useMemo,
  useEffect,

  isNumber,

  setRefValue,
  getRefValue,
  focusRefElement,
  isRefElementContaintsEvtTarget
} from '../uiApi';
import {
  crAriaExpandedProps,
  crAriaComboboxProps
} from '../ariaFn';

import { useToggle } from '../hooks/useToggle';

import {
  S_NONE,
  S_BLOCK
} from '../styleFn';

import crAfterInputEl from './crAfterInputEl';
import {
  NO_ITEMS_FOUND_VALUE,
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

const FN_NOOP = () => {}
, DF_PROP_NAME_CAPTION = "caption"
, _crItemFromInput = value => value ? {
   [DF_PROP_NAME_CAPTION]: value,
   value: value,
   isInput: true
} : void 0;

const InputSelect = ({
  labelId,
  propCaption=DF_PROP_NAME_CAPTION,
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

  , _refIndexActive = useRef(0)

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
    _getCurrentComp,
    _decorateCurrentComp,
    _setSelectedItemIndex,
    _selectItem
  ] = useMemo(() => [
    () => {
      const _optionsEl = getRefValue(_refOptionsComp);
      return _optionsEl
        ? _optionsEl.childNodes.item(getRefValue(_refIndexActive))
        : void 0;
    },
    () => {
      decorateCurrentComp(
        _getCurrentComp(),
        getRefValue(_refIndexNode),
        getRefValue(_refIndexActive)
      )
    },
    // _getCurrentComp
    index => {
      if (isNumber(index) && index > -1) {
        undecorateComp(_getCurrentComp())
        setRefValue(_refIndexActive, index)
      }
    },
    // _getCurrentComp
    item => {
      if (!item) {
        onSelect()
      } else if (item.value !== NO_ITEMS_FOUND_VALUE) {
        const _item = {...item};
        delete _item._c;
        onSelect(_item)
      } else {
        onSelect(isWithInput
          ? _crItemFromInput(item.inputValue.trim())
          : void 0
        )
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
      _setSelectedItemIndex(0)
      _decorateCurrentComp()
      const _optionsEl = getRefValue(_refOptionsComp);
      if (_optionsEl) {
        _optionsEl.scrollTop = 0
      }

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
     _setSelectedItemIndex(0)
     _selectItem()

     toggleIsShowOption(false)
     setState(prevState => ({
       ...prevState,
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
         , _value = _getItemCaption(item);
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
    _setSelectedItemIndex(index)

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
    _hClear,
    _hideOptions
  ] = useMemo(() => [
    () => {
      focusRefElement(_refInput)
    },
    () => {
      _clearInput()
      _focusInput()
    },
    // _clearInput
    (evt) => {
      toggleIsShowOption(false)
      const _btClear = getRefValue(_refBtClear);
      if (isRefElementContaintsEvtTarget(_refBtClear, evt)) {
        _hClear()
      }
    }
    // _hClear
  ], []);
  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    _setSelectedItemIndex(0)
    toggleIsShowOption(false)
    setState(crInitialStateFromProps(
      propCaption,
      propsOptions
    ))
  }, [propsOptions])
  //propCaption, _setSelectedItemIndex
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
    _setSelectedItemIndex
  )

  const _rootWidthStyle = crWidthStyle(width, style)
  , _refBtClear = useRef()
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

    !!(isFocused && value),
    isShowOption,
    labelId,
    _optionsViewId,

    _refBtClear,
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
         {...crAriaComboboxProps(labelId)}

         ref={_refInput}
         className={CL_INPUT}
         type="text"
         autoComplete="off"
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
