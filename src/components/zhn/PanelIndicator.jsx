import React from 'react';

import ShowHide from './ShowHide';
import SvgPlus from './SvgPlus';
import SvgMinus from './SvgMinus';

const styles = {
  rootDiv : {
    position : 'absolute',
    zIndex : 10,
    top : '55px',
    left : '8px',

    backgroundColor: 'rgb(77, 77, 77)',
    border : '2px solid rgb(35, 47, 59)',
    borderRadius : '5px',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 5px',

    padding : '10px',
    paddingTop : '5px',
    paddingBottom : '5px'
  },
  captionSpan : {
    color : 'black',
    fontWeight : 'bold'
  },
  inputText : {
    background: 'transparent none repeat scroll 0 0',
    border: 'medium none',
    outline: 'medium none',
    height: '26px',
    paddingLeft: '5px',
    color: 'green',
    width: '40px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor : '#E1E1CB',
    marginLeft : '5px',
    marginRight : '5px',
    display : 'inline'
  }
}

const PanelIndicator = React.createClass({
  getInitialState(){
     return {
       value : 50,
       descr : []
     }
  },

  _handlerInputChange(event){
     this.setState({value : event.target.value});
  },

  _handlerAddSma(){
    const {value, descr} = this.state
        , _id = 'SMA(' + value + ')'
        , result = descr.find(d => d.id === _id);

    if ( result === undefined  ){
       const color = this.props.onAddSma(value);
       if (color){
          descr.push({
            id : _id,
            color : color
          });
        this.setState({descr : descr});
       }
    }
  },
  _handlerRemoveSerias(id){
    if (this.props.onRemoveSeries(id)){
       this.state.descr = this.state.descr.filter((descr) =>{
         return descr.id !== id
       });
       this.setState({descr : this.state.descr});
    }
  },


  _renderIndicators(){
    const {onRemoveSeries} = this.props;
    const _descr = this.state.descr.map((descr, index) => {
      const {id, color} = descr;
      return (
        <div key={id} style={{paddingTop: '5px'}}>
          <SvgMinus
             onClick={this._handlerRemoveSerias.bind(null, id)}
          />
          <span style={{color: color, paddingLeft: '8px'}}>{id}</span>
        </div>
      )
    });
    return (
      <div>
         {_descr}
      </div>
    )
  },

  render(){
    const {isShow} = this.props;
    const {value} = this.state;
    return (
      <ShowHide isShow={isShow} style={styles.rootDiv}>
        <div>
          <span style={styles.captionSpan}>SMA</span>
          <input
            ref="inputSMA"
            style={styles.inputText}
            value={value}
            translate={false}
            onChange={this._handlerInputChange}
          />
          <SvgPlus onClick={this._handlerAddSma} />
        </div>
        {this._renderIndicators()}
      </ShowHide>
    )
  }
});

export default PanelIndicator
