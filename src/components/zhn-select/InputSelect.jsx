import React, { Component } from 'react';
//import PropTypes from 'prop-types'

import ArrowCell from './ArrowCell';

import BtCircle from '../zhn/ButtonCircle2';
import ItemOptionDf from './ItemOptionDf'
import OptionsFooter from './OptionsFooter'
import CL from './CL'

const MAX_WITHOUT_ANIMATION = 800;

const INPUT_PREFIX = 'From input:';
const _crInputItem = (inputValue, { propCaption, isWithInput, maxInput }) => {
  const _inputValue = String(inputValue)
    .replace(INPUT_PREFIX,'')
    .trim()
    .substring(0, maxInput)
  , _caption = isWithInput
       ? `${INPUT_PREFIX} ${_inputValue}`
       : 'No results found';
  return {
    [propCaption]: _caption,
    value: 'noresult',
    inputValue: _inputValue
  };
};

const _toItem = (item, propCaption) => ({
  [propCaption]: 'From Input',
  value: item.inputValue
});

const _crWidthStyle = (width, style) => {
  return width
    ? ((''+width).indexOf('%') !== -1)
        ? { ...style, width: width }
        : { ...style, width: width + 'px'}
    : null;
};

const _crFooterIndex = ({ options, initialOptions }) => ({
  _nFiltered: (options[0] && (options[0].value !== 'noresult'))
      ? options.length : 0,
  _nAll: initialOptions ? initialOptions.length : 0
});

const S = {
  BLOCK: {
    display: 'block'
  },
  NONE: {
    display: 'none'
  },
  ARROW_SHOW: {
    borderColor: '#1b75bb transparent transparent'
  }
};

const _crInitialStateFromProps = ({ optionName, optionNames, options }) => ({
  value: '',
  isShowOption: false,
  initialOptions: options,
  options: options,
  optionNames: optionNames || optionName || '',
  isValidDomOptionsCache: false,
  isLocalMode: false
});

class InputSelect extends Component {
  /*
  static propTypes = {
     propCaption: PropTypes.string,
     ItemOptionComp: PropTypes.element,
     width: PropTypes.string,
     isShowOptionAnim: PropTypes.bool,
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

     onSelect: PropTypes.func,
     onLoadOption: PropTypes.func
  }
  */

  static defaultProps = {
    propCaption: 'caption',
    ItemOptionComp: ItemOptionDf,
    options: [],
    optionName: '',
    optionNames: '',
    isWithInput: false,
    maxInput: 10,
    //prefixInput: 'From Input:',
    onSelect: () => {},
    onLoadOption: () => {}
  }

  constructor(props){
    super(props)
    this._initFromProps(props)
    this.state = _crInitialStateFromProps(props)
  }

  _initFromProps = ({ propCaption }) => {
    this.domOptionsCache = null
    this.indexActiveOption = 0
    this.propCaption = propCaption
  }

  static getDerivedStateFromProps(props, state){
     //Init state for new options from props
     if (props.options !== state.initialOptions) {
       return _crInitialStateFromProps(props);
     }
     return null;
  }

  componentDidUpdate(prevProps, prevState){
    // Init from props for new options from props
    if (prevState.initialOptions !== this.state.initialOptions) {
      this._initFromProps(this.props)
    }
     //Decorate Active Option
     if (this.state.isShowOption){
       const comp = this._getActiveItemComp();
       this._decorateActiveRowComp(comp);
       this._makeVisibleActiveRowComp(comp);
    }
  }

  _setStateToInit = (props) => {
    this._initFromProps(props)
    this.setState(_crInitialStateFromProps(props))
  }

  _getActiveItemComp = () => {
    return this[`v${this.indexActiveOption}`];
  }
  _decorateActiveRowComp = (comp) => {
    if (comp){
      comp.classList.add(CL.OPTIONS_ROW_ACTIVE);
    }
    if (this.indexNode) {
      this.indexNode.textContent = this.indexActiveOption + 1
    }
  }
  _undecorateActiveRowComp = (comp) => {
     const _comp = comp || this._getActiveItemComp();
     if (_comp){
      _comp.classList.remove(CL.OPTIONS_ROW_ACTIVE);
     }
  }

  _makeVisibleActiveRowComp = comp => {
    if (comp){
      const  { offsetTop } = comp
      , { scrollTop } = this.optionsComp;
      if (offsetTop - scrollTop > 70){
         this.optionsComp.scrollTop += offsetTop - scrollTop - 70;
      }
      if (offsetTop - scrollTop < 0){
        this.optionsComp.scrollTop = 0;
      }
    }
  }

