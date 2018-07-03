import React, { Component } from 'react';
//import PropTypes from "prop-types";

import ChartFn from '../../charts/ChartFn'
import seriaFn from '../../math/seriaFn'

import ModalPopup from '../zhn-moleculs/ModalPopup'

import InputText from '../zhn/InputText';
import SvgPlus from '../zhn/SvgPlus';
import SvgMinus from '../zhn/SvgMinus';

import S from './ModalMenu.Style'

const { growthRate } = seriaFn;

const INIT_SMA = "50"
    , INIT_MFI = "14";
    //, INIT_RT = "1";

const C_GROW = '#90ed7d';

const STYLE = {
  PANE: {
    width: '220px',
    margin: '8px'
  },
  GR: {
    display : 'inline-block',
    color : 'black',
    fontWeight : 'bold',
    paddingRight: '8px',
    paddingBottom: '6px',
  },
  CAPTION : {
    display : 'inline-block',
    color : 'black',
    fontWeight : 'bold',
    width : '48px'
  },
  MOM_ATH: {
    display : 'inline-block',
    color : 'black',
    fontWeight : 'bold',
    paddingRight: '6px'
  },
  ROW : {
    paddingTop: '5px'
  },
  fnSpan : (color) => {
    return { color: color, paddingLeft: '8px' };
  },
  SMA_PLUS: {
    marginLeft: '16px',
    color: 'black'
  },
  N2: {
    width: '48px'
  },
  N3: {
    width: '56px'
  }
}

const _isInArrObjWithId = (arrObj, id) => {
  return !!arrObj.find(obj => obj.id === id);
};

const _crMfiDescr = (id) => ({
  id: id,
  color: '#90ed7d'
});

const _isSeriaInst = (s) => s && typeof s.setVisible == 'function'

class ModalMenuIndicator extends Component {
  /*
  static propTypes = {
    rootStyle: PropTypes.object,
    isMfi: PropTypes.bool,
    getChart: PropTypes.func,
    onAddSma: PropTypes.func,
    onRemoveSma: PropTypes.func,
    onAddMfi: PropTypes.func,
    onRemoveMfi: PropTypes.func,
    isMomAth: PropTypes.bool,
    onAddMomAth: PropTypes.func,
  }
  */

  static defaultProps = {
    getChart: () => {}
  }

  constructor(props){
    super()
    const { isMomAth } = props;
    this._momAthEl = isMomAth ? (
      <div>
        <span style={STYLE.MOM_ATH}>MOM(1) & ATH</span>
        <SvgPlus onClick={this._handleAddMomAth.bind(this)} />
      </div>
    ) : null;

    this.state = {
      isGrowRate: false,
      plusSma: 5,
      descr: [],
      mfiDescrs: []
    }
  }

  _addGrowRate = () => {
    const { _grSeria } = this;
    if (!this._chart) {
      this._chart = this.props.getChart()
    }
    if (this._chart) {
      if ( _isSeriaInst(_grSeria) ) {
        _grSeria.setVisible(true)
      } else {
        const data = this._chart.series[0].data
            //, rt = this.inputRt.getValue()
            , grData = growthRate(data);
        this._grSeria = ChartFn.addDataTo(
          this._chart, C_GROW, grData, false
        )
      }
      this.setState({ isGrowRate: true })
    }
  }
  _removeGrowRate = () => {
    const { _grSeria } = this;
    if ( _isSeriaInst(_grSeria) ) {
      _grSeria.setVisible(false);
      this.setState({ isGrowRate: false })
    }
  }

