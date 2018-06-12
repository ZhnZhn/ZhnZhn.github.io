import React, { Component } from 'react';
//import PropTypes from "prop-types";

import safeGet from '../../utils/safeGet'

import crModelMore from './AreaMore'
import Header from './Header';
import ChartToolBar from './ChartToolBar';
import MiniCharts from './MiniCharts';
import ShowHide from '../zhn/ShowHide';
import HighchartWrapper from '../zhn/HighchartWrapper';
import Legend from '../zhn/Legend';

import PanelDataInfo from '../zhn/PanelDataInfo';

const CL = {
  ROOT: 'chart-item'
};

const styles = {
  tabDiv : {
    position: 'relative',
    height: '30px',
    backgroundColor: 'transparent',
    zIndex: 2
  },
  showHide : {
    marginLeft: '8px'
  },
  wrapper: {
    marginTop: '6px'
  },
  dataSource: {
    position: 'absolute',
    left: '5px',
    bottom: '0px',
    color: '#909090',
    fontSize: '11px'
  }
}

class AreaChartItem extends Component {
  /*
  static propTypes = {
    caption: PropTypes.string,
    chartType: PropTypes.string,
    config: PropTypes.shape({
      zhConfig: PropTypes.shape({
        dataSource: PropTypes.string,
        itemCaption: PropTypes.string
      })
    }),
    onAddToWatch: PropTypes.func,
    onSetActive: PropTypes.func,
    onShowConfigDialog: PropTypes.func,
    onCloseItem: PropTypes.func,
    isAdminMode: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.bool
    ]),
    crValueMoving: PropTypes.func
  }
  */

  constructor(props){
    super()

    this._moreModel = crModelMore(this, {
      onToggle: this._handleToggleToolbar,
      onToTop: props.onToTop
    })

    this.is2H = false
    this._fnOnCheck = this._handleCheckBox.bind(this, true)
    this._fnOnUnCheck = this._handleCheckBox.bind(this, false)

    const { config={}, caption='' } = props
        , { zhConfig={} } = config
        , { dataSource='', itemCaption, id } = zhConfig
        , _itemCaption = itemCaption
              ? itemCaption : caption;

    this._chartId = id
    this._crMomAthConfig = config.zhFnMomAthConfig

    this._dataSourceEl = (
       <div style={styles.dataSource}>
         {dataSource}
       </div>
    )
    this.state = {
      isOpen: true,
      isShowToolbar: true,
      isShowChart: true,
      isShowLegend: false,
      isShowInfo: false,

      itemCaption: _itemCaption,
      mfiConfigs: [],

      isShowAbs: true,
      miniTitles: []
    }
  }

  setItemCaption = (str) => {
    this.setState({ itemCaption: str })
  }
  setDataSource = (strDataSource) => {
    this._dataSourceEl = (
       <div style={styles.dataSource}>
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

  _handleLoadedMetricChart = (metricChart) => {
     this.mainChart.options.zhDetailCharts.push(metricChart);
  }
  _handleWillUnLoadedChart = (objChart) => {
    const charts = safeGet(this.mainChart, 'options.zhDetailCharts')
    if (Array.isArray(charts)){
      this.mainChart.options.zhDetailCharts = charts.filter((chart) => {
        return chart !== objChart;
      })
    }
  }

  _handleToggleOpen = () => {
    this.setState(prevState =>({
      isOpen: !prevState.isOpen
    }))
  }

  _handleClickLegend = () => {
    this.setState(prevState =>({
      isShowLegend: !prevState.isShowLegend
    }))
  }
  _handleToggleSeria = (item) => {
    this.mainChart.options.zhToggleSeria(this.mainChart, item)
  }

  _handleClick2H = () => {
    const height = (this.is2H)
           ? this.mainChart.options.chart.height/2
           : this.mainChart.options.chart.height*2;
    this.setChartHeight(height);
    this.is2H = !this.is2H;
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
      fromChart: this.props.getCopyFromChart(),
      ChartFn: this.props.ChartFn
    })
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
    this.props.onSetActive(isCheck, checkBox, this.mainChart)
  }

  _handleAddSma = (option) => {
    option.chart = this.mainChart
    return this.mainChart.options.zhFnAddSeriesSma(option);
  }
  _handleRemoveSeries = (id) => {
    return this.mainChart.options.zhFnRemoveSeries(this.mainChart, id);
  }
  _handleAddMfi = (period, id) => {
    this.setState(prevState => {
      const config = this.mainChart.options.zhFnGetMfiConfig(this.mainChart, period, id);
      prevState.mfiConfigs.push({ config, id })
      return prevState;
    })
  }
  _handleRemoveMfi = (id) => {
    this.setState(prevState => {
      prevState.mfiConfigs = prevState.mfiConfigs
         .filter(c => c.id !== id)
      return prevState;
    })
  }
  _handleAddMomAth = () => {
     this.setState(prevState => {
       const config = this._crMomAthConfig(this.mainChart, this._chartId);
       prevState.mfiConfigs.push({ config, id: 'MOM_ATH' })
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

  _handleToggleToolbar = (value) => {
    this.setState(prevState => ({
      isShowToolbar: !prevState.isShowToolbar
    }))
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
             style={styles.tabDiv}
             config={config}
             onMiniChart={this._handleMiniChart}
             getChart={this.getMainChart}
             onAddSma={this._handleAddSma}
             onRemoveSeries={this._handleRemoveSeries}
             onAddMfi={this._handleAddMfi}
             onRemoveMfi={this._handleRemoveMfi}
             onAddMomAth={this._handleAddMomAth}
             onClickLegend={this._handleClickLegend}
             onClick2H={this._handleClick2H}
             onAddToWatch={this._handleAddToWatch}
             onClickInfo={this._handleClickInfo}
             onClickConfig={this._handleClickConfig}
             onCopy={this._handleCopy}
             onPasteTo={this._handlePasteTo}
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

  _renderIndicatorCharts = (arrConfigs) => {
    const _indicatorCharts = arrConfigs.map(objConfig => {
      const { config, id } = objConfig;
      return (
        <ShowHide isShow={true} key={id}>
          <HighchartWrapper
              isShow={true}
              config={config}
              onLoaded={this._handleLoadedMetricChart}
              onWillUnLoaded={this._handleWillUnLoadedChart}
          />
        </ShowHide>
      );
    })
    return (
      <div>
        {_indicatorCharts}
      </div>
    );
  }

  _refChartComp = comp => this.chartComp = comp

  render(){
    const {
            chartType, caption, config={},
            onCloseItem, isAdminMode
          } = this.props
        , { zhConfig={}, zhMiniConfigs } = config
        , { itemTime } = zhConfig
        , {
            isOpen, isShowChart, isShowInfo,
            itemCaption,
            mfiConfigs,
            isShowAbs,
            miniTitles
        } = this.state;

    return (
      <div className={CL.ROOT}>
         <Header
            isOpen={isOpen}
            chartType={chartType}
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
        <ShowHide isShow={isOpen} style={styles.showHide}>
           {isShowChart && this._createChartToolBar(config)}
           <HighchartWrapper
              ref={this._refChartComp}
              isShow={isShowChart}
              rootStyle={styles.wrapper}
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
          {this._renderIndicatorCharts(mfiConfigs)}

          <MiniCharts
            titles={miniTitles}
            configs={zhMiniConfigs}
            absComp={this._dataSourceEl}
            onLoaded={this._handleLoadedMetricChart}
            onWillUnLoaded={this._handleWillUnLoadedChart}
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

  setChartHeight = (height) => {
    this.mainChart.setSize(undefined, height, true)
  }
}

export default AreaChartItem