  _filterOptions = (options, value) => {
     const valueFor = value.toLowerCase()
     , _caption = this.propCaption;
     return options.filter(option => option[_caption]
        .toLowerCase()
        .indexOf(valueFor) !== -1
     );
  }

  _crFilterOptions = (token, tokenLn, valueLn) => {
    const { options, initialOptions } = this.state
    , _options = tokenLn > valueLn
        ? options : initialOptions
    , _arr = this._filterOptions(_options, token);
    if (_arr.length === 0){
      _arr.push(_crInputItem(token, this.props))
    }
    return _arr;
  }

  _hInputChange = (event) => {
    const token = event.target.value
    , tokenLn = token.length
    , { value } = this.state
    , valueLn = value.length;
    if (tokenLn !== valueLn){
      this._undecorateActiveRowComp()
      this.indexActiveOption = 0;
      this.setState({
        value: token,
        isShowOption: true,
        isValidDomOptionsCache: false,
        options: this._crFilterOptions(token, tokenLn, valueLn)
      })
    }
  }

  _startAfterInputAnimation = () => {
    if (this.state.options.length>MAX_WITHOUT_ANIMATION){
      this.arrowCell.startAnimation()
    }
  }
  _stopAfterInputAnimation = () => {
    this.arrowCell.stopAnimation()
  }
  _setShowOptions = () => {
    this.setState(
      { isShowOption : true },
      this._stopAfterInputAnimation
    )
  }
  _showOptions = (ms) => {
    if (this.props.isShowOptionAnim) {
      this._startAfterInputAnimation()
      setTimeout( this._setShowOptions, ms )
    } else {
      this.setState({ isShowOption: true })
    }
  }

  _stepDownOption = () => {
    const prevComp = this._getActiveItemComp();

    if (prevComp){
       this._undecorateActiveRowComp(prevComp);

       this.indexActiveOption += 1;
       if (this.indexActiveOption>=this.state.options.length){
          this.indexActiveOption = 0;
          this.optionsComp.scrollTop = 0;
       }

       const nextComp = this._getActiveItemComp();
       this._decorateActiveRowComp(nextComp)

       const offsetTop = nextComp.offsetTop
       const scrollTop = this.optionsComp.scrollTop;
       if ( (offsetTop - scrollTop) > 70){
          this.optionsComp.scrollTop += (offsetTop - scrollTop - 70);
       }
    }
  }

  _stepUpOption = () => {
    const prevComp = this._getActiveItemComp();
    if (prevComp){
      this._undecorateActiveRowComp(prevComp);

      this.indexActiveOption -= 1;
      if (this.indexActiveOption < 0){
        this.indexActiveOption = this.state.options.length - 1;
        const bottomComp = this._getActiveItemComp()
        this.optionsComp.scrollTop = bottomComp.offsetTop
      }

      const nextComp = this._getActiveItemComp();
      this._decorateActiveRowComp(nextComp);

      const offsetTop = nextComp.offsetTop;
      const scrollTop = this.optionsComp.scrollTop;
      if ( (offsetTop - scrollTop) < 70){
        this.optionsComp.scrollTop -= ( 70 - (offsetTop - scrollTop) );
      }
    }
  }

  _hInputKeyDown = (event) => {
    switch(event.keyCode){
      // enter
      case 13:{
         const item = this.state.options[this.indexActiveOption];

         if (item && item[this.propCaption]){
           this.setState({
             value : item[this.propCaption],
             isShowOption : false,
             isValidDomOptionsCache : true
           });

           if (item.value !== 'noresult'){
             this.props.onSelect(item);
           } else {
             const _item = this.props.isWithInput
               ? _toItem(item, this.propCaption)
               : void 0;
             this.props.onSelect(_item);
           }
         }
      break; }
      //escape, delete
      case 27: case 46: {
        event.preventDefault()
        if (this.state.isShowOption){
          this.setState({ isShowOption : false });
        } else {
          this._undecorateActiveRowComp();
          this._setStateToInit(this.props);
          this.props.onSelect(void 0);
        }
      break;}
      case 40: //down
        if (!this.state.isShowOption){
          this._showOptions(0)
        } else {
          event.preventDefault()
          this._stepDownOption()
        }
        break;
      case 38: //up
        if (this.state.isShowOption){
          event.preventDefault()
          this._stepUpOption()
        }
        break;
      default: return;
    }
  }

  _hToggleOptions = () => {
    if (this.state.isShowOption){
      this.setState({ isShowOption: false })
    } else {
      this._showOptions(1)
    }
  }

  _hClickItem = (item, index) => {
    this._undecorateActiveRowComp()
    this.indexActiveOption = index;
    this.setState({
      value: item[this.propCaption],
      isShowOption: false
    });
    this.props.onSelect(item);
  }

