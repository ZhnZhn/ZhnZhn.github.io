import React, { Component, Fragment } from 'react';
//import PropTypes from "prop-types";

import seriaFn from '../../math/seriaFn'
import IndicatorBuilder from '../../charts/IndicatorBuilder'

import ModalPopup from '../zhn-moleculs/ModalPopup'

import RowGrowthRate from './RowGrowthRate'
import RowPlusMinus from './RowPlusMinus'
import RowSma from './RowSma'
import RowMfi from './RowMfi'

import S from './ModalMenu.Style'

const {
  growthRate,
  normalize
 } = seriaFn;

const {
  crMomAthConfig
} = IndicatorBuilder;

const C_GROW = '#90ed7d';

const STYLE = {
  PANE: {
    width: 230,
    margin: 8
  },
  CAPTION: {
    display: 'inline-block',
    color: 'black',
    width: 48,
    fontWeight: 'bold'
  },
  ROW_MOM_ATH: {
    paddingRight: 10
  },
  ROW: {
    paddingTop: 5
  },
  N2: {
    width: 48
  }
};

const MOM_ATH = 'MOM_ATH';


const _isFn = fn => typeof fn === 'function';

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
    this._isMomAth = !!config.zhIsMomAth

    this._addGrowRate = this._addSeriaBy
     .bind(this, FNS.GR)
    this._removeGrowRate = this._hideSeriaBy
     .bind(this, FNS.GR)

     this._addNormalize = this._addSeriaBy
      .bind(this, FNS.NORM, {}, undefined)
     this._removeNormalize = this._hideSeriaBy
      .bind(this, FNS.NORM)

    this.state = {
      isGrowthRate: false,
      isNormalize: false,
      isMomAth: false
    }
  }


  _addSeriaBy(confArr, seriaOptions, fnOptions) {
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
            , seriaData = fn(data, fnOptions);
        this[seriaPropName] = this._chart.zhAddSeriaToYAxis({
          data: seriaData,
          color: seriaOptions.color || color,
          yIndex: -1
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

  _handleAddMomAth = () => {
    const chart = this.props.getChart()
    , config = crMomAthConfig(chart, this.props.chartId)
    if (config) {
      this.props.onAddMfi(config, MOM_ATH)
      this.setState({ isMomAth: true })
    }
  }
  _handleRemoveMomAth = () => {
    this.props.onRemoveMfi(MOM_ATH)
    this.setState({ isMomAth: false })
  }

 render(){
    const {
      isShow, config,
      getChart, onClose,
      onAddMfi, onRemoveMfi
    } = this.props
    , { zhConfig={} } = config
    , { isWithoutSma } = zhConfig
    , {
      isGrowthRate,
      isNormalize,
      isMomAth
    } = this.state;
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
          {this._isMfi && <RowMfi
              getChart={getChart}
              onAddMfi={onAddMfi}
              onRemoveMfi={onRemoveMfi}
           />
          }
          {this._isMomAth && <RowPlusMinus
             is={isMomAth}
             styleCaption={S.ROW_MOM_ATH}
             caption="MOM(1) & ATH"
             onPlus={this._handleAddMomAth}
             onMinus={this._handleRemoveMomAth}
           />
          }
        </div>
      </ModalPopup>
    );
  }
}

export default ModalMenuIndicator
