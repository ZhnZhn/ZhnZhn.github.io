import React, { Component } from 'react';
//import PropTypes from 'prop-types'

import ArrowCell from './ArrowCell';

import BtCircle from '../zhn/ButtonCircle2'

const MAX_WITHOUT_ANIMATION = 800;

const CL_ROOT = 'zhn-select';
const CL = {
  ROOT: CL_ROOT,
  INPUT: `${CL_ROOT}__input`,
  SPINNER: `${CL_ROOT}__spinner`,
  SPINNER_FAILED: `${CL_ROOT}__spinner--failed`,
  INPUT_HR: `${CL_ROOT}__input__hr`,

  OPTIONS: `${CL_ROOT}__options`,
  OPTIONS_DIV: `${CL_ROOT}__options__div`,

  OPTIONS_ROW: `${CL_ROOT}__row`,
  OPTIONS_ROW_ACTIVE: `${CL_ROOT}__row--active`,

  FOOTER: `${CL_ROOT}__footer`,
  FOOTER_INDEX: `${CL_ROOT}__footer__index`,
  FOOTER_BTS: `${CL_ROOT}__footer__bts`,
  FOOTER_MARGIN: `${CL_ROOT}__footer--margin`,

  NOT_SELECTED: 'not-selected'
};


const INPUT_PREFIX = 'From input:';
const _fnNoItem = (propCaption, inputValue, isWithInput) => {
  const _inputValue = String(inputValue)
    .replace(INPUT_PREFIX,'').trim()
    , _caption = (isWithInput)
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

const _crWidth = (width, style) => {
  return (width)
    ? ((''+width).indexOf('%') !== -1)
        ? { ...style, width: width }
        : { ...style, width: width + 'px'}
    : null;
};

const S = {
  BLOCK: {
    display: 'block'
  },
  NONE: {
    display: 'none'
  },

  ARROW_SHOW: {
    borderColor: '#1B75BB transparent transparent'
  }
};

const ItemOptionDf = ({ item, propCaption }) => (
  <span>
    {item[propCaption]}
  </span>
);

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
    //prefixInput: 'From Input:',
    onSelect: () => {},
    onLoadOption: () => {}
  }

  constructor(props){
    super(props)
    this.domOptionsCache = null
    this.indexActiveOption = 0
    this.propCaption = props.propCaption

    const { optionName, optionNames, options } = props;
    this.state = {
      value: '',
      isShowOption: false,
      options: options,
      optionNames: optionNames || optionName || '',
      isValidDomOptionsCache: false,
      isLocalMode: false
    }
  }

  componentWillReceiveProps(nextProps){
    if (this.props !== nextProps){
      if (this.props.options !== nextProps.options){
        //New options come from Parent - Clear domCache, Init State
        this._setStateToInit(nextProps.options);
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if (this.props !== nextProps) {
      nextState.isLocalMode = false;
    } else {
      nextState.isLocalMode = true;
    }

    return true;
  }

  componentDidUpdate(){
     //Decorate Active Option
     if (this.state.isShowOption){
       const comp = this._getActiveItemComp();
       this._decorateActiveRowComp(comp);
       this._makeVisibleActiveRowComp(comp);
    }
  }

  _setStateToInit = (options) => {
    this.indexActiveOption = 0;
    this.setState({
      value : '',
      isShowOption : false,
      options : options,
      isValidDomOptionsCache : false
    });
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
     const _comp = !comp
              ? this._getActiveItemComp()
              : comp;
     if (_comp){
      _comp.classList.remove(CL.OPTIONS_ROW_ACTIVE);
     }
  }

  _makeVisibleActiveRowComp = (comp) => {
    if (comp){
      const offsetTop = comp.offsetTop;
      const scrollTop = this.optionsComp.scrollTop;
      if ( (offsetTop - scrollTop) > 70){
         this.optionsComp.scrollTop += (offsetTop - scrollTop - 70);
      }
      if ( (offsetTop - scrollTop) < 0){
        this.optionsComp.scrollTop= 0;
      }
    }
  }

  _filterOptions = (options, value) => {
     const valueFor = value.toLowerCase()
        ,  _caption = this.propCaption;
     return options.filter( (option, i) => {
       return option[_caption].toLowerCase().indexOf(valueFor) !== -1
     })
  }

  _handleInputChange = (event) => {
    const token = event.target.value
        , tokenLn = token.length
        , { value } = this.state
        , valueLn = value.length;
    let arr = [];
    if (tokenLn !== valueLn){
      if (tokenLn > valueLn){
        arr = this._filterOptions(this.state.options, token);
      } else if (tokenLn < valueLn) {
        arr = this._filterOptions(this.props.options, token);
      }
      if (arr.length === 0){
        arr.push(_fnNoItem(
          this.propCaption, token, this.props.isWithInput
        ))
      }
      this._undecorateActiveRowComp()
      this.indexActiveOption = 0;
      this.setState({
        value : token,
        isShowOption : true,
        isValidDomOptionsCache : false,
        options : arr
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
       //this.indexNode.innerHTML = this.indexActiveOption

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
      //this.indexNode.innerHTML = this.indexActiveOption

      const offsetTop = nextComp.offsetTop;
      const scrollTop = this.optionsComp.scrollTop;
      if ( (offsetTop - scrollTop) < 70){
        this.optionsComp.scrollTop -= ( 70 - (offsetTop - scrollTop) );
      }
    }
  }

  _handleInputKeyDown = (event) => {
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
             if (!this.props.isWithInput) {
                this.props.onSelect(undefined);
             } else {
               this.props.onSelect(_toItem(item, this.propCaption))
             }
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
          this._setStateToInit(this.props.options);
          this.props.onSelect(undefined);
        }
      break;}
      case 40: //down
        if (!this.state.isShowOption){
          this._showOptions(0)
          //this.setState({ isShowOption : true });
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
      default: return undefined;
    }
  }

  _handleToggleOptions = () => {
    //this.setState({ isShowOption: !this.state.isShowOption });
    if (this.state.isShowOption){
      this.setState({ isShowOption: false })
    } else {
      this._showOptions(1)
    }
  }

  _handleClickItem = (item, index, event) => {
    this._undecorateActiveRowComp()
    this.indexActiveOption = index;
    this.setState({
      value : item[this.propCaption],
      isShowOption : false
    });
    this.props.onSelect(item);
  }

  _refIndexNode = n => this.indexNode = n

  _renderOptionsFooter = (nFiltered, nAll) => {
    return (
      <div className={`${CL.FOOTER} ${CL.NOT_SELECTED}`}>
        <span className={CL.FOOTER_INDEX}>
          <span ref={this._refIndexNode} >
            {this.indexActiveOption}
          </span>
          <span>
             : {nFiltered}: {nAll}
          </span>
        </span>
        <span className={CL.FOOTER_BTS}>
          <BtCircle
             className={CL.FOOTER_MARGIN}
             caption="Dn"
             onClick={this._stepDownOption}
          />
          <BtCircle
             className={CL.FOOTER_MARGIN}
             caption="Up"
             onClick={this._stepUpOption}
          />
          <BtCircle
             caption="CL"
             onClick={this.clearInput}
          />
        </span>
      </div>
    );
  }

  _refOptionsComp = c => this.optionsComp = c

  renderOptions = () => {
    const {
            rootOptionsStyle,
            ItemOptionComp
          } = this.props
        , { isShowOption, options, isValidDomOptionsCache } = this.state
        , _propCaption = this.propCaption;

    let _domOptions;
    if (options){
      if (!isValidDomOptionsCache){
         _domOptions = options.map((item, index)=>{
           return (
             <div
                //role="option"
                //aria-selected={this.indexActiveOption === index}
                //tabIndex="0"
                key={index}
                className={CL.OPTIONS_ROW}
                ref={c => this[`v${index}`] = c}
                onClick={this._handleClickItem.bind(this, item, index)}
              >
                <ItemOptionComp
                   item={item}
                   propCaption={_propCaption}
                />
                {/*item.caption*/}
            </div>
           )
        });
        this.domOptionsCache = _domOptions;
      } else {
        _domOptions = this.domOptionsCache;
      }
    }

    const { width } = this.props
        ,  _styleOptions = isShowOption ? S.BLOCK : S.NONE
        , _rootWidthStyle = _crWidth(width, _styleOptions)
        , _nFiltered = (options[0] && (options[0].value !== 'noresult') )
              ? options.length : 0
        , _nAll = this.props.options
              ? this.props.options.length : 0;

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
          { this._renderOptionsFooter(_nFiltered, _nAll) }
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

    let _placeholder, _afterInputEl
    if (!isLoading && !isLoadingFailed){
       const _arrowStyle = isShowOption
                ? S.ARROW_SHOW
                : null;
      _placeholder = (placeholder)
          ? placeholder
          : `Select ${optionName}...`;
      _afterInputEl = (
         <ArrowCell
           ref={this._refArrowCell}
           arrowStyle={_arrowStyle}
           onClick={this._handleToggleOptions}
         />
      );
    } else if (isLoading){
      _placeholder = `Loading ${optionNames}...`;
      _afterInputEl = (
        <span
          className={CL.SPINNER}
          //style={S.SPINNER_CELL}
          data-loader="circle"
        >
        </span>
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
        , _rootWidthStyle = _crWidth(width, rootStyle)
        , { afterInputEl, placeholder } = this._crAfterInputEl()
        , _domOptions = (isLocalMode || isShowOption)
              ? this.renderOptions()
              : null;
    return (
      <div
        className={CL.ROOT}
        style={_rootWidthStyle}
      >
        <input
           ref={this._refDomInputText}
           type="text"
           name="select"
           //autoComplete="new-select"
           autoComplete="off"
           autoCorrect="off"
           autoCapitalize="off"
           spellCheck={false}
           value={value}
           className={CL.INPUT}
           placeholder={placeholder}
           onChange={this._handleInputChange}
           onKeyDown={this._handleInputKeyDown}>
        </input>
        {afterInputEl}
        <hr className={CL.INPUT_HR} />
        {_domOptions}
      </div>
    )
  }

  clearInput = () => {
    const { options, onSelect } = this.props;
    this._undecorateActiveRowComp()
    onSelect(undefined)
    this._setStateToInit(options)
    this.setState({ isShowOption : false });
  }

  focusInput(){
    this.domInputText.focus()
  }
  focusNotValidInput(){
    this.domInputText.focus()
  }

}

export default InputSelect
