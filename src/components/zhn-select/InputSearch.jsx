import React from 'react';

import ArrowCell from './ArrowCell';

const MAX_WITHOUT_ANIMATION = 800

const styles = {
  rootDiv: {
    position: 'relative',
    display: 'inline-block',
    backgroundColor: '#E1E1CB',
    width: '100%'
  },
  inputText: {
    background: 'transparent none repeat scroll 0 0',
    border: 'medium none',
    outline: 'medium none',
    height: '30px',
    paddingLeft: '10px',
    color: 'green',
    width: '100%',
    paddingRight: '40px',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  rootOptionDiv: {
    position: 'absolute',
    left: 0,
    backgroundColor: '#E1E1CB',
    color: 'green',
    width: '100%',
    //height: '160px',
    zIndex: '10',
    borderBottomLeftRadius : '5px',
    borderBottomRightRadius : '5px'
  },
  optionDiv: {
    width: '100%',
    //height: '160px',
    minHeight: '160px',
    maxHeight: '200px',
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
 inputHr: {
   borderWidth: 'medium medium 1px',
   borderStyle: 'none none solid',
   borderColor: '#1B75BB',
   borderImage: 'none',
   margin: 0,
   marginLeft: '10px',
   marginBottom: '5px',
   marginRight: '40px'
   //width: '150px'
 },
 arrow_show : {
    borderColor: '#1B75BB transparent transparent'
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

const InputSearch = React.createClass({
  getDefaultProps(){
    return {
      options : [],
      optionName : '',
      optionNames : '',
      isUpdateOptions : false,
      propCaption : 'caption'
    }
  },

  getInitialState(){
     this.domOptionsCache = null;
     this.indexActiveOption = 0;

     const { optionName, optionNames, propCaption } = this.props
         , _optionName = (optionName)
                  ? ' ' + optionName
                  : ''
         , _optionNames = (optionNames)
                  ? ' ' + optionNames
                  : (optionName) ? _optionName : '';

     this.propCaption = propCaption;

     return {
        value: '',
        isShowOption: false,
        options: this.props.options,
        optionName : _optionName,
        optionNames : _optionNames,
        isValidDomOptionsCache: false,
        isLocalMode: false
     }
  },

  componentWillReceiveProps(nextProps){
    if (this.props !== nextProps){
      if (this.props.options !== nextProps.options
          || nextProps.isUpdateOptions)
      {
        //New options come from Parent - Clear domCache, Init State
        this._setStateToInit(nextProps.options);
      }
    }
  },

  shouldComponentUpdate(nextProps, nextState){
    if (this.props !== nextProps || nextProps.isUpdateOptions) {
      nextState.isLocalMode = false;
    } else {
      nextState.isLocalMode = true;
    }

    return true;
  },

  componentDidUpdate(){
     //Decorate Active Option
     if (this.state.isShowOption){
       let domActiveOption = this._getDomForActiveOption();
       this._decorateOfDomActiveOption(domActiveOption);
       this._makeVisibleOfDomActiveOption(domActiveOption);
    }
  },

  _setStateToInit(options){
    this.indexActiveOption = 0;
    this.setState({
      value : '',
      isShowOption : false,
      options : options,
      isValidDomOptionsCache : false
    });
  },

  _getDomForActiveOption(){
    return this.refs["v"+this.indexActiveOption];
  },

  _decorateOfDomActiveOption(domActiveOption){
    if (domActiveOption){
      domActiveOption.classList.add("option-row__active");
    }
  },

  _decorateActiveOption(){
    let domActiveOption = this.refs["v"+this.indexActiveOption];
    domActiveOption.classList.add("option-row__active");
  },

  _undecorateActiveOption(){
    if (this.refs["v" + this.indexActiveOption]){
      this.refs["v" + this.indexActiveOption].classList.remove("option-row__active");
    }
  },

  _undecorateOfDomActiveOption(domActiveOption){
     if (domActiveOption){
       domActiveOption.classList.remove("option-row__active");
    }
  },

  _makeVisibleOfDomActiveOption(domActiveOption){
    if (domActiveOption){
      const offsetTop = domActiveOption.offsetTop;
      const scrollTop = this.domOptions.scrollTop;
      if ( (offsetTop - scrollTop) > 70){
         this.domOptions.scrollTop += (offsetTop - scrollTop - 70);
      }
      if ( (offsetTop - scrollTop) < 0){
        this.domOptions.scrollTop= 0;
      }
    }
  },

  _makeVisibleActiveOption(){
    let domActiveOption = this.refs["v"+this.indexActiveOption];

    let offsetTop = domActiveOption.offsetTop;
    let scrollTop = this.domOptions.scrollTop;
    if ( (offsetTop - scrollTop) > 70){
        this.domOptions.scrollTop += (offsetTop - scrollTop - 70);
    }
  },

  _filterOptionsToState(options, value){
     const valueFor = value.toLowerCase()
         , _caption = this.propCaption;
     return options.filter( (option, i) => {
       return option[_caption].toLowerCase().indexOf(valueFor) !== -1;
     })
  },

  _handlerInputChange(event){
    const value = event.target.value;
    let arr = [];
    if (value.length !== this.state.value.length){
      if ( value.length>this.state.value.length){
        arr = this._filterOptionsToState(this.state.options, value);
      } else if ( value.length<this.state.value.length) {
        arr = this._filterOptionsToState(this.props.options, value);
      }
      if (arr.length === 0){
        arr.push({[this.propCaption]: 'No results found', value: 'noresult'});
      }
      this._undecorateActiveOption();
      this.indexActiveOption = 0;
      this.setState({
        value : value,
        isShowOption : true,
        isValidDomOptionsCache : false,
        options : arr
      })
    }
  },

  _startAfterInputAnimation(){
    if (this.state.options.length>MAX_WITHOUT_ANIMATION){
      this.arrowCell.startAnimation();
    }
  },
  _stopAfterInputAnimation(){
    this.arrowCell.stopAnimation();
  },

  _handlerInputKeyDown(event){
    switch(event.keyCode){
      // enter
      case 13:
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
      break;
      //escape
      case 27:
        if (this.state.isShowOption){
          this.setState({ isShowOption : false });
        } else {
          this._undecorateActiveOption();
          this._setStateToInit(this.props.options);
          this.props.onSelect(null);
        }
      break;
      //down
      case 40:
        if (!this.state.isShowOption){

          this._startAfterInputAnimation();
          setTimeout(
             () => { this.setState({ isShowOption : true }, this._stopAfterInputAnimation) },
             0
          );

        } else {
          event.preventDefault();

          let domActiveOption = this._getDomForActiveOption();

          if (domActiveOption){
             this._undecorateOfDomActiveOption(domActiveOption);

             this.indexActiveOption += 1;
             if (this.indexActiveOption>=this.state.options.length){
                this.indexActiveOption = 0;
                this.domOptions.scrollTop = 0;
             }

             domActiveOption = this._getDomForActiveOption();
             this._decorateOfDomActiveOption(domActiveOption)

             const offsetTop = this.refs["v"+this.indexActiveOption].offsetTop;
             const scrollTop = this.domOptions.scrollTop;
             if ( (offsetTop - scrollTop) > 70){
                this.domOptions.scrollTop += (offsetTop - scrollTop - 70);
             }
          }
        }
      break;
      //up
      case 38:
        if (this.state.isShowOption){
          event.preventDefault();

          let domActiveOption = this._getDomForActiveOption();
          if (domActiveOption){
            this._undecorateOfDomActiveOption(domActiveOption);

            this.indexActiveOption -= 1;
            if (this.indexActiveOption < 0){
              this.indexActiveOption = this.state.options.length - 1;
              const offsetTop2 = this.refs["v"+this.indexActiveOption].offsetTop;
              this.domOptions.scrollTop = offsetTop2;
            }

            domActiveOption = this._getDomForActiveOption();
            this._decorateOfDomActiveOption(domActiveOption);

            const offsetTop = domActiveOption.offsetTop;
            const scrollTop = this.domOptions.scrollTop;
            if ( (offsetTop - scrollTop) < 70){
              this.domOptions.scrollTop -= ( 70 - (offsetTop - scrollTop) );
            }
          }
        }
      break;
      default: /*console.log(event.keyCode);*/ return;
    }
  },

  _handlerToggleOptions(){
    if (this.state.isShowOption){
       this.setState({ isShowOption: false });
    } else {
      this._startAfterInputAnimation()
      setTimeout(
        () => this.setState({ isShowOption: true}, this._stopAfterInputAnimation),
        1
      )
    }
  },

  _handlerClickOption(item, index, event){
    this.indexActiveOption = index;
    this.setState({
      value : item[this.propCaption],
      isShowOption : false
    });
    this.props.onSelect(item);
  },


  renderOptions(){
    const { ItemOptionComp } = this.props
         , { isShowOption, options, isValidDomOptionsCache } = this.state;

    let _domOptions;
    if (options){
      if (!isValidDomOptionsCache){
         const _caption = this.propCaption;
         _domOptions = options.map((item, index)=>{
            const _styleDiv = (index % 2 === 0)
                     ? styles.itemOdd
                     : styles.itemEven;
            return (
             <div
                key={index}
                ref={"v"+index}
                className="option-row"
                style={Object.assign({}, styles.itemDiv, _styleDiv)}
                onClick={this._handlerClickOption.bind(this, item, index)}
              >
                <ItemOptionComp
                   item={item}
                   propCaption={_caption}
                />
            </div>
           )
        });
        this.domOptionsCache = _domOptions;
      } else {
        _domOptions = this.domOptionsCache;
      }
    }

    const _styleOptions = isShowOption ? {display: 'block'} : { display: 'none'}
        , _numberFilteredItems = (options[0] && (options[0].value !== 'noresult') ) ?
                                  options.length : 0
        , _numberAllItems = this.props.options ? this.props.options.length : 0;

    return (
        <div style={Object.assign({}, styles.rootOptionDiv, _styleOptions)}>
          <div
             ref={c => this.domOptions = c}
             key="1"
             style={Object.assign({}, styles.optionDiv, _styleOptions)}
           >
            {_domOptions}
          </div>
          <div key="2" style={styles.optionsFooter}>
            <span style={styles.fileredSpan}>
              Filtered {_numberFilteredItems} : {_numberAllItems}
            </span>
          </div>
        </div>
    )
  },

  render(){
    const {value, isLocalMode, isShowOption } = this.state;

    const _styleArrow = isShowOption
              ? styles.arrow_show
              : null;
    const _domOptions = (isLocalMode || isShowOption)
              ? this.renderOptions()
              : null;

    const  {isLoading, isLoadingFailed, placeholder} = this.props
        ,  {optionName, optionNames} = this.state;

    let _domAfterInput, _placeholder;
    if (!isLoading && !isLoadingFailed){
      _placeholder= (placeholder)
            ? placeholder
            : `Select${optionName}...`;
      _domAfterInput = (
        <ArrowCell
           ref={ (c) => this.arrowCell = c}
           styleArrow={_styleArrow}
           onClick={this._handlerToggleOptions}
        />
      );
    } else if (isLoading){
      _placeholder=`Loading${optionNames}...`;
      _domAfterInput = (
        <span
          style={styles.spinnerCell}
          data-loader="circle"
        >
        </span>
      );
    } else if (isLoadingFailed) {
       _placeholder=`Loading${optionNames} Failed`;
       _domAfterInput = (
        <span
          style={styles.spinnerFailedCell}
          data-loader="circle-failed"
          onClick={this.props.onLoadOption}
         >
        </span>
      )
    }


    return (
      <div style={Object.assign({},styles.rootDiv)}>
        <input
           ref={c => this.domInputText = c}
           type="text"
           value={value}
           style={Object.assign({},styles.inputText)}
           placeholder={_placeholder}
           translate={false}
           onChange={this._handlerInputChange}
           onKeyDown={this._handlerInputKeyDown}>
        </input>
        {_domAfterInput}
        <hr style={Object.assign({},styles.inputHr)}></hr>
        {_domOptions}

      </div>
    )
  },

  focusInput(){
    this.domInputText.focus();
  },

  focusNotValidInput(){
    this.domInputText.focus();
  }

});

export default InputSearch
