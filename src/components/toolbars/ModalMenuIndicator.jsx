import { Component } from 'react';
//import PropTypes from "prop-types";

import {
  growthRate,
  changesBetween,
  normalize
} from '../../math/seriaFn';
import IndicatorBuilder from '../../charts/IndicatorBuilder'

import ModalPopup from '../zhn-moleculs/ModalPopup'

import RowType1 from './RowType1'
import RowPlusMinus from './RowPlusMinus'
import RowSma from './RowSma'
import RowMfi from './RowMfi'

import { S_MODAL_MENU } from './ModalMenu.Style'

const { crMomAthConfig } = IndicatorBuilder;

const C_GROW = '#90ed7d'
, MOM_ATH = 'MOM_ATH'
, S_PANE = {
   width: 265,
   margin: 8
};

const _isFn = fn => typeof fn === 'function';

const _isSeriaInst = (s) => s && _isFn(s.setVisible);

const FNS = {
  GR: ['ROC', 'isGrowthRate', C_GROW, growthRate, true],
  CH: ['DIFF', 'isChanges', C_GROW, changesBetween, true],
  NORM: ['NORM', 'isNormalize', C_GROW, normalize, false]
};

/*
const DEF_GROWTH_RATE = (
  <>Def: 100*(&Delta;y<sub>t1-t0</sub>/y<sub>t0</sub>)</>
);
*/

const NORM_CAPTION_EL = (
  <>
    Normalize (100*y<sub>t</sub>/y<sub>0</sub>)
  </>
);

const _isNumber = n => typeof n === 'number'

const _getSeriaIndex = (chart, { s }) => {
  const _index = _isNumber(s) ? s - 1 : 0;
  return chart?.series.length > _index
    ? _index
    : 0;
}

const _crName = (prefixStr, nOrObj) => {
  const _suffix = _isNumber(nOrObj)
    ? `(${nOrObj})`
    : '';
  return `${prefixStr}${_suffix}`;
};

class ModalMenuIndicator extends Component {
  /*
  static propTypes = {
    rootStyle: PropTypes.object,
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

     this._addChanges = this._addSeriaBy
      .bind(this, FNS.CH)
     this._removeChanges = this._hideSeriaBy
      .bind(this, FNS.CH)

     this._addNormalize = this._addSeriaBy
      .bind(this, FNS.NORM, {})
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
    , fn = confArr[3]
    , name = _crName(seriaPropName, fnOptions);
    const _seria = this[seriaPropName];
    if (!this._chart) {
      this._chart = this.props.getChart()
    }
    if (this._chart) {
      const seriaIndex = _getSeriaIndex(this._chart, seriaOptions);
      if ( _isSeriaInst(_seria) ) {
        _seria.setVisible(true)
      } else {
        const data = this._chart.series[seriaIndex].data
            , seriaData = fn(data, fnOptions);
        this[seriaPropName] = this._chart.zhAddSeriaToYAxis({
          data: seriaData,
          color: seriaOptions.color || color,
          name
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
    , config = crMomAthConfig(chart)
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
      isShow, style, config,
      getChart, onClose,
      onAddMfi, onRemoveMfi
    } = this.props
    , { zhConfig={} } = config
    , { isWithoutSma } = zhConfig
    , {
      isGrowthRate,
      isChanges,
      isNormalize,
      isMomAth
    } = this.state;
    return (
      <ModalPopup
        style={{...S_MODAL_MENU, ...style}}
        isShow={isShow}
        onClose={onClose}
      >
        <div style={S_PANE}>
          <RowType1
            is={isChanges}
            caption="Changes Between"
            onMinus={this._removeChanges}
            onPlus={this._addChanges}
          />
          <RowType1
            is={isGrowthRate}
            caption="Growth Rate"
            //Def={DEF_GROWTH_RATE}
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
