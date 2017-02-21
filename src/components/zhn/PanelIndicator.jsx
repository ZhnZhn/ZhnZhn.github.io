import React, { Component } from 'react';

import ShowHide from './ShowHide';
import InputText from './InputText';
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
    display : 'inline-block',
    color : 'black',
    fontWeight : 'bold',
    width : '48px'
  }
}

class PanelIndicator extends Component {
  state = {
    descr : [],
    mfiDescrs : []
  }

  _checkIfAlreadyAdded = (arrObj, id) => {
    const result = arrObj.find(obj => obj.id === id);
    if (result === undefined){
      return false;
    } else {
      return true;
    }
  }

  _handleAddSma = () => {
    const value = this.refs.inputSMA.getValue()
        , {descr} = this.state
        , _id = 'SMA(' + value + ')';

    if ( !this._checkIfAlreadyAdded(descr, _id)  ){
       const color = this.props.onAddSma(value);
       if (color){
          descr.push({
            id : _id,
            color : color
          });
        this.setState({descr : descr});
       }
    }
  }
  _handleRemoveSerias = (id) => {
    if (this.props.onRemoveSeries(id)){
       this.state.descr = this.state.descr.filter((descr) =>{
         return descr.id !== id
       });
       this.setState({descr : this.state.descr});
    }
  }
  _handleRemoveMfi = (id) => {
    this.props.onRemoveMfi(id);
    this.state.mfiDescrs = this.state.mfiDescrs.filter((descr) =>{
         return descr.id !== id
    });
    this.setState({mfiDescrs : this.state.mfiDescrs});
  }

  _handleAddMfi = () => {
    const {mfiDescrs} = this.state
        , _value = this.refs.inputMfi.getValue()
        , _id = 'MFI(' + _value + ')';

    if ( !this._checkIfAlreadyAdded(mfiDescrs, _id)  ){
        this.props.onAddMfi(_value, _id);
        mfiDescrs.push({
            id : _id,
            color : 'green'
        });
        this.setState({mfiDescrs : mfiDescrs});
    }
  }

  _renderIndicators = () => {
    const _descr = this.state.descr.map((descr, index) => {
      const {id, color} = descr;
      return (
        <div key={id} style={{paddingTop: '5px'}}>
          <SvgMinus
             onClick={this._handleRemoveSerias.bind(null, id)}
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
  }

  _renderMfi = () => {
    const _descr = this.state.mfiDescrs.map((descr, index) => {
      const {id, color} = descr;
      return (
        <div key={id} style={{paddingTop: '5px'}}>
          <SvgMinus
             onClick={this._handleRemoveMfi.bind(null, id)}
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
  }

  render(){
    const {isShow, isMfi} = this.props

    const _mfiDom = (isMfi) ? (
      <div>
        <div style={{paddingTop: '5px'}}>
          <span style={styles.captionSpan}>MFI</span>
            <InputText
              ref="inputMfi"
              initValue="14"
            />
            <SvgPlus onClick={this._handleAddMfi} />
        </div>
        {this._renderMfi()}
      </div>
    ) : null;

    return (
      <ShowHide isShow={isShow} style={styles.rootDiv}>
        <div>
          <span style={styles.captionSpan}>SMA</span>
          <InputText
             ref="inputSMA"
             initValue="50"
          />
          <SvgPlus onClick={this._handleAddSma} />
        </div>
        {this._renderIndicators()}

        {_mfiDom}

      </ShowHide>
    )
  }
}

export default PanelIndicator
