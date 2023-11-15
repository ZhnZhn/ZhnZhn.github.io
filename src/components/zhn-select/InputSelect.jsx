//import PropTypes from 'prop-types'
import {
  Component,
  createRef,
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
  crWidthStyle
} from './InputSelectFn';
import ItemOptionDf from './ItemOptionDf';
import OptionsView from './OptionsView';

import {
  CL_ROOT,
  CL_INPUT,
  CL_INPUT_HR,
  CL_OPTIONS_ROW_ACTIVE
} from './CL';

const INPUT_PREFIX = 'From input:'
, DF_OPTIONS = [];

const _crValue = str => str
  .replace(INPUT_PREFIX, '')
  .trim();

const _crInputItem = (
  inputValue, {
  propCaption,
  isWithInput,
  maxInput
}) => {
  const _inputValue = inputValue.slice(0, maxInput)
  , _caption = isWithInput
       ? `${INPUT_PREFIX} ${_inputValue}`
       : 'No results found';
  return {
    [propCaption]: _caption,
    value: NO_RESULT,
    inputValue: _inputValue
  };
};

const _crInitialStateFromProps = ({
  options
}) => {
  const _options = options || DF_OPTIONS;
  return {
    value: '',
    isShowOption: false,

    initialOptions: _options,
    options: _options,
    nAll: _options.length,

    isFocused: false
  };
}

const _filterOptions = (
  options,
  value,
  pnCaption
) => {
   const _value = value.toLowerCase();
   return options.filter(item => item[pnCaption]
     .toLowerCase()
     .indexOf(_value) !== -1
   );
}

const _crFilterOptions = (
  options,
  token,
  props
) => {
  const { propCaption } = props;
  const _arr = _filterOptions(options, token, propCaption);
  if (_arr.length === 0){
    _arr.push(_crInputItem(token, props))
  }
  return _arr;
}

const _calcDeltaTop = (
  comp,
  optionsComp
) => comp && optionsComp
  ? comp.offsetTop - optionsComp.scrollTop
  : void 0;

const _makeVisible = (
  comp,
  indexActive,
  optionsComp
) => {
  if (comp){
    if (indexActive === 0){
      return;
    }
    const deltaTop = _calcDeltaTop(comp, optionsComp);
    if (deltaTop > 70){
      optionsComp.scrollTop += deltaTop - 70;
    }
    if (deltaTop < 0){
      optionsComp.scrollTop = 0;
    }
  }
};

const _decorateCurrentComp = (
  comp,
  indexEl,
  indexActive
) => {
  if (comp){
    comp.classList.add(CL_OPTIONS_ROW_ACTIVE);
    if (indexEl) {
      indexEl.textContent = indexActive + 1
    }
  }
};

const _undecorateComp = (comp) => {
  if (comp){
    comp.classList.remove(CL_OPTIONS_ROW_ACTIVE);
  }
};

const _predicateStepDown = delta => delta > 70
, _predicateStepUp = delta => delta < 70
, _decorateByStep = (
    fnPredicate,
    comp,
    indexEl,
    indexActive,
    optionsComp
) => {
  _decorateCurrentComp(comp, indexEl, indexActive)
  const deltaTop = _calcDeltaTop(comp, optionsComp);
  if (fnPredicate(deltaTop)){
     optionsComp.scrollTop += deltaTop - 70;
  }
}


const _stepDownOption = (
  getCurrentComp,
  refIndexActive,
  maxIndex,
  indexEl,
  optionsComp
) => {
  const prevComp = getCurrentComp();

  if (prevComp){
     _undecorateComp(prevComp);

     setRefValue(refIndexActive, getRefValue(refIndexActive) + 1)
     if (getRefValue(refIndexActive)>=maxIndex){
        setRefValue(refIndexActive, 0)
        optionsComp.scrollTop = 0;
     }

     _decorateByStep(
       _predicateStepDown,
       getCurrentComp(),
       indexEl,
       getRefValue(refIndexActive),
       optionsComp
     )
  }
}

