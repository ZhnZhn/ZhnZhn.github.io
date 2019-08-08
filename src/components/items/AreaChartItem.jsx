import React, { Component } from 'react';
//import PropTypes from "prop-types";

import safeGet from '../../utils/safeGet'

import ShowHide from '../zhn/ShowHide';
import HighchartWrapper from '../zhn/HighchartWrapper';
import Legend from '../zhn/Legend';
import ChartToolBar from '../toolbars/ChartToolBar';
import crModelMore from './AreaMore'
import Header from './Header';
import MiniCharts from './MiniCharts';
import PanelDataInfo from './PanelDataInfo';

const CL = {
  ROOT: 'chart-item'
};

const S = {
  TAB_DIV: {
    position: 'relative',
    height: '30px',
    backgroundColor: 'transparent',
    zIndex: 2
  },
  SHOW_HIDE: {
    marginLeft: '8px'
  },
  WRAPPER: {
    marginTop: '6px'
  },
  DATA_SOURCE: {
    position: 'absolute',
    left: '5px',
    bottom: '0px',
    color: '#909090',
    fontSize: '11px'
  }
};

const _isFn = fn => typeof fn === 'function';

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
     this.mainChart.options.zhDetailCharts.push(metricChart);
  }
  _handleUnLoadedMiniChart = (objChart) => {
    const charts = safeGet(this.mainChart, 'options.zhDetailCharts')
    if (Array.isArray(charts)){
      this.mainChart.options.zhDetailCharts = charts.filter((chart) => {
        return chart !== objChart;
      })
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

 _createChartToolBar = (config) => {
   const { isShowToolbar } = this.state;
   return (
         <ShowHide isShow={isShowToolbar}>
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
         </ShowHide>
      );
   }

  _renderLegend = (config={}) => {
    const { isShowLegend } = this.state
        , { zhConfig={} } = config
        , { isWithLegend, legend } = zhConfig;
    const _compLegend = isWithLegend ? (
      <ShowHide isShow={isShowLegend}>
        <Legend
           legend={legend}
           onClickItem={this._handleToggleSeria}
        />
      </ShowHide>
    ) : null;

    return _compLegend;
  }

  _refChartComp = comp => this.chartComp = comp

  render(){
    const {
            //chartType,
            caption, config={},
            onCloseItem, isAdminMode
          } = this.props
        , { zhConfig={}, zhMiniConfigs } = config
        , { itemTime } = zhConfig
        , {
            isOpen, isShowChart, isShowInfo,
            itemCaption,
            mfiConfigs,
            isShowAbs,
            miniTitles,
            isCaption
        } = this.state;
    //console.log(config)
    return (
      <div className={CL.ROOT}>
         { isCaption && <Header
            isOpen={isOpen}
            //chartType={chartType}
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
         />
        }
        <ShowHide isShow={isOpen} style={S.SHOW_HIDE}>
           {isShowChart && this._createChartToolBar(config)}
           <HighchartWrapper
              ref={this._refChartComp}
              isShow={isShowChart}
              rootStyle={S.WRAPPER}
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
          {this._renderLegend(config)}
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
        </ShowHide>
      </div>
    )
  }

  reflowChart(width){
    const { ChartFn } = this.props
        , spacingLeft = ChartFn.arCalcDeltaYAxis(this.mainChart)
        , zhDetailCharts = this.mainChart.options.zhDetailCharts;

    this.mainChart.setSize(width, undefined, true)
    if (Array.isArray(zhDetailCharts)) {
      zhDetailCharts.forEach(chart => {
        if (spacingLeft) {
          chart.update({ chart: { spacingLeft } }, false)
        }
        chart.setSize(width, undefined, true)
      })
    }
  }

}

export default AreaChartItem
