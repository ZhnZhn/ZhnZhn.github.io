import React, { Component, PropTypes } from 'react';

const CLASS_ROW_ACTIVE = "option-row__active"

const _fnNoItem = (propCaption) => {
  return {
    [propCaption]: 'No results found',
    value: 'noresult'
  };
}

const styles = {
  rootDiv: {
    position: 'relative',
    display: 'inline-block',
    backgroundColor: '#E1E1CB',
    width: '160px'

  },
  inputText: {
    background: 'transparent none repeat scroll 0 0',
    border: 'medium none',
    outline: 'medium none',
    height: '30px',
    paddingLeft: '10px',
    color: 'green',
    width: '140px',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  rootOptionDiv: {
    position: 'absolute',
    left: 0,
    backgroundColor: '#E1E1CB',
    color: 'green',
    width: '160px',
    //height: '160px',
    zIndex: '10',
    borderBottomLeftRadius : '5px',
    borderBottomRightRadius : '5px'
  },
  optionDiv: {
    //height: '160px',
    minHeight: '160px',
    maxHeight: '200px',
    paddingBottom: '2px',
    overflow: 'auto'
  },
  spinnerCell : {
    position: 'relative',
    left: '8px',
    top: '4px',
    display: 'inline-block',
    width: '16px',
    height: '16px'
  },
  spinnerFailedCell : {
    position: 'relative',
    left: '8px',
    top: '4px',
    display: 'inline-block',
    width: '16px',
    height: '16px',
    borderColor : '#F44336',
    cursor : 'pointer'
  },
  arrowCell:{
    cursor: 'pointer',
    //display: table-cell
    position: 'relative',
    textAlign: 'center',
    verticalAlign: 'middle',
    //width: '25px',
    width: '35px',
    paddingRight: '5px',
    marginLeft: '10px'

  },
  arrow : {
   borderColor: '#999 transparent transparent',
   borderStyle: 'solid',
   borderWidth: '5px 5px 2.5px',
   //borderWidth: '10px 10px 5px',
   display: 'inline-block',
   height: '0px',
   width: '0px'
 },
 arrowShow: {
    borderColor: '#1B75BB transparent transparent'
 },
 inputHr: {
   borderWidth: 'medium medium 1px',
   borderStyle: 'none none solid',
   borderColor: '#1B75BB',
   borderImage: 'none',
   margin: 0,
   marginLeft: '10px',
   marginBottom: '5px',
   width: '150px'

 },
  itemDiv:{
    cursor: 'pointer',
    paddingTop: '4px',
    paddingLeft: '5px',
    paddingBottom: '4px'
    //lineHeight: '14px'
  },
  itemOdd: {
    backgroundColor: '#C3C3AC'
  },
  itemEven: {
    backgroundColor: '#D5D5BC'
  },
  optionsFooter : {
    backgroundColor: 'silver',
    borderBottomLeftRadius : '5px',
    borderBottomRightRadius : '5px'
  },
  fileredSpan : {
    display: 'inline-block',
    color: 'gray',
    fontWeight : 'bold',
    //height: '20px',
    paddingLeft: '10px',
    paddingTop: '4px',
    paddingBottom : '4px'
  }
}

const ItemOptionDf = ({ item, propCaption }) => (
  <span>
    {item[propCaption]}
  </span>
);

class InputSelect extends Component {
  static propTypes = {
     propCaption: PropTypes.string,
     ItemOptionComp: PropTypes.element,
     width: PropTypes.string,
     options: PropTypes.arrayOf(PropTypes.shape({
        caption: PropTypes.string,
        value: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number
        ])
     })),
     optionName: PropTypes.string,
     optionNames: PropTypes.string,
     isUpdateOptions: PropTypes.bool,
     placeholder: PropTypes.string,

     isLoading: PropTypes.bool,
     isLoadingFailed: PropTypes.bool,

     onSelect: PropTypes.func,
     onLoadOption: PropTypes.func
  }

  static defaultProps = {
    propCaption: 'caption',
    ItemOptionComp: ItemOptionDf,
    options : [],
    optionName : '',
    optionNames : '',
    isUpdateOptions : false,
    onSelect: () => {},
    onLoadOption: () => {}
  }

  constructor(props){
    super()
    this.domOptionsCache = null
    this.indexActiveOption = 0
    this.propCaption = props.propCaption

    const { optionName, optionNames } = props
        , _optionNames = (optionNames)
              ? optionNames
              : (optionName) ? optionName : '';

    this.state = {
      value: '',
      isShowOption: false,
      options: props.options,
      optionName : optionName,
      optionNames : _optionNames,
      isValidDomOptionsCache: false,
      isLocalMode: false
    }
  }

  componentWillReceiveProps(nextProps){
    if (this.props !== nextProps){
      if (this.props.options !== nextProps.options
          || nextProps.isUpdateOptions){
        //New options come from Parent - Clear domCache, Init State
        this._setStateToInit(nextProps.options);
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if (this.props !== nextProps || nextProps.isUpdateOptions) {
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
      comp.classList.add(CLASS_ROW_ACTIVE);
    }
  }
  _undecorateActiveRowComp = (comp) => {
     if (!comp){
       comp = this._getActiveItemComp()
     }
     if (comp){
       comp.classList.remove(CLASS_ROW_ACTIVE);
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
        arr.push(_fnNoItem(this.propCaption))
        //arr.push(_fnNoItem(this.propCaption)NO_ITEM);
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
             this.props.onSelect(null);
           }
         }
      break; }
      //escape
      case 27:{
        if (this.state.isShowOption){
          this.setState({ isShowOption : false });
        } else {
          this._undecorateActiveRowComp();
          this._setStateToInit(this.props.options);
          this.props.onSelect(null);
        }
      break;}
      //down
      case 40:{
        if (!this.state.isShowOption){
          this.setState({ isShowOption : true });
        } else {
          event.preventDefault();

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
      break;}
      //up
      case 38:
        if (this.state.isShowOption){
          event.preventDefault();

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
      break;
      default: /*console.log(event.keyCode);*/ return;
    }
  }

  _handleToggleOptions = () => {
    this.setState({ isShowOption: !this.state.isShowOption });
  }

  _handleClickItem = (item, index, event) => {
    this.indexActiveOption = index;
    this.setState({
      value : item[this.propCaption],
      isShowOption : false
    });
    this.props.onSelect(item);
  }

  renderOptions = () => {
    const { ItemOptionComp } = this.props
        , { isShowOption, options, isValidDomOptionsCache } = this.state
        , _propCaption = this.propCaption;

    let _domOptions;
    if (options){
      if (!isValidDomOptionsCache){
         _domOptions = options.map((item, index)=>{
           const _styleDiv = (index % 2 === 0) ? styles.itemOdd : styles.itemEven;
           return (
             <div
                key={index}
                className="option-row"
                style={Object.assign({}, styles.itemDiv, _styleDiv)}
                //ref={"v"+index}
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

    const {width} = this.props
        ,  _styleOptions = isShowOption
              ? {display: 'block'} : { display: 'none'}
        , _styleDivWidth = (width)
              ? { width: width+'px'}
              //: { width: '100%' }
              : null
        , _numberFilteredItems = (options[0] && (options[0].value !== 'noresult') )
              ? options.length : 0
        , _numberAllItems = this.props.options
              ? this.props.options.length : 0;

    return (
        <div style={Object.assign({}, styles.rootOptionDiv, _styleOptions, _styleDivWidth)}>
          <div
             //ref={c => this.domOptions = c}
             ref={c => this.optionsComp = c}
             style={Object.assign({}, styles.optionDiv, _styleOptions, _styleDivWidth)}
           >
            {_domOptions}
          </div>
          <div style={styles.optionsFooter}>
            <span style={styles.fileredSpan}>
              Filtered {_numberFilteredItems} : {_numberAllItems}
            </span>
          </div>
        </div>
    )
  }

  _crAfterInputEl = () => {
    const { isLoading, isLoadingFailed, placeholder } = this.props
        , { isShowOption, optionName, optionNames } = this.state;

    let _placeholder, _afterInputEl
    if (!isLoading && !isLoadingFailed){
       const _styleArrow = isShowOption ? styles.arrowShow : null;
      _placeholder = (placeholder)
          ? placeholder
          : `Select ${optionName}...`;
      _afterInputEl = (
        <span
           style={styles.arrowCell}
           onClick={this._handleToggleOptions}>
          <span style={Object.assign({}, styles.arrow, _styleArrow)}></span>
        </span>
      );
    } else if (isLoading){
      _placeholder = `Loading ${optionNames}...`;
      _afterInputEl = (
        <span
          style={styles.spinnerCell}
          data-loader="circle"
        >
        </span>
      );
    } else if (isLoadingFailed) {
       _placeholder=`Loading ${optionNames} Failed`;
       _afterInputEl = (
        <span
          style={styles.spinnerFailedCell}
          data-loader="circle-failed"
          onClick={this.props.onLoadOption}
         >
        </span>
      )
    }
    return {
      placeholder: _placeholder,
      afterInputEl: _afterInputEl
    };
  }

  render(){
    const { width } = this.props
        , { value, isLocalMode, isShowOption } = this.state;

    let _styleDivWidth = null;
    let _styleInputWidth = null;
    let _styleHr = null;
    if (width){
      _styleDivWidth = { width: width + 'px' };
      _styleInputWidth = { width: (width-30) + 'px'};
      _styleHr = { width: (width-40) + 'px'};
    } /*else {
      _styleDivWidth = { width: '100%' };
      _styleInputWidth = { width: '100%'};
      _styleHr = { width: 'auto' };
    } */

    const { afterInputEl, placeholder } = this._crAfterInputEl()
    const _domOptions = (isLocalMode || isShowOption)
              ? this.renderOptions()
              : null;

    return (
      <div style={Object.assign({},styles.rootDiv, _styleDivWidth)}>
        <input
           ref={c => this.domInputText = c}
           type="text"
           name="select"
           autoComplete="new-select"
           autoCorrect="off"
           autoCapitalize="off"
           spellCheck={false}
           value={value}
           style={Object.assign({},styles.inputText, _styleInputWidth)}
           placeholder={placeholder}
           onChange={this._handleInputChange}
           onKeyDown={this._handleInputKeyDown}>
        </input>
        {afterInputEl}
        <hr style={Object.assign({},styles.inputHr, _styleHr)}></hr>
        {_domOptions}
      </div>
    )
  }

  focusInput(){
    this.domInputText.focus()
  }
  focusNotValidInput(){
    this.domInputText.focus()
  }

}

export default InputSelect
