import React, { Component } from 'react';
//import PropTypes from "prop-types";

import ButtonTab from '../zhn/ButtonTab'

import ModalMenuIndicator from './ModalMenuIndicator'
import ModalMenuFn from './ModalMenuFn'
import ModalMenuMini from './ModalMenuMini'

const CL_SCROLL = "with-scroll-x";

const S = {
  BT_IND: {
    left: 2
  },
  M_IND: {
    top: 60,
    left: 6
  },
  BT_LEGEND: {
    left: 112
  },
  BT_FN: {
    left: 190
  },
  M_FN: {
    top: 60,
    left: 150
  },
  BT_ADD: {
    left: 250
  },
  BT_MINI: {
    left: 354,
    width: 68
  },
  M_MINI: {
    top: 60,
    left: 294
  },
  RIGHT_GAP: {
    position: 'relative',
    left: 430,
    width: 30,
    height: 10,
    backgroundColor: 'transparent'
  }
};

const SCR = {
  FN: {
    X: 180,
    D: 40
  },
  MINI: {
    X: 344,
    D: 100
  }
};

const INDICATOR_TAB_TYPES = [ 'area', 'spline', 'line' ];
const _isIndicatorTab = ({ series }, isWithoutIndicator) => !isWithoutIndicator
  && Array.isArray(series)
  && series[0]
  && INDICATOR_TAB_TYPES.indexOf(series[0].type) !== -1;

const _isScrolling = (evt, CONFIG) => {
  console.log(evt.clientX, evt.pageX)
  return evt.clientX !== 0
  && evt.clientX === evt.pageX
  && evt.clientX < CONFIG.X;
}

const _crModalMenuStyle = (evt, CONFIG) => _isScrolling(evt, CONFIG)
  ? { left: evt.clientX - CONFIG.D}
  : void 0;

class ChartToolbar extends Component {
  /*
  static propTypes = {
    style: PropTypes.object,
    config: PropTypes.object
  }
  */
  state = {
    isShowInd: false,
    isShowFn: false,
    isShowMini: false
  }

  _hShowInd = () => {
    this.setState({ isShowInd: true })
  }
  _hCloseInd = () => {
    this.setState({ isShowInd: false })
  }

  _hShowFn = (evt) => {
    this.setState({
      isShowFn: true,
      fnStyle: _crModalMenuStyle(evt, SCR.FN)
    })
  }
  _hCloseFn = () => {
    this.setState({ isShowFn: false })
  }

  _hShowMini = (evt) => {
    this.setState({
      isShowMini: true,
      miniStyle: _crModalMenuStyle(evt, SCR.MINI)
    })
  }
  _hCloseMini = () => {
    this.setState({ isShowMini: false })
  }

  render(){
    const {
            style, config={},
            chartId,
            onMiniChart,
            getChart,
            onAddMfi, onRemoveMfi,
            onClickLegend,
            onClick2H,
            onAddToWatch,
            onCopy,
            onPasteTo,
            onMinMax,
            onZoom,
            onClickInfo
          } = this.props
        , { zhConfig={}, info, zhMiniConfigs } = config
        , { isWithoutIndicator, isWithoutAdd, legend } = zhConfig
        , { isShowInd,
            isShowFn, fnStyle,
            isShowMini, miniStyle
          } = this.state
        , _arrModalMenu = [];

    let _btTabIndicator = null;
    if (_isIndicatorTab(config, isWithoutIndicator)) {
      _btTabIndicator = (<ButtonTab
        style= {S.BT_IND}
        caption="Indicator"
        isMenu={true}
        onClick={this._hShowInd}
      />)
      _arrModalMenu.push(<ModalMenuIndicator
        key="menu_ind"
        isShow={isShowInd}
        style={S.M_IND}
        chartId={chartId}
        config={config}
        getChart={getChart}
        onAddMfi={onAddMfi}
        onRemoveMfi={onRemoveMfi}
        onClose={this._hCloseInd}
      />)
    }

    const _btLegend = legend ? (
      <ButtonTab
        style={S.BT_LEGEND}
        caption="Legend"
        onClick={onClickLegend}
      />
    ) : null;

    const _btAdd = !isWithoutAdd ? (
      <ButtonTab
        style={S.BT_ADD}
        caption="Add"
        isUpdatable={false}
        onClick={onAddToWatch}
      />
    ) : null;

    const _btInfo = info ? (
      <ButtonTab
        caption="Info"
        onClick={onClickInfo}
      />
    ) : null;

    let _btTabMini = null;
    if (zhMiniConfigs && zhMiniConfigs.length) {
      _btTabMini = (<ButtonTab
         style= {S.BT_MINI}
         caption="Mini"
         isMenu={true}
         onClick={this._hShowMini}
      />)
      _arrModalMenu.push(<ModalMenuMini
        key="menu_mini"
        isShow={isShowMini}
        style={{...S.M_MINI, ...miniStyle}}
        configs={zhMiniConfigs}
        onClickItem={onMiniChart}
        onClose={this._hCloseMini}
      />)
    }

    return (
      <>
        <ModalMenuFn
          isShow={isShowFn}
          style={{...S.M_FN, ...fnStyle}}
          config={config}
          getChart={getChart}
          onX2H={onClick2H}
          onMinMax={onMinMax}
          onZoom={onZoom}
          onCopy={onCopy}
          onPasteTo={onPasteTo}
          onClose={this._hCloseFn}
        />
        {_arrModalMenu}
        <div className={CL_SCROLL} style={style}>
           {_btTabIndicator}
           {_btLegend}
           <ButtonTab
             style={S.BT_FN}
             caption="Fn"
             isMenu={true}
             onClick={this._hShowFn}
           />
           {_btAdd}
           {_btInfo}
           {_btTabMini}
           <div style={S.RIGHT_GAP} />
        </div>
      </>
    );
  }
}

export default ChartToolbar
