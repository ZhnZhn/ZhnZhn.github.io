import React from 'react';

import Header from './Header';
import ButtonTab from '../zhn/ButtonTab';
import ShowHide from '../zhn/ShowHide';
import HighchartWrapper from '../zhn/HighchartWrapper';
import Legend from '../zhn/Legend';

import PanelIndicator from '../zhn/PanelIndicator';
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

const AreaChartItem = React.createClass({
  getInitialState(){
    this.is2H = false;
    this._fnOnCheck = this._handlerCheckBox.bind(this, true);
    this._fnOnUnCheck = this._handlerCheckBox.bind(this, false);

    const { config={} } = this.props
        , { zhConfig } = config
        , { dataSource='' } = zhConfig
    this._dataSourceEl = (
                           <div style={styles.dataSource}>
                             {dataSource}
                           </div>
                         )

    return {
      isOpen: true,
      isShowChart : true,
      isShowIndicator : false,
      isShowLegend : false,
      isShowInfo : false,

      isInitVolume : false, isShowVolume : false,
      isATHVolume : false, isShowATH : false,
      isInitHighLow : false, isShowHighLow : false,

      chartsDescription : [],
      mfiConfigs : []
    }
  },

  componentDidMount(){
    this.mainChart = this.refs.chart.getChart();
  },

  _handlerLoadedMetricChart(metricChart){
     this.mainChart.options.zhDetailCharts.push(metricChart);
  },
  _handlerWillUnLoadedChart(objChart){
    const charts = this.mainChart.options.zhDetailCharts;
    this.mainChart.options.zhDetailCharts = charts.filter((chart) => {
      return chart !== objChart;
    })
  },

  _handlerToggleOpen(){
    if (this.state.isOpen){
      this.setState({isOpen : false, isShowIndicator : false})
    } else {
      this.setState({isOpen : true})
    }
  },

  _handlerClickIndicator(){
    this.setState({ isShowIndicator : !this.state.isShowIndicator });
  },

  _handlerClickLegend(){
    this.setState({ isShowLegend : !this.state.isShowLegend });
  },
  _handlerToggleSeria(item){
    this.mainChart.options.zhToggleSeria(this.mainChart, item);
  },

  _handlerClick2H(){
    const height = (this.is2H)
           ? this.mainChart.options.chart.height/2
           : this.mainChart.options.chart.height*2;
    this.setChartHeight(height);
    this.is2H = !this.is2H;
  },

  _handlerAddToWatch(){
    const {caption, config, onAddToWatch} = this.props;
    onAddToWatch( {caption, config} );
  },

  _handlerClickInfo(){
    this.setState({
      isShowInfo: true, isShowChart: false,
      isShowLegend: false, isShowIndicator: false
    });
  },

  _handlerClickVolume(){
    const {isInitVolume, isShowVolume} = this.state;
    if (isInitVolume){
      this.setState({isShowVolume: !isShowVolume});
    } else {
      this.state.chartsDescription.push({type: 'Volume'});
      this.setState({
        chartsDescription : this.state.chartsDescription,
        isShowVolume: true, isInitVolume: true
      });
    }
  },
  _handlerClickATH(){
    const { isInitATH, isShowATH } = this.state;
    if (isInitATH){
      this.setState({isShowATH: !isShowATH});
    } else {
      this.state.chartsDescription.push({type: 'ATH'})
      this.setState({
        chartsDescription : this.state.chartsDescription,
        isShowATH: true, isInitATH: true
      });
    }
  },
  _handlerClickHighLow(){
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
  },


  _handlerClickChart(){
    this.setState({isShowChart: true, isShowInfo: false});
  },

  _handlerCheckBox(isCheck, checkBox){
    this.props.onSetActive(isCheck, checkBox, this.refs.chart.getChart());
  },

  _handlerAddSma(period){
    return this.mainChart.options.zhFnAddSeriesSma(this.mainChart, period);
  },
  _handleRemoveSeries(id){
    return this.mainChart.options.zhFnRemoveSeries(this.mainChart, id);
  },
  _handlerAddMfi(period, id){
    const config = this.mainChart.options.zhFnGetMfiConfig(this.mainChart, period, id);
    this.state.mfiConfigs.push({config, id});
    this.setState({mfiConfigs: this.state.mfiConfigs});
  },
  _handlerRemoveMfi(id){
    this.state.mfiConfigs = this.state.mfiConfigs.filter((objConfig) => {
      return objConfig.id !== id;
    })
    this.setState({mfiConfigs: this.state.mfiConfigs});
  },

  _createChartToolBar(config){
     const _btIndicator = (!config.zhConfig.isWithoutIndicator) ? (
       <ButtonTab
         caption={'Indicator'}
         isShow={this.state.isShowIndicator}
         style= {{left: '10px'}}
         onClick={this._handlerClickIndicator}
       >
         <span className={'arrow-down'}></span>
       </ButtonTab>
     ) : undefined;

    const _btLegend = (config.zhConfig.isWithLegend) ? (
      <ButtonTab
        style={{left: '115px'}}
        caption={'Legend'}
        isShow={this.state.isShowLegend}
        onClick={this._handlerClickLegend}
      />
    ) : undefined ;

    const _bt2HChart = (
      <ButtonTab
        style={{left: '190px'}}
        caption={'x2H'}
        isShow={this.is2H}
        onClick={this._handlerClick2H}
      />
    );

    const _btAdd = (!config.zhConfig.isWithoutAdd) ? (
      <ButtonTab
        style={{left: '240px'}}
        caption={'Add'}
        isShow={false}
        onClick={this._handlerAddToWatch}
      />
    ) : undefined;

    const _btInfo = (config.info) ? (
      <ButtonTab
        caption={'Info'}
        isShow={this.state.isShowInfo}
        onClick={this._handlerClickInfo}
      />
    ) : undefined;

    const _btVolume = (config.zhVolumeConfig) ? (
      <ButtonTab
        style={{left: '350px'}}
        caption={'Volume'}
        isShow={this.state.isShowVolume}
        onClick={this._handlerClickVolume}
      />
    ) : undefined;

    const _btATH = (config.zhATHConfig) ? (
      <ButtonTab
        style={{left: '425px'}}
        caption={'ATH'}
        isShow={this.state.isShowATH}
        onClick={this._handlerClickATH}
      />
    ) : undefined;

    const _btHL = (config.zhHighLowConfig) ? (
      <ButtonTab
        style={{left: '480px'}}
        caption={'HL'}
        isShow={this.state.isShowHighLow}
        onClick={this._handlerClickHighLow}
      />
    ) : undefined;

    return (
      <div style={styles.tabDiv}>
         {_btIndicator}
         {_btLegend}
         {_bt2HChart}
         {_btAdd}
         {_btInfo}
         {_btVolume}
         {_btATH}
         {_btHL}
      </div>
    );
  },

  _renderLegend(config){
    const { isShowLegend } = this.state;
    const _compLegend = (config.zhConfig.isWithLegend) ? (
      <ShowHide isShow={isShowLegend}>
        <Legend
           legend={config.zhConfig.legend}
           onClickItem={this._handlerToggleSeria}
        />
      </ShowHide>
    ) : undefined

    return _compLegend
  },

  _renderMetricCharts(){
    const {chartsDescription} = this.state;

    const _metricCharts = chartsDescription.map((descr, index) => {
      const {type} = descr
          , _isShow = this.state['isShow' + type]
          , _ref = 'chart' + type
          , _config = this.props.config['zh' + type + 'Config']

      return (
        <ShowHide isShow={_isShow} key={index}>
          <HighchartWrapper
              ref={_ref}
              isShow={true}
              config={_config}
              onLoaded={this._handlerLoadedMetricChart}
          />
        </ShowHide>
      )
    })

    return (
      <div>
        {_metricCharts}
      </div>
    )
  },

  _renderIndicatorCharts(arrConfigs){
    const _indicatorCharts = arrConfigs.map((objConfig, index) => {
      const {config, id} = objConfig;
      return (
        <ShowHide isShow={true} key={id}>
          <HighchartWrapper
              isShow={true}
              config={config}
              onLoaded={this._handlerLoadedMetricChart}
              onWillUnLoaded={this._handlerWillUnLoadedChart}
          />
        </ShowHide>
      )
    })
    return (
      <div>
        {_indicatorCharts}
      </div>
    )
  },

  render(){
    const {
            chartType, caption, config,
            onCloseItem,
          } = this.props
        , {itemCaption, itemTime} = config.zhConfig
        , _itemCaption = (itemCaption) ? itemCaption : caption
        , {
            isOpen, isShowChart, isShowInfo, isShowIndicator,
            mfiConfigs
        } = this.state;

    //console.log(this.props);

    /*
    const absComp = (
                      <div style={ {position: 'absolute', left: '5px', bottom: '-5px', color: '#909090', fontSize: '9px'} }>
                        Quandl
                      </div>
                    );
    */

    return (
      <div style={styles.rootDiv}>
         <Header
            isOpen={isOpen}
            chartType={chartType}
            onCheck={this._fnOnCheck}
            onUnCheck={this._fnOnUnCheck}
            itemCaption={_itemCaption}
            itemTitle={caption}
            itemTime={itemTime}
            onToggle={this._handlerToggleOpen}
            valueMoving={config.valueMoving}
            onClose={onCloseItem}
         />
        <ShowHide isShow={isOpen} style={styles.showHide}>
           {isShowChart && this._createChartToolBar(config)}
           <HighchartWrapper
              ref="chart"
              isShow={isShowChart}
              config={config}
              absComp={this._dataSourceEl}
           />
           <PanelIndicator
             isShow={isShowIndicator}
             onAddSma={this._handlerAddSma}
             onRemoveSeries={this._handleRemoveSeries}
             isMfi={config.zhIsMfi}
             onAddMfi={this._handlerAddMfi}
             onRemoveMfi={this._handlerRemoveMfi}
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
  },

  reflowChart(width){
    this.mainChart.options.chart.width = width;
    this.mainChart.reflow();
    if (Array.isArray(this.mainChart.options.zhDetailCharts)) {
      this.mainChart.options.zhDetailCharts.forEach((chart) => {
        //chart.reflow();
        chart.setSize(width, chart.options.chart.height, true);
      });
    }
  },

  setChartHeight(height){
    this.mainChart.options.chart.height = height;
    this.mainChart.reflow();
  }

});

export default AreaChartItem;