  _handleAddSma = (ev, isPlus) => {
    const period = (isPlus)
            ? this.inputSmaPlus.getValue()
            : this.inputSmaComp.getValue()
        , plus = (isPlus)
             ? this.inputPlusSma.getValue()
             : undefined
        , {descr} = this.state
        , id = (isPlus)
             ? `SMA+(${period}) +(${plus})`
             : `SMA(${period})`;

    if ( !_isInArrObjWithId(descr, id)  ){
       const color = this.props.onAddSma({ id, period, isPlus, plus });
       if (color){
         this.setState(prevState => {
            prevState.descr.push({ id, color })
            if (isPlus) {
              prevState.plusSma = plus
            }
            return prevState;
         })
       }
    }
  }

  _handleRemoveSma = (id) => {
    if (this.props.onRemoveSma(id)){
      this.setState(prevState => ({
        descr: prevState.descr.filter(d => d.id !== id)
      }))
    }
  }
  _handleRemoveMfi = (id) => {
    this.props.onRemoveMfi(id);
    this.setState(prevState => ({
      mfiDescrs: prevState.mfiDescrs.filter(d => d.id !== id)
    }))
  }

  _handleAddMfi = () => {
    const {mfiDescrs} = this.state
        , _value = this.inputMfiComp.getValue()
        , _id = 'MFI(' + _value + ')';

    if ( !_isInArrObjWithId(mfiDescrs, _id) ){
      this.props.onAddMfi(_value, _id);
      mfiDescrs.push(_crMfiDescr(_id))
      this.setState({ mfiDescrs: mfiDescrs });
    }
  }

  _handleAddMomAth = () => {
    this.props.onAddMomAth()
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
      );
    });
    return (
      <div>
         {_descr}
      </div>
    )
  }

  _renderMfiPart = (isMfi) => {
    return (isMfi) ? (
      <div>
        <div style={STYLE.ROW}>
          <span style={STYLE.CAPTION}>MFI</span>
            <InputText
              ref={this._refMfiComp}
              style={STYLE.N2}
              initValue={INIT_MFI}
              type="number"
            />
            <SvgPlus onClick={this._handleAddMfi} />
        </div>
        {this._renderMfi()}
      </div>
    ) : null;
  }

_renderGrowRate = (isGrowRate) => {
  return (
    <div>
      <span style={STYLE.GR}>Growth Rate</span>
      {/*<InputText
         ref={this._refRt}
         style={STYLE.N3}
         initValue={INIT_RT}
         type="number"
      />
      */}
      {
        isGrowRate
          ? <SvgMinus onClick={this._removeGrowRate} />
          : <SvgPlus onClick={this._addGrowRate} />
      }
    </div>
  );
}

_refMfiComp = c => this.inputMfiComp = c
_refSmaPlus = c => this.inputSmaPlus = c
_refPlusSma = c => this.inputPlusSma = c
_refSmaComp = c => this.inputSmaComp = c
//_refRt = c => this.inputRt = c

 render(){
    const { isShow, isMfi, onClose } = this.props
        , { isGrowRate, plusSma } = this.state;
    return (
      <ModalPopup
        style={S.ROOT}
        isShow={isShow}
        onClose={onClose}
      >
        <div style={STYLE.PANE}>
          {this._renderGrowRate(isGrowRate)}
          <div>
            <span style={STYLE.CAPTION}>SMA+</span>
            <InputText
               ref={this._refSmaPlus}
               style={STYLE.N3}
               initValue={INIT_SMA}
               type="number"
            />
            <SvgPlus onClick={this._handleAddSma.bind(null, true)} />
            <span style={STYLE.SMA_PLUS}>
              +
            </span>
            <InputText
               ref={this._refPlusSma}
               initValue={plusSma}
               type="number"
            />
          </div>
          <div>
            <span style={STYLE.CAPTION}>SMA</span>
            <InputText
               ref={this._refSmaComp}
               style={STYLE.N3}
               initValue={INIT_SMA}
               type="number"
            />
            <SvgPlus onClick={this._handleAddSma} />
          </div>
          {this._renderIndicators()}
          {this._renderMfiPart(isMfi)}
          {this._momAthEl}
        </div>
      </ModalPopup>
    );
  }
}

export default ModalMenuIndicator
