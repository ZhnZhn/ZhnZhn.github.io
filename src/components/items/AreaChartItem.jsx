import React, { Component } from 'react';
//import PropTypes from "prop-types";

import has from '../has'
import A from '../Comp'
import ChartToolBar from '../toolbars/ChartToolBar';
import crModelMore from './AreaMore'
import Header from './Header';
import ChartLegend from './ChartLegend'
import MiniCharts from './MiniCharts';
import PanelDataInfo from './PanelDataInfo';

const CL = {
  ROOT: 'chart-item'
};

const S = {
  TAB_DIV: {
    position: 'relative',
    backgroundColor: 'transparent',
    zIndex: 2,
    height: 30
  },
  SHOW_HIDE: {
    marginLeft: 8
  },
  WRAPPER: {
    marginTop: 6
  },
  DATA_SOURCE: {
    position: 'absolute',
    left: 5,
    bottom: 0,
    color: '#909090',
    fontSize: '11px'
  }
};

const _isFn = fn => typeof fn === 'function';
const _isNarrowWidth = !has.wideWidth();

class AreaChartItem extends Component {
  /*
  static propTypes = {
    caption: PropTypes.string,
    chartType: PropTypes.string,
    config: PropTypes.shape({
      zhConfig: PropTypes.shape({
        dataSource: PropTypes.string,
        itemCaption: PropTypes.string
      }),
      zhMiniConfigs: PropTypes.arrayOf(
        PropTypes.shape({
          btTitle: PropTypes.string,
          config: PropTypes.object
      }))
    }),
    onAddToWatch: PropTypes.func,
    onSetActive: PropTypes.func,
    onShowConfigDialog: PropTypes.func,
    onCloseItem: PropTypes.func,
    isAdminMode: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.bool
    ]),
    crValueMoving: PropTypes.func,
    onZoom: PropTypes.func
  }
  */

  constructor(props){
    super(props)

    this._handleToggleOpen = this._toggle.bind(this, 'isOpen')
    this._handleClickLegend = this._toggle.bind(this, 'isShowLegend')
    this._handleToggleToolbar = this._toggle.bind(this, 'isShowToolbar')

    this._moreModel = crModelMore(this, {
      onToggle: this._handleToggleToolbar,
      onToTop: props.onToTop,
      onHideCaption: this.hideCaption
    })

    this._fnOnCheck = this._handleCheckBox.bind(this, true)
    this._fnOnUnCheck = this._handleCheckBox.bind(this, false)

    const { config={}, caption='' } = props
    , { zhConfig={} } = config
    , { dataSource='', itemCaption, id } = zhConfig
    , _itemCaption = itemCaption || caption;

    this._chartId = id

    this._dataSourceEl = (
       <div style={S.DATA_SOURCE}>
         {dataSource}
       </div>
    )
    this.state = {
      isOpen: true,
      isShowToolbar: true,
      isShowLegend: false,

      isShowChart: true,
      isShowInfo: false,

      itemCaption: _itemCaption,
      mfiConfigs: [],

      isShowAbs: true,
      miniTitles: [],

      isCaption: true
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps) {
      return false;
    }
    return true;
  }

  hideCaption = () => {
    this.mainChart.zhHideCaption()
    this.setState({
      isShowToolbar: false,
      isCaption: false
    })
  }
  showCaption = () => {
    if (!this.state.isCaption) {
      this.mainChart.zhShowCaption()
      this.setState({
        isShowToolbar: true,
        isCaption: true
      })
    }
  }

  setItemCaption = (str) => {
    this.setState({ itemCaption: str })
  }
  setDataSource = (strDataSource) => {
    this._dataSourceEl = (
       <div style={S.DATA_SOURCE}>
         {strDataSource}
       </div>
    )
    this.forceUpdate()
  }

  componentDidMount(){
    this.mainChart = this.chartComp.getChart()
  }

  getMainChart = () => {
    return this.mainChart;
  }

  _handleLoadedMiniChart = (metricChart) => {
     if (this.mainChart) {
       this.mainChart.zhAddDetailChart(metricChart)
     }
  }
  _handleUnLoadedMiniChart = (objChart) => {
    if (this.mainChart) {
      this.mainChart.zhRemoveDetailChart(objChart)
    }
  }

  _toggle = (propName) => {
    this.setState(prevState =>({
      [propName]: !prevState[propName]
    }))
  }

  _handleToggleSeria = (item) => {
    this.mainChart.zhToggleSeria(item.index)
  }

  _handleClick2H = () => {
    this.mainChart.zhToggle2H()
  }

  _handleZoom = () => {
    const { onZoom } = this.props;
    if (_isFn(onZoom)) {
      onZoom({ chart: this.mainChart })
    }
  }

  _handleAddToWatch = () => {
    const { caption, config, onAddToWatch } = this.props;
    onAddToWatch( {caption, config} )
  }

  _handleCopy = () => {
    this.props.onCopy(this.mainChart)
  }
  _handlePasteTo = () => {
    this.props.onPasteToDialog({
      toChart: this.mainChart,
      fromChart: this.props.getCopyFromChart()
    })
  }
  _toggleMinMax = () => {
    this.mainChart.zhToggleMinMaxLines()
  }

  _handleClickInfo = () => {
    this.setState({
      isShowInfo: true,
      isShowChart: false,
      isShowLegend: false
    });
  }

  _handleClickChart = () => {
    this.setState({
       isShowChart: true,
       isShowInfo: false
     });
  }

  _handleCheckBox = (isCheck, checkBox) => {
    const { chartType, onSetActive } = this.props;
    checkBox.chartType = chartType
    onSetActive(isCheck, checkBox, this.mainChart)
  }

