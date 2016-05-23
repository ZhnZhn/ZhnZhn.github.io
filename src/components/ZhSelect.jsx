import React from 'react';
import _ from 'lodash';

const styles = {
  rootDiv: {
    position: 'relative',
    display: 'inline-block',
    backgroundColor: '#E1E1CB',
    width: '160px',

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
    fontWeight: 'bold',
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
    overflow: 'auto',
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
 inputHr: {
   borderWidth: 'medium medium 1px',
   borderStyle: 'none none solid',
   borderColor: '#1B75BB',
   borderImage: 'none',
   margin: 0,
   marginLeft: '10px',
   marginBottom: '5px',
   width: '150px',

 },
  itemDiv:{
    cursor: 'pointer',
    paddingTop: '4px',
    paddingLeft: '5px',
    paddingBottom: '4px',
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

const ZhSelect = React.createClass({
  getInitialState: function(){
     return {
       value: '',
       isShowOption: false,
       options: this.props.options,
       indexActiveOption: 0,
       domOptionsCache: null,
       isValidDomOptionsCache: false,
       isLocalMode: false,
     }
  },

  shouldComponentUpdate: function(nextProps, nextState){
    if (this.props !== nextProps){
      nextState.isLocalMode = false;
    } else {
      nextState.isLocalMode = true;
    }

    return true;
  },


  componentWillReceiveProps: function(nextProps){
    if (this.props !== nextProps){
      if (this.props.options !== nextProps.options){
        //New options come from Parent - Clear domCache, Init State
        this.state.isValidDomOptionsCache = false;
        this.state.value = '';
        this.state.isShowOption = false;
        this.state.indexActiveOption = 0;
        this.state.options = nextProps.options;
        //console.log("componentWillReceiveProps this.props.options !== nextProps.options");
      }
    }
  },

  _getDomForActiveOption: function(){
    return this.refs["v"+this.state.indexActiveOption];
  },

  _decorateOfDomActiveOption: function(domActiveOption){
    if (domActiveOption){
      domActiveOption.classList.add("option-row__active");
    }
  },

  _decorateActiveOption: function(){
    let domActiveOption = this.refs["v"+this.state.indexActiveOption];
    domActiveOption.classList.add("option-row__active");
  },

  _undecorateActiveOption: function(){
    if (this.refs["v" + this.state.indexActiveOption]){
      this.refs["v" + this.state.indexActiveOption].classList.remove("option-row__active");
    }
  },

  _undecorateOfDomActiveOption: function(domActiveOption){
     if (domActiveOption){
       domActiveOption.classList.remove("option-row__active");
    }
  },

  _makeVisibleOfDomActiveOption: function(domActiveOption){
    if (domActiveOption){
      const offsetTop = domActiveOption.offsetTop;
      const scrollTop = this.refs.options.scrollTop;
      if ( (offsetTop - scrollTop) > 70){
         this.refs.options.scrollTop += (offsetTop - scrollTop - 70);
      }
      if ( (offsetTop - scrollTop) < 0){
        this.refs.options.scrollTop= 0;
      }
    }
  },

  _makeVisibleActiveOption: function(){
    let domActiveOption = this.refs["v"+this.state.indexActiveOption];

    let offsetTop = domActiveOption.offsetTop;
    let scrollTop = this.refs.options.scrollTop;
    if ( (offsetTop - scrollTop) > 70){
        this.refs.options.scrollTop += (offsetTop - scrollTop - 70);
    }
  },

  componentDidUpdate: function(){
     //Decorate Active Option
     if (this.state.isShowOption){
       let domActiveOption = this._getDomForActiveOption();
       this._decorateOfDomActiveOption(domActiveOption);
       this._makeVisibleOfDomActiveOption(domActiveOption);
    }
  },

  _filterOptionsToState: function(options, value){
     this.state.value = value;
     this.state.isShowOption = true;

     value = value.toLowerCase();
     this.state.options = _.filter(options, function(option){
       return option.caption.toLowerCase().indexOf(value) !== -1
     });
  },

  _handlerInputChange: function(event){
    let value;
    value = event.target.value;

    if (value.length !== this.state.value.length){

      if ( value.length>this.state.value.length){
        this._filterOptionsToState(this.state.options, value);
      } else if ( value.length<this.state.value.length) {
        this._filterOptionsToState(this.props.options, value);
      }

      if (this.state.options.length === 0){
        this.state.options.push({caption: 'No results found', value: 'noresult'});
      }

      this._undecorateActiveOption();
      this.state.indexActiveOption = 0;
      this.state.isValidDomOptionsCache = false;
      this.setState(this.state);

    }
  },

  _handlerInputKeyDown: function(event){
    switch(event.keyCode){
      // enter
      case 13:
        let item = this.state.options[this.state.indexActiveOption];

         this.state.value = this.state.options[this.state.indexActiveOption].caption;
         this.state.isShowOption = false;
         this.state.isValidDomOptionsCache = true;
         this.setState(this.state);

         if (item.value !== 'noresult'){
           this.props.onSelect(item);
         } else {
           this.props.onSelect(null);
         }
      break;
      //escape
      case 27:
        if (this.state.isShowOption){
          this.state.isShowOption = false;
          this.setState(this.state);
        } else {
           this.state.value = '';
           this.state.isShowOption = false;
           this.state.options = this.props.options;
           this.state.indexActiveOption = 0;
           this.state.isValidDomOptionsCache = false;
           this.setState(this.state);
           this.props.onSelect(null);
        }
      break;
      //down
      case 40:
        if (!this.state.isShowOption){
          this.state.isShowOption = true;
          this.setState(this.state);
        } else {
          event.preventDefault();

          let domActiveOption = this._getDomForActiveOption();

          if (domActiveOption){
             this._undecorateOfDomActiveOption(domActiveOption);

             this.state.indexActiveOption += 1;
             if (this.state.indexActiveOption>=this.state.options.length){
                this.state.indexActiveOption = 0;
                this.refs.options.scrollTop = 0;
             }

             domActiveOption = this._getDomForActiveOption();
             this._decorateOfDomActiveOption(domActiveOption)

             const offsetTop = this.refs["v"+this.state.indexActiveOption].offsetTop;
             const scrollTop = this.refs.options.scrollTop;
             if ( (offsetTop - scrollTop) > 70){
                this.refs.options.scrollTop += (offsetTop - scrollTop - 70);
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

            this.state.indexActiveOption -= 1;
            if (this.state.indexActiveOption < 0){
              this.state.indexActiveOption = this.state.options.length - 1;
              const offsetTop2 = this.refs["v"+this.state.indexActiveOption].offsetTop;
              this.refs.options.scrollTop = offsetTop2;
            }

            domActiveOption = this._getDomForActiveOption();
            this._decorateOfDomActiveOption(domActiveOption);

            const offsetTop = domActiveOption.offsetTop;
            const scrollTop = this.refs.options.scrollTop;
            if ( (offsetTop - scrollTop) < 70){
              this.refs.options.scrollTop -= ( 70 - (offsetTop - scrollTop) );
            }
          }
        }
      break;
      default: /*console.log(event.keyCode);*/ return;
    }
  },

  _handlerToggleOptions: function(){
    this.state.isShowOption = ! this.state.isShowOption;
    this.setState(this.state);
  },

  _handlerClickOption: function(item, index, event){
    this.state.indexActiveOption = index;
    this.state.value = item.caption;
    this.state.isShowOption = false;
    this.setState(this.state);

    this.props.onSelect(item);
  },


  renderOptions: function(){
    let styleOptions = this.state.isShowOption ? {display: 'block'} : { display: 'none'};
    let domOptions;

    if (this.state.options){
      if (!this.state.isValidDomOptionsCache){
         domOptions = this.state.options.map((item, index)=>{
           let styleDiv = (index % 2 === 0) ? styles.itemOdd : styles.itemEven;
           return (
             <div
                className="option-row"
                style={Object.assign({},styles.itemDiv,styleDiv)}
                key={index}
                ref={"v"+index}
                onClick={this._handlerClickOption.bind(this, item, index)}>{item.caption}</div>
           )
        });
        this.state.domOptionsCache = domOptions;
      } else {
        domOptions = this.state.domOptionsCache;
      }
    }

    let styleDivWidth = null;
    if (this.props.width){
      styleDivWidth = { width: this.props.width+'px' };
    }

    let numberFilteredItems;
    if (this.state.options[0]){
      if (this.state.options[0].value !== 'noresult'){
        numberFilteredItems = this.state.options.length;
      } else {
        numberFilteredItems = 0;
      }
    } else {
      numberFilteredItems = 0;
    }

    let numberAllItems = this.props.options ? this.props.options.length : 0;


    return (
        <div style={Object.assign({}, styles.rootOptionDiv, styleOptions, styleDivWidth)}>
          <div ref="options" key="1" style={Object.assign({}, styles.optionDiv, styleOptions, styleDivWidth)}>
            {domOptions}
          </div>
          <div key="2" style={styles.optionsFooter}>
            <span style={styles.fileredSpan}>
              Filtered {numberFilteredItems} : {numberAllItems}
            </span>
          </div>
        </div>
    )
  },

  render: function(){
    let value = this.state.value;
    let styleOptions = this.state.isShowOption ? {display: 'block'} : { display: 'none'};
    let styleArrow = this.state.isShowOption ? {borderColor: '#1B75BB transparent transparent'} : null;

    let styleDivWidth = null;
    let styleInputWidth = null;
    let styleHr = null;
    if (this.props.width){
      styleDivWidth = { width: this.props.width+'px' };
      styleInputWidth = { width: (this.props.width-30) + 'px'};
      styleHr = { width: (this.props.width-40) + 'px'};
    }

    let domOptions = null;
    if (this.state.isLocalMode){
      domOptions =  this.renderOptions();
    } else {
      if (this.state.isShowOption){
        domOptions =  this.renderOptions();
      }
    }

    return (
      <div style={Object.assign({},styles.rootDiv, styleDivWidth)}>
        <input
           ref="inputText"
           type="text"
           value={value}
           style={Object.assign({},styles.inputText,styleInputWidth)}
           placeholder="Select..."
           translate={false}
           onChange={this._handlerInputChange}
           onKeyDown={this._handlerInputKeyDown}></input>
        <span
           style={styles.arrowCell}
           onClick={this._handlerToggleOptions}>
          <span style={Object.assign({},styles.arrow, styleArrow)}></span>
        </span>

        <hr style={Object.assign({},styles.inputHr, styleHr)}></hr>

        {domOptions}
      </div>
    )
  },

  focusInput: function(){
    this.refs.inputText.focus();
  },

  focusNotValidInput: function(){
    this.refs.inputText.focus();
  },

});

export default ZhSelect;
