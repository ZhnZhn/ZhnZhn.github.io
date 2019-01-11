import React, { Component, Fragment } from 'react';
//import PropTypes from "prop-types";

import ChartFn from '../../charts/ChartFn'
import seriaFn from '../../math/seriaFn'
import IndicatorBuilder from '../../charts/IndicatorBuilder'

import ModalPopup from '../zhn-moleculs/ModalPopup'

import InputText from '../zhn/InputText';
import SvgPlus from '../zhn/SvgPlus';
import SvgMinus from '../zhn/SvgMinus';

import S from './ModalMenu.Style'

const {
  growthRate,
  normalize
 } = seriaFn;

const {
  removeSeriaFrom,
  addSmaTo,
  crMfiConfig,
  crMomAthConfig
} = IndicatorBuilder;

const INIT_SMA = "50"
    , INIT_MFI = "14";

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
};


const _isFn = fn => typeof fn === 'function';

const _isInArrObjWithId = (arrObj, id) => {
  return !!arrObj.find(obj => obj.id === id);
};

const _crMfiDescr = (id) => ({
  id: id,
  color: '#90ed7d'
});

const _isSeriaInst = (s) => s && _isFn(s.setVisible);

const FNS = {
  GR: ['_grSeria', 'isGrowRate', C_GROW, growthRate],
  NORM: ['_normSeria', 'isNormalize', C_GROW, normalize]
};

const NORM_CAPTION_EL = (
  <Fragment>
    Normalize (100*y<sub>t</sub>/y<sub>0</sub>)
  </Fragment>
);

const RowMinusPlus = ({ is, caption, onMinus, onPlus }) => (
  <div>
    <span style={STYLE.GR}>
       {caption}
    </span>
    {
      is ? <SvgMinus onClick={onMinus} />
         : <SvgPlus onClick={onPlus} />
    }
  </div>
);

class ModalMenuIndicator extends Component {
  /*
  static propTypes = {
    rootStyle: PropTypes.object,
    chartId: PropTypes.string,
    config: PropTypes.object,
    getChart: PropTypes.func,
    onAddMfi: PropTypes.func,
    onRemoveMfi: PropTypes.func,
  }
  */

  static defaultProps = {
    getChart: () => {}
  }

  constructor(props){
    super(props)

    const { config } = props;
    this._isMfi = !!config.zhIsMfi
    this._momAthEl = config.zhIsMomAth ? (
      <div>
        <span style={STYLE.MOM_ATH}>MOM(1) & ATH</span>
        <SvgPlus onClick={this._handleAddMomAth.bind(this)} />
      </div>
    ) : null;

    this._addGrowRate = this._addSeriaBy
     .bind(this, FNS.GR)
    this._removeGrowRate = this._hideSeriaBy
     .bind(this, FNS.GR)

     this._addNormalize = this._addSeriaBy
      .bind(this, FNS.NORM)
     this._removeNormalize = this._hideSeriaBy
      .bind(this, FNS.NORM)

    this.state = {
      isGrowRate: false,
      isNormalize: false,
      plusSma: 5,
      descr: [],
      mfiDescrs: []
    }
  }


  _addSeriaBy(arr) {
    const seriaPropName = arr[0]
    , statePropName = arr[1]
    , color = arr[2]
    , fn = arr[3];

    const _seria = this[seriaPropName];
    if (!this._chart) {
      this._chart = this.props.getChart()
    }
    if (this._chart) {
      if ( _isSeriaInst(_seria) ) {
        _seria.setVisible(true)
      } else {
        const data = this._chart.series[0].data
            , seriaData = fn(data);
        this[seriaPropName] = ChartFn.addDataTo(
          this._chart, color, seriaData, false
        )
      }
      this.setState({ [statePropName]: true })
    }
  }

  _hideSeriaBy(arr) {
    const seriaPropName = arr[0]
    , statePropName = arr[1]
    const _seria = this[seriaPropName]
    if (_isSeriaInst(_seria)) {
      _seria.setVisible(false)
      this.setState({ [statePropName]: false })
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
       const chart = this.props.getChart()
       , color = addSmaTo(chart, {
           id, period, isPlus, plus
         });
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
    const chart = this.props.getChart();
    if ( removeSeriaFrom(chart, id) ){
      this.setState(prevState => ({
        descr: prevState.descr.filter(d => d.id !== id)
      }))
    }
  }
  _handleRemoveMfi = (id) => {
    this.props.onRemoveMfi(id);
    this.setState(prevState => ({
      mfiDescrs: prevState.mfiDescrs
        .filter(d => d.id !== id)
    }))
  }

  _handleAddMfi = () => {
    const {mfiDescrs} = this.state
        , _value = this.inputMfiComp.getValue()
        , _id = 'MFI(' + _value + ')';

    if ( !_isInArrObjWithId(mfiDescrs, _id) ){
      const chart = this.props.getChart()
      , config = crMfiConfig(chart, _value, _id);
      if (config) {
        this.props.onAddMfi(config, _id)
        mfiDescrs.push(_crMfiDescr(_id))
        this.setState({ mfiDescrs: mfiDescrs });
      }
    }
  }

  _handleAddMomAth = () => {
    const chart = this.props.getChart()
    , config = crMomAthConfig(chart, this.props.chartId)
    if (config) {
      this.props.onAddMfi(config, 'MOM_ATH')
    }
  }

  _renderSma = (plusSma) => (
    <Fragment>
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
    </Fragment>
  );

  _renderIndicators = () => {
    const _descr = this.state.descr.map(descr => {
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
    );
  }

  _renderMfi = () => {
    const _descr = this.state.mfiDescrs.map(descr => {
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
    );
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

_refMfiComp = c => this.inputMfiComp = c
_refSmaPlus = c => this.inputSmaPlus = c
_refPlusSma = c => this.inputPlusSma = c
_refSmaComp = c => this.inputSmaComp = c

 render(){
    const { isShow, config, onClose } = this.props
    , { zhConfig={} } = config
    , { isWithoutSma } = zhConfig
    , {
      isGrowRate, isNormalize,
      plusSma
    } = this.state;
    return (
      <ModalPopup
        style={S.ROOT}
        isShow={isShow}
        onClose={onClose}
      >
        <div style={STYLE.PANE}>
          <RowMinusPlus
            is={isGrowRate}
            caption="Growth Rate"
            onMinus={this._removeGrowRate}
            onPlus={this._addGrowRate}
          />
          <RowMinusPlus
            is={isNormalize}
            caption={NORM_CAPTION_EL}
            onMinus={this._removeNormalize}
            onPlus={this._addNormalize}
          />
          {!isWithoutSma && this._renderSma(plusSma)}
          {this._renderIndicators()}
          {this._renderMfiPart(this._isMfi)}
          {this._momAthEl}
        </div>
      </ModalPopup>
    );
  }
}

export default ModalMenuIndicator