  _addMfi = (config, id) => {
    this.setState(prevState => {
      prevState.mfiConfigs.push({ config, id })
      return prevState;
    })
  }
  _removeMfi = (id) => {
    this.setState(prevState => {
      prevState.mfiConfigs = prevState.mfiConfigs
         .filter(c => c.id !== id)
      return prevState;
    })
  }

  _handleClickConfig = () => {
    const { caption, onShowConfigDialog } = this.props;
    onShowConfigDialog({
      caption,
      chart: this.mainChart,
      setItemCaption: this.setItemCaption,
      setDataSource: this.setDataSource,
      onToggleToolbar: this._handleToggleToolbar
    })
  }

  _crValueMoving = (prev, dateTo) => {
     return this.props.crValueMoving(this.mainChart, prev, dateTo);
  }

  _regCompVm = (comp) => {
    this._compVm = comp
  }
  compareTo(dateTo){
    if (this._compVm) {
      return this._compVm._updateDateTo(dateTo);
    }
  }

 _handleMiniChart = (btTitle) => {
   const { ChartFn } = this.props;
   this.setState(prevState => {
     const _titles = prevState.miniTitles
         , _t = _titles.find(t => t === btTitle);
     prevState.miniTitles = _t
       ? _titles.filter(t => t !== btTitle)
       : [btTitle, ..._titles]
     prevState.isShowAbs = prevState.miniTitles.length === 0
       ? true : false;
     this.mainChart.update(
       ChartFn.arMetricOption(
         this.mainChart, prevState.isShowAbs
       )
     )
     return prevState;
   })
 }

 _createChartToolBar = (config, withoutAnimation) => {
   const { isShowToolbar } = this.state;
   return (
         <A.ShowHide
            isShow={isShowToolbar}
            withoutAnimation={withoutAnimation}
         >
           <ChartToolBar
             style={S.TAB_DIV}
             chartId={this._chartId}
             config={config}
             onMiniChart={this._handleMiniChart}
             getChart={this.getMainChart}
             onAddMfi={this._addMfi}
             onRemoveMfi={this._removeMfi}
             onClickLegend={this._handleClickLegend}
             onClick2H={this._handleClick2H}
             onAddToWatch={this._handleAddToWatch}
             onClickInfo={this._handleClickInfo}
             onClickConfig={this._handleClickConfig}
             onCopy={this._handleCopy}
             onPasteTo={this._handlePasteTo}
             onMinMax={this._toggleMinMax}
             onZoom={this._handleZoom}
            />
         </A.ShowHide>
      );
   }

  _refChartComp = comp => this.chartComp = comp

  render(){
    const {
        caption, config={},
        onCloseItem, isAdminMode
      } = this.props
    , { zhConfig={}, zhMiniConfigs } = config
    , { itemTime, legend, withoutAnimation } = zhConfig
    , {
        isOpen, isShowChart, isShowInfo,
        isShowLegend,
        itemCaption,
        mfiConfigs,
        isShowAbs,
        miniTitles,
        isCaption
    } = this.state
    , _withoutAnimation = _isNarrowWidth || withoutAnimation;

    return (
      <div className={CL.ROOT}>
         { isCaption && <Header
            isOpen={isOpen}
            moreModel={this._moreModel}
            onCheck={this._fnOnCheck}
            onUnCheck={this._fnOnUnCheck}
            itemCaption={itemCaption}
            itemTitle={caption}
            itemTime={itemTime}
            onToggle={this._handleToggleOpen}
            valueMoving={config.valueMoving}
            onClose={onCloseItem}
            isAdminMode={isAdminMode}
            crValueMoving={this._crValueMoving}
            regCompVm={this._regCompVm}
         />
        }
        <A.ShowHide
           isShow={isOpen}
           withoutAnimation={_withoutAnimation}
           style={S.SHOW_HIDE}
        >
           {isShowChart && this._createChartToolBar(config, _withoutAnimation)}
           <A.HighchartWrapper
              ref={this._refChartComp}
              isShow={isShowChart}
              style={S.WRAPPER}
              config={config}
              isShowAbs={isShowAbs}
              absComp={this._dataSourceEl}
           />
           <PanelDataInfo
              isShow={isShowInfo}
              info={config.info}
              zhInfo={config.zhConfig}
              onClickChart={this._handleClickChart}
           />
           <ChartLegend
             isShow={isShowLegend}
             legend={legend}
             onClickItem={this._handleToggleSeria}
           />
           <MiniCharts
              configs={mfiConfigs}
              absComp={this._dataSourceEl}
              onLoaded={this._handleLoadedMiniChart}
              onWillUnLoaded={this._handleUnLoadedMiniChart}
           />
           <MiniCharts
              configs={zhMiniConfigs}
              idPropName="btTitle"
              ids={miniTitles}
              absComp={this._dataSourceEl}
              onLoaded={this._handleLoadedMiniChart}
              onWillUnLoaded={this._handleUnLoadedMiniChart}
           />
        </A.ShowHide>
      </div>
    )
  }

  reflowChart(width){
    if (this.mainChart) {
      const _isAnimate = !_isNarrowWidth && this.mainChart.zhIsAnimation()
      , zhDetailCharts = this.mainChart.zhGetDetailCharts();

      this.mainChart.setSize(width, undefined, _isAnimate)
      if (Array.isArray(zhDetailCharts)) {
        const { ChartFn } = this.props
        , spacingLeft = ChartFn.arCalcDeltaYAxis(this.mainChart);
        zhDetailCharts.forEach(chart => {
          if (spacingLeft) {
            chart.update({ chart: { spacingLeft } }, false)
          }
          chart.setSize(width, undefined, _isAnimate)
        })
      }
    }
  }

}

export default AreaChartItem
