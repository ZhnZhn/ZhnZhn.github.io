import React, { Component, PropTypes } from 'react';

import Header from './Header';
import ChartToolBar from './ChartToolBar';
import ShowHide from '../zhn/ShowHide';
import HighchartWrapper from '../zhn/HighchartWrapper';
import Legend from '../zhn/Legend';

import PanelDataInfo from '../zhn/PanelDataInfo';

const styles = {
  rootDiv : {
    lineHeight : 1.5,
    marginBottom: '10px',
    marginRight: '25px',
    //marginLeft: '8px',
    position : 'relative'
  },
  tabDiv : {
    position: 'relative',
    height: '30px',
    backgroundColor: 'transparent',
    zIndex: 2
  },
  showHide : {
    marginLeft: '8px'
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

  constructor(props){
    super()
    this.is2H = false
    this._fnOnCheck = this._handlerCheckBox.bind(this, true)
    this._fnOnUnCheck = this._handlerCheckBox.bind(this, false)

    const { config={}, caption='' } = props
        , { zhConfig } = config
        , { dataSource='', itemCaption } = zhConfig
        , _itemCaption = (itemCaption) ? itemCaption : caption;

    this._dataSourceEl = (
       <div style={styles.dataSource}>
         {dataSource}
       </div>
    )
    this.state = {
      isOpen: true,
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
    const charts = this.mainChart.options.zhDetailCharts;
    this.mainChart.options.zhDetailCharts = charts.filter((chart) => {
      return chart !== objChart;
    })
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

  _handlerClickInfo = () => {
    this.setState({
      isShowInfo: true, isShowChart: false, isShowLegend: false
    });
  }

  _handlerClickVolume = () => {
    const { isInitVolume, isShowVolume } = this.state;
    if (isInitVolume){
      this.setState({ isShowVolume: !isShowVolume })
    } else {
      this.state.chartsDescription.push({ type: 'Volume' })
      this.setState({
        chartsDescription : this.state.chartsDescription,
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

  _handlerAddSma = (period) => {
    return this.mainChart.options.zhFnAddSeriesSma(this.mainChart, period);
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

  _handleClickConfig = () => {
    const { caption, onShowConfigDialog } = this.props
    onShowConfigDialog({
      caption,
      chart: this.mainChart,
      setItemCaption: this.setItemCaption
    })
  }

  _crValueMoving = (prev, dateTo) => {
     return this.props.crValueMoving(this.mainChart, prev, dateTo);
  }

 _createChartToolBar = (config) => {
   return (
         <ChartToolBar
           style={styles.tabDiv}
           config={config}
           onAddSma={this._handlerAddSma}
           onRemoveSeries={this._handleRemoveSeries}
           onAddMfi={this._handlerAddMfi}
           onRemoveMfi={this._handlerRemoveMfi}
           onClickLegend={this._handlerClickLegend}
           onClick2H={this._handlerClick2H}
           onAddToWatch={this._handlerAddToWatch}
           onClickInfo={this._handlerClickInfo}
           onClickVolume={this._handlerClickVolume}
           onClickATH={this._handlerClickATH}
           onClickHighLow={this._handlerClickHighLow}
           onClickConfig={this._handleClickConfig}
          />
      );
 }

  _renderLegend = (config) => {
    const { isShowLegend } = this.state;
    const _compLegend = (config.zhConfig.isWithLegend) ? (
      <ShowHide isShow={isShowLegend}>
        <Legend
           legend={config.zhConfig.legend}
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
    const _indicatorCharts = arrConfigs.map((objConfig, index) => {
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

  render(){
    const {
            chartType, caption, config,
            onCloseItem, isAdminMode
          } = this.props
        , { itemTime } = config.zhConfig
        , {
            isOpen, isShowChart, isShowInfo,
            itemCaption,
            mfiConfigs
        } = this.state;

    return (
      <div style={styles.rootDiv}>
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
              ref={comp => this.chartComp = comp}
              isShow={isShowChart}
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
    this.mainChart.options.chart.width = width
    this.mainChart.reflow()
    if (Array.isArray(this.mainChart.options.zhDetailCharts)) {
      this.mainChart.options.zhDetailCharts.forEach((chart) => {
        //chart.reflow();
        chart.setSize(width, chart.options.chart.height, true)
      })
    }
  }

  setChartHeight = (height) => {
    this.mainChart.options.chart.height = height
    this.mainChart.reflow()
  }
}

export default AreaChartItem