const _stepUpOption = (
  getCurrentComp,
  refIndexActive,
  maxIndex,
  indexEl,
  optionsComp
) => {
  const prevComp = getCurrentComp();
  if (prevComp){
    _undecorateComp(prevComp);


    setRefValue(refIndexActive, getRefValue(refIndexActive) - 1)
    if (getRefValue(refIndexActive) < 0){
      setRefValue(refIndexActive, maxIndex - 1)
      const bottomComp = getCurrentComp()
      optionsComp.scrollTop = bottomComp.offsetTop
    }

    _decorateByStep(
      _predicateStepUp,
      getCurrentComp(),
      indexEl,
      getRefValue(refIndexActive),
      optionsComp
    )
  }
}


const FN_NOOP = () => {};

class InputSelect extends Component {
  /*
  static propTypes = {
     propCaption: PropTypes.string,
     ItemOptionComp: PropTypes.element,
     width: PropTypes.string,
     style: PropTypes.object,
     optionsStyle: PropTypes.object,
     options: PropTypes.arrayOf(PropTypes.shape({
        caption: PropTypes.string,
        value: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number
        ])
     })),
     optionName: PropTypes.string,
     optionNames: PropTypes.string,
     placeholder: PropTypes.string,
     isWithInput: PropTypes.bool,
     prefixInput: PropTypes.string

     isLoading: PropTypes.bool,
     isLoadingFailed: PropTypes.bool,
     noFooterBts: PropTypes.bool

     onSelect: PropTypes.func,
     onLoadOption: PropTypes.func
  }
  */

  static defaultProps = {
    propCaption: 'caption',
    ItemOptionComp: ItemOptionDf,
    optionName: '',
    isWithInput: false,
    maxInput: 10,
    regInput: /[A-Za-z0-9()^ ]/,
    //prefixInput: 'From Input:',
    onSelect: FN_NOOP,
    onLoadOption: FN_NOOP
  }

  constructor(props){
    super(props)
    this._touchHandlers = HAS_TOUCH_EVENTS
      ? {
          onFocus: this._hFocus,
          onBlur: this._hBlur
        }
      : void 0
    this._initProperties()
    this._refInput = createRef()
    this._refIndexActive = createRef()

    this.state = _crInitialStateFromProps(props)
  }

  _initProperties = () => {
    setRefValue(this._refIndexActive, 0)
  }

  static getDerivedStateFromProps(props, state){
     //Init state for new options from props
     return props.options !== state.initialOptions
       ? _crInitialStateFromProps(props)
       : null;
  }

