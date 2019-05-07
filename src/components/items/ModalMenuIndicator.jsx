import React, { Component, Fragment } from 'react';
//import PropTypes from "prop-types";

import seriaFn from '../../math/seriaFn'
import IndicatorBuilder from '../../charts/IndicatorBuilder'

import ModalPopup from '../zhn-moleculs/ModalPopup'

import RowGrowthRate from './RowGrowthRate'
import RowPlusMinus from './RowPlusMinus'
import RowSma from './RowSma'
import InputText from '../zhn/InputText';
import SvgPlus from '../zhn/SvgPlus';
import SvgMinus from '../zhn/SvgMinus';

import S from './ModalMenu.Style'

const {
  growthRate,
  normalize
 } = seriaFn;

const {
  crMfiConfig,
  crMomAthConfig
} = IndicatorBuilder;

const INIT_MFI = "14"
const C_GROW = '#90ed7d';

const STYLE = {
  PANE: {
    width: 220,
    margin: 8
  },
  CAPTION: {
    display: 'inline-block',
    color: 'black',
    width: 48,
    fontWeight: 'bold'
  },
  MOM_ATH: {
    display: 'inline-block',
    color: 'black',
    paddingRight: 6,
    fontWeight: 'bold'
  },
  ROW: {
    paddingTop: 5
  },
  fnSpan: color => ({
    color, paddingLeft: 8
  }),
  N2: {
    width: 48
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
  GR: ['_grSeria', 'isGrowthRate', C_GROW, growthRate, true],
  NORM: ['_normSeria', 'isNormalize', C_GROW, normalize, false]
};

const NORM_CAPTION_EL = (
  <Fragment>
    Normalize (100*y<sub>t</sub>/y<sub>0</sub>)
  </Fragment>
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
      .bind(this, FNS.NORM, {})
     this._removeNormalize = this._hideSeriaBy
      .bind(this, FNS.NORM)

    this.state = {
      isGrowthRate: false,
      isNormalize: false,
      mfiDescrs: []
    }
  }


  _addSeriaBy(confArr, seriaOptions) {
    const seriaPropName = confArr[0]
    , statePropName = confArr[1]
    , color = confArr[2]
    , fn = confArr[3];

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
        this[seriaPropName] = this._chart.zhAddSeriaToYAxis({
          data: seriaData,
          color: seriaOptions.color || color,
          index: -1,
        }, seriaOptions)
      }
      this.setState({ [statePropName]: true })
    }
  }

  _hideSeriaBy(confArr) {
    const seriaPropName = confArr[0]
    , statePropName = confArr[1]
    , isRemove = confArr[4]
    , _seria = this[seriaPropName];
    if (_isSeriaInst(_seria)) {
      if (isRemove) {
        _seria.yAxis.remove()
        this[seriaPropName] = null
      } else {
        _seria.setVisible(false)
      }
      this.setState({ [statePropName]: false })
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

 render(){
    const { isShow, config, getChart, onClose } = this.props
    , { zhConfig={} } = config
    , { isWithoutSma } = zhConfig
    , { isGrowthRate, isNormalize } = this.state;
    return (
      <ModalPopup
        style={S.ROOT}
        isShow={isShow}
        onClose={onClose}
      >
        <div style={STYLE.PANE}>
          <RowGrowthRate
            is={isGrowthRate}
            onMinus={this._removeGrowRate}
            onPlus={this._addGrowRate}
          />
          <RowPlusMinus
            is={isNormalize}
            caption={NORM_CAPTION_EL}
            onMinus={this._removeNormalize}
            onPlus={this._addNormalize}
          />
          {!isWithoutSma && <RowSma
              config={config}
              getChart={getChart}
            />
          }
          {this._renderMfiPart(this._isMfi)}
          {this._momAthEl}
        </div>
      </ModalPopup>
    );
  }
}

export default ModalMenuIndicator