  _refOptionsComp = c => this.optionsComp = c
  _refIndexNode = n => this.indexNode = n

  _createDomOptionsWithCache = () => {
    const {
      ItemOptionComp
    } = this.props
    , {
      options,
      isValidDomOptionsCache
    } = this.state
    , _propCaption = this.propCaption;

    let _domOptions;
    if (options){
      if (!isValidDomOptionsCache){
         /*eslint-disable jsx-a11y/click-events-have-key-events*/
         _domOptions = options.map((item, index)=>( <div
              role="option"
              aria-selected={this.indexActiveOption === index}
              tabIndex="0"
              key={index}
              className={CL.OPTIONS_ROW}
              ref={c => this[`v${index}`] = c}
              onClick={this._hClickItem.bind(null, item, index)}
            >
              <ItemOptionComp
                 item={item}
                 propCaption={_propCaption}
              />
            </div>
         ));
         /*eslint-enable jsx-a11y/click-events-have-key-events*/
         this.domOptionsCache = _domOptions;
       } else {
         _domOptions = this.domOptionsCache;
       }
    }
    return _domOptions;
  }

  renderOptions = () => {
    const { rootOptionsStyle, width } = this.props
    , { isShowOption } = this.state
    , _domOptions = this._createDomOptionsWithCache()
    , _styleOptions = isShowOption ? S.BLOCK : S.NONE
    , _rootWidthStyle = _crWidthStyle(width, _styleOptions)
    , { _nFiltered, _nAll } = _crFooterIndex(this.state);

    return (
        <div
           className={CL.OPTIONS}
           style={_rootWidthStyle}
           data-scrollable={true}
         >
          <div
             ref={this._refOptionsComp}
             className={CL.OPTIONS_DIV}
             style={{...rootOptionsStyle, ..._rootWidthStyle}}
           >
            {_domOptions}
          </div>
          <OptionsFooter
            ref={this._refIndexNode}
            indexActiveOption={this.indexActiveOption}
            nAll={_nAll}
            nFiltered={_nFiltered}
            onStepUp={this._stepUpOption}
            onStepDown={this._stepDownOption}
            onClear={this.clearInput}
          />
        </div>
    );
  }

  _refArrowCell = c => this.arrowCell = c

  _crAfterInputEl = () => {
    const {
       isLoading, isLoadingFailed,
       placeholder, optionName, onLoadOption
     } = this.props
    , { isShowOption, optionNames } = this.state;

    let _placeholder, _afterInputEl;
    if (!isLoading && !isLoadingFailed){
       _placeholder = placeholder || `Select ${optionName}...`;
       _afterInputEl = (
         <ArrowCell
           ref={this._refArrowCell}
           arrowStyle={isShowOption ? S.ARROW_SHOW : void 0}
           onClick={this._hToggleOptions}
         />
      );
    } else if (isLoading){
      _placeholder = `Loading ${optionNames}...`;
      _afterInputEl = (
        <span
          className={CL.SPINNER}
          data-loader="circle"
        />
      );
    } else if (isLoadingFailed) {
       _placeholder=`Loading ${optionNames} Failed`;
       _afterInputEl = (
         <BtCircle
           className={CL.SPINNER_FAILED}
           data-loader="circle-failed"
           onClick={onLoadOption}
         />
       )
    }
    return {
      placeholder: _placeholder,
      afterInputEl: _afterInputEl
    };
  }

  _refDomInputText = c => this.domInputText = c

  render(){
    const { rootStyle, width } = this.props
    , { value, isLocalMode, isShowOption } = this.state
    , _rootWidthStyle = _crWidthStyle(width, rootStyle)
    , { afterInputEl, placeholder } = this._crAfterInputEl();

    return (
      <div
        className={CL.ROOT}
        style={_rootWidthStyle}
      >
        <input
           ref={this._refDomInputText}
           className={CL.INPUT}
           type="text"
           name="select"
           autoComplete="off"
           autoCorrect="off"
           autoCapitalize="off"
           spellCheck={false}
           value={value}
           placeholder={placeholder}
           onChange={this._hInputChange}
           onKeyDown={this._hInputKeyDown}
        />
        {afterInputEl}
        <hr className={CL.INPUT_HR} />
        {(isLocalMode || isShowOption) && this.renderOptions()}
      </div>
    )
  }

  clearInput = () => {
    const { onSelect } = this.props;
    this._undecorateActiveRowComp()
    onSelect(void 0)
    this._setStateToInit(this.props)
  }

  focusInput(){
    this.domInputText.focus()
  }
  focusNotValidInput(){
    this.domInputText.focus()
  }

}

export default InputSelect