  componentDidUpdate(prevProps, prevState){
    const { initialOptions, isShowOption } = this.state;
    // Init from props for new options from props
    if (prevState.initialOptions !== initialOptions) {
      this._initProperties()
    }
    //Decorate Active Option and Make Visible
    if (isShowOption){
      const comp = this._getCurrentComp()
      , _indexActive = getRefValue(this._refIndexActive);
      _decorateCurrentComp(comp, this.indexNode, _indexActive);
      if (!prevState.isShowOption) {
        _makeVisible(
          comp,
          _indexActive,
          this.optionsComp
        )
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this._blurId)
  }

  _setStateToInit = (props) => {
    this._initProperties()
    this.setState(_crInitialStateFromProps(props))
  }

  _getCurrentComp = () => {
    return this[`v${getRefValue(this._refIndexActive)}`];
  }

  _hInputChange = (event) => {
    const { isWithInput, regInput } = this.props
    , token = event.target.value
    , tokenLn = token.length
    , { value, options, initialOptions } = this.state
    , valueLn = value.length;

    if ( isWithInput
         && tokenLn>0
         && !regInput.test(token[tokenLn-1])) {
      return;
    }

    if (tokenLn !== valueLn){
      _undecorateComp(this._getCurrentComp())
      setRefValue(this._refIndexActive, 0)
      const _options = tokenLn > valueLn
        ? options : initialOptions;
      this.setState({
        value: token,
        isShowOption: true,
        options: _crFilterOptions(_options, token, this.props)
      })
    }
  }
  
  _selectItem = item => {
    const { onSelect, isWithInput } = this.props;
    if (!item) {
      onSelect()
    } else if (item.value !== NO_RESULT) {
      onSelect(item)
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

  _hInputKeyDown = (event) => {
    switch(event.keyCode){
      // enter
      case 13:{
         const { propCaption } = this.props
         , item = this.state.options[getRefValue(this._refIndexActive)] || {}
         , _value = item[propCaption];

         if (_value){
           this.setState({
             value: _crValue(_value),
             isShowOption: false,
           });
           this._selectItem(item)
         }
      break; }
      //escape, delete
      case 27: case 46: {
        event.preventDefault()
        if (this.state.isShowOption){
          this.setState({ isShowOption: false });
        } else {
          this.clearInput()
        }
      break;}
      case 40: //down
        if (!this.state.isShowOption){
          this.setState({ isShowOption: true })
        } else {
          event.preventDefault()
          _stepDownOption(
            this._getCurrentComp,
            this._refIndexActive,
            this.state.options.length,
            this.indexNode,
            this.optionsComp
          )
        }
        break;
      case 38: //up
        if (this.state.isShowOption){
          event.preventDefault()
          _stepUpOption(
            this._getCurrentComp,
            this._refIndexActive,
            this.state.options.length,
            this.indexNode,
            this.optionsComp
          )
        }
        break;
      default: return;
    }
  }

  _hToggleOptions = () => {
    this.setState(prevState => ({
      ...prevState,
      isShowOption: !prevState.isShowOption
    }))
  }

  _hClickItem = (item, index, propCaption) => {
    _undecorateComp(this._getCurrentComp())
    setRefValue(this._refIndexActive, index)
    this.setState({
      value: _crValue(item[propCaption]),
      isShowOption: false
    });
    this._selectItem(item)
  }

  _refOptionsComp = c => this.optionsComp = c
  _refOptionNode = (n, index) => this[`v${index}`] = n
  _refIndexNode = n => this.indexNode = n

  _hClear = () => {
    this.clearInput()
    this.focusInput()
  }

  _hFocus = () => {
    clearTimeout(this._blurId)
    this.setState({ isFocused: true })
  }
  _hBlur = () => {
    this._blurId = setTimeout(
      () => this.setState({ isFocused: false }),
      800
    )
  }

  render(){
    const {
      style,
      width,

      propCaption,
      ItemOptionComp,

      optionsStyle,
      noFooterBts
    } = this.props
    , {
      isShowOption,
      isFocused,
      value,

      options,
      nAll
    } = this.state
    , _rootWidthStyle = crWidthStyle(width, style)
    , [
      afterInputEl,
      placeholder
    ] = crAfterInputEl(
      this.props,

      isFocused && value,
      isShowOption,

      this._hClear,
      this._hToggleOptions
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
           ref={this._refInput}
           className={CL_INPUT}
           type="text"
           name="select"
           //autoComplete="off"
           autoCorrect="off"
           autoCapitalize="off"
           spellCheck={false}
           value={value}
           placeholder={placeholder}
           onChange={this._hInputChange}
           onKeyDown={this._hInputKeyDown}
           {...this._touchHandlers}
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

          refOptionsComp={this._refOptionsComp}
          refOptionNode={this._refOptionNode}
          refIndexNode={this._refIndexNode}
          indexActive={getRefValue(this._refIndexActive)}

          onClickItem={this._hClickItem}
          onClear={this._hClear}
        />}
      </div>
    )
  }

  clearInput = () => {
    _undecorateComp(this._getCurrentComp())
    this._selectItem()
    this._setStateToInit(this.props)
  }

  focusInput(){
    focusRefElement(this._refInput)
  }

}

export default InputSelect
