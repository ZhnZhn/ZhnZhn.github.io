import React, { Component } from 'react';
//import PropTypes from "prop-types";

import ButtonTab from '../zhn/ButtonTab'

import ModalMenuIndicator from './ModalMenuIndicator'
import ModalMenuFn from './ModalMenuFn'
import ModalMenuMini from './ModalMenuMini'

const CL = {
  SCROLL: "with-scroll-x",
  BT_R: "with-scroll-x__bt-r"
};

const S = {
  BT_IND: {
    left: 8
  },
  M_IND: {
    top: 60,
    left: 5
  },
  BT_LEGEND: {
    left: 115
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
    left: 350,
    width: 68
  },
  M_MINI: {
    top: 60,
    left: 290
  },
  BT_R: {
    left: 440,
    width: 36
  }
};

const _isFn = fn => typeof fn === 'function';
const _isNumber = n => typeof n === 'number';

const _isHrzScrollable = node  => node
  && node.scrollWidth > node.clientWidth;

const _scrollNodeToLeft = (node, left) => {
  if ( _isHrzScrollable(node) ) {
   if (_isFn(node.scroll)) {
     node.scroll({ left, behavior: 'smooth'})
   } else {
     node.scrollLeft = left
   }
  }
};

const INDICATOR_TAB_TYPES = [ 'area', 'spline', 'line' ];
const _isIndicatorTab = ({ series }, isWithoutIndicator) => !isWithoutIndicator
  && Array.isArray(series)
  && series[0]
  && INDICATOR_TAB_TYPES.indexOf(series[0].type) !== -1;


const _crModalMenuStyle = (node, left) => {
  if (node && _isNumber(node.scrollLeft)) {
    return { left: left - node.scrollLeft };
  }
  return void 0;
};

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

  _hShowFn = () => {
    this.setState({
      isShowFn: true,
      fnStyle: _crModalMenuStyle(this._nodeToolbar, S.BT_FN.left)
    })
  }
  _hCloseFn = () => {
    this.setState({ isShowFn: false })
  }

  _hShowMini = () => {
    this.setState({
      isShowMini: true,
      miniStyle: _crModalMenuStyle(this._nodeToolbar, S.M_MINI.left)
    })
  }
  _hCloseMini = () => {
    this.setState({ isShowMini: false })
  }

  _hClickR = () => {
    _scrollNodeToLeft(this._nodeToolbar, 0)
  }

  /*
  shouldComponentUpdate(){
    return false;
  }
  */
  _refToolbar = node => this._nodeToolbar = node

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
        isShow={isShowInd}
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
        //isUpdatable={false}
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
         isShow={isShowMini}
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
        <div
           ref={this._refToolbar}
           className={CL.SCROLL}
           style={style}
        >
           {_btTabIndicator}
           {_btLegend}
           <ButtonTab
             style={S.BT_FN}
             caption="Fn"
             isShow={isShowFn}
             isMenu={true}
             onClick={this._hShowFn}
           />
           {_btAdd}
           {_btInfo}
           {_btTabMini}
           {_btTabMini && <ButtonTab
              className={CL.BT_R}
              style={S.BT_R}
              caption=">"
              onClick={this._hClickR}
            />
           }
        </div>
      </>
    );
  }
}

export default ChartToolbar
