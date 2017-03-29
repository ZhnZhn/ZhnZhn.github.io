import React, { Component, PropTypes } from 'react';

import SubPanel from './SubPanel';
import InputText from '../zhn/InputText';
import SvgPlus from '../zhn/SvgPlus';
import SvgMinus from '../zhn/SvgMinus';

const INIT_SMA = "50"
    , INIT_MFI = "14";

const STYLE = {
  CAPTION : {
    display : 'inline-block',
    color : 'black',
    fontWeight : 'bold',
    width : '48px'
  },
  ROW : {
    paddingTop: '5px'
  },
  fnSpan : (color) => {
    return { color: color, paddingLeft: '8px' };
  }
}

class PanelIndicator extends Component {
  static propTypes = {
    rootStyle: PropTypes.object,
    isMfi: PropTypes.bool,
    onAddSma: PropTypes.func,
    onRemoveSma: PropTypes.func,
    onAddMfi: PropTypes.func,
    onRemoveMfi: PropTypes.func
  }

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
    const value = this.inputSmaComp.getValue()
        , {descr} = this.state
        , _id = 'SMA(' + value + ')';

    if ( !this._checkIfAlreadyAdded(descr, _id)  ){
       const color = this.props.onAddSma(value);
       if (color){
          descr.push({ id : _id, color : color });
        this.setState({descr : descr});
       }
    }
  }
  _handleRemoveSma = (id) => {
    if (this.props.onRemoveSma(id)){
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
        , _value = this.inputMfiComp.getValue()
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
        <div key={id} style={STYLE.ROW}>
          <SvgMinus
             onClick={this._handleRemoveSma.bind(null, id)}
          />
          <span style={STYLE.fnSpan(color)}>{id}</span>
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
        <div key={id} style={STYLE.ROW}>
          <SvgMinus
             onClick={this._handleRemoveMfi.bind(null, id)}
          />
          <span style={STYLE.fnSpan(color)}>{id}</span>
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
    const { rootStyle, isMfi } = this.props

    const _mfiDom = (isMfi) ? (
      <div>
        <div style={STYLE.ROW}>
          <span style={STYLE.CAPTION}>MFI</span>
            <InputText
              ref={c => this.inputMfiComp = c}
              initValue={INIT_MFI}
            />
            <SvgPlus onClick={this._handleAddMfi} />
        </div>
        {this._renderMfi()}
      </div>
    ) : null;

    return (
      <SubPanel style={rootStyle}>
        <div>
          <span style={STYLE.CAPTION}>SMA</span>
          <InputText
             ref={c => this.inputSmaComp = c}
             initValue={INIT_SMA}
          />
          <SvgPlus onClick={this._handleAddSma} />
        </div>
        {this._renderIndicators()}
        {_mfiDom}
      </SubPanel>
    );
  }
}

export default PanelIndicator
