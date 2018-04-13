import React, { Component } from 'react';
//import PropTypes from "prop-types";

import safeGet from '../../utils/safeGet'

import Header from './Header';
import ChartToolBar from './ChartToolBar';
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
    this.is2H = false
    this._fnOnCheck = this._handlerCheckBox.bind(this, true)
    this._fnOnUnCheck = this._handlerCheckBox.bind(this, false)

    const { config={}, caption='' } = props
        , { zhConfig={} } = config
        , { dataSource='', itemCaption, id } = zhConfig
        , _itemCaption = (itemCaption) ? itemCaption : caption;

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
      isShowChart : true,
      isShowLegend : false,
      isShowInfo : false,

      isInitVolume : false, isShowVolume : false,
      isATHVolume : false, isShowATH : false,
      isInitHighLow : false, isShowHighLow : false,

      itemCaption: _itemCaption,
      chartsDescription : [],
      mfiConfigs : []
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

  _handlerLoadedMetricChart = (metricChart) => {
     this.mainChart.options.zhDetailCharts.push(metricChart);
  }
  _handlerWillUnLoadedChart = (objChart) => {
    const charts = safeGet(this.mainChart, 'options.zhDetailCharts')
    if (Array.isArray(charts)){
      this.mainChart.options.zhDetailCharts = charts.filter((chart) => {
        return chart !== objChart;
      })
    }
  }

  _handlerToggleOpen = () => {
    if (this.state.isOpen){
      this.setState({ isOpen : false })
    } else {
      this.setState({ isOpen : true })
    }
  }

  _handlerClickLegend = () => {
    this.setState({ isShowLegend : !this.state.isShowLegend })
  }
  _handlerToggleSeria = (item) => {
    this.mainChart.options.zhToggleSeria(this.mainChart, item)
  }

  _handlerClick2H = () => {
    const height = (this.is2H)
           ? this.mainChart.options.chart.height/2
           : this.mainChart.options.chart.height*2;
    this.setChartHeight(height);
    this.is2H = !this.is2H;
  }

  _handlerAddToWatch = () => {
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

  _handlerClickInfo = () => {
    this.setState({
      isShowInfo: true,
      isShowChart: false,
      isShowLegend: false
    });
  }

  _handlerClickVolume = () => {

    const { ChartFn } = this.props
        , {
            isInitVolume, isShowVolume,
            chartsDescription
          } = this.state;

    this.mainChart.update(
      ChartFn.arMetricOption(this.mainChart, isShowVolume)
    )
    this.chartComp.toggleAbsComp()

    if (isInitVolume){
      this.setState({ isShowVolume: !isShowVolume })
    } else {
      chartsDescription.push({ type: 'Volume' })
      this.setState({
        chartsDescription,
        isShowVolume: true, isInitVolume: true
      })
    }
  }
  _handlerClickATH = () => {
    const { isInitATH, isShowATH } = this.state;
    if (isInitATH){
      this.setState({ isShowATH: !isShowATH })
    } else {
      this.state.chartsDescription.push({ type: 'ATH' })
      this.setState({
        chartsDescription : this.state.chartsDescription,
        isShowATH: true, isInitATH: true
      })
    }
  }
  _handlerClickHighLow = () => {
    const {isInitHighLow, isShowHighLow} = this.state;
    if (isInitHighLow){
      this.setState({isShowHighLow: !isShowHighLow});
    } else {
      this.state.chartsDescription.push({type: 'HighLow'});
      this.setState({
        chartsDescription : this.state.chartsDescription,
        isShowHighLow: true, isInitHighLow: true
      });
    }
  }


  _handlerClickChart = () => {
    this.setState({ isShowChart: true, isShowInfo: false });
  }

  _handlerCheckBox = (isCheck, checkBox) => {
    this.props.onSetActive(isCheck, checkBox, this.mainChart)
  }

  _handlerAddSma = (option) => {
    option.chart = this.mainChart
    return this.mainChart.options.zhFnAddSeriesSma(option);
  }
  _handleRemoveSeries = (id) => {
    return this.mainChart.options.zhFnRemoveSeries(this.mainChart, id);
  }
  _handlerAddMfi = (period, id) => {
    const config = this.mainChart.options.zhFnGetMfiConfig(this.mainChart, period, id);
    this.state.mfiConfigs.push({config, id})
    this.setState({ mfiConfigs: this.state.mfiConfigs })
  }
  _handlerRemoveMfi = (id) => {
    this.state.mfiConfigs = this.state.mfiConfigs.filter((objConfig) => {
      return objConfig.id !== id;
    })
    this.setState({mfiConfigs: this.state.mfiConfigs})
  }
  _handleAddMomAth = () => {
     const config = this._crMomAthConfig(this.mainChart, this._chartId);
     this.state.mfiConfigs.push({config, id: 'MOM_ATH'})
     this.setState({ mfiConfigs: this.state.mfiConfigs })
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
    this.setState(prevState => {
      return { isShowToolbar: !prevState.isShowToolbar};
    })
  }

 _createChartToolBar = (config) => {
   const { isShowToolbar } = this.state;
   return (
         <ShowHide isShow={isShowToolbar}>
           <ChartToolBar
             style={styles.tabDiv}
             config={config}
             getChart={this.getMainChart}
             onAddSma={this._handlerAddSma}
             onRemoveSeries={this._handleRemoveSeries}
             onAddMfi={this._handlerAddMfi}
             onRemoveMfi={this._handlerRemoveMfi}
             onAddMomAth={this._handleAddMomAth}
             onClickLegend={this._handlerClickLegend}
             onClick2H={this._handlerClick2H}
             onAddToWatch={this._handlerAddToWatch}
             onClickInfo={this._handlerClickInfo}
             onClickVolume={this._handlerClickVolume}
             onClickATH={this._handlerClickATH}
             onClickHighLow={this._handlerClickHighLow}
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
        , { isWithLegend, legend } = zhConfig
    const _compLegend = isWithLegend ? (
      <ShowHide isShow={isShowLegend}>
        <Legend
           legend={legend}
           onClickItem={this._handlerToggleSeria}
        />
      </ShowHide>
    ) : undefined

    return _compLegend;
  }

  _renderMetricCharts = () => {
    const { chartsDescription } = this.state;

    const _metricCharts = chartsDescription.map((descr, index) => {
      const { type } = descr
          , _isShow = this.state['isShow' + type]
          , _ref = 'chart' + type
          , _config = this.props.config['zh' + type + 'Config'];

      return (
        <ShowHide isShow={_isShow} key={index}>
          <HighchartWrapper
              ref={_ref}
              isShow={true}
              config={_config}
              absComp={this._dataSourceEl}
              onLoaded={this._handlerLoadedMetricChart}
          />
        </ShowHide>
      );
    })

    return (
      <div>
        {_metricCharts}
      </div>
    );
  }

  _renderIndicatorCharts = (arrConfigs) => {
    const _indicatorCharts = arrConfigs.map(objConfig => {
      const { config, id } = objConfig;
      return (
        <ShowHide isShow={true} key={id}>
          <HighchartWrapper
              isShow={true}
              config={config}
              onLoaded={this._handlerLoadedMetricChart}
              onWillUnLoaded={this._handlerWillUnLoadedChart}
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
        , { zhConfig={} } = config
        , { itemTime } = zhConfig
        , {
            isOpen, isShowChart, isShowInfo,
            itemCaption,
            mfiConfigs
        } = this.state;

    return (
      <div className={CL.ROOT}>
         <Header
            isOpen={isOpen}
            chartType={chartType}
            onCheck={this._fnOnCheck}
            onUnCheck={this._fnOnUnCheck}
            itemCaption={itemCaption}
            itemTitle={caption}
            itemTime={itemTime}
            onToggle={this._handlerToggleOpen}
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
              absComp={this._dataSourceEl}
           />
           <PanelDataInfo
              isShow={isShowInfo}
              info={config.info}
              zhInfo={config.zhConfig}
              onClickChart={this._handlerClickChart}
           />
          {this._renderLegend(config)}
          {this._renderIndicatorCharts(mfiConfigs)}
          {this._renderMetricCharts()}
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
