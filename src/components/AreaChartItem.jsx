import React from 'react';

import SvgCheckBox from './zhn/SvgCheckBox';
import ValueMovingBadge from './zhn/ValueMovingBadge';
import SvgClose from './SvgClose';
import ButtonTab from './zhn/ButtonTab';
import ShowHide from './zhn/ShowHide';
import ZhHighchart from './ZhHighchart';

import PanelIndicator from './zhn/PanelIndicator';
import PanelDataInfo from './zhn/PanelDataInfo';

const styles = {
  rootDiv : {
    marginBottom: '10px',
    position : 'relative'
  },
  headerDiv: {
    backgroundColor: '#232F3B',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    paddingTop: '4px',
    paddingLeft: '10px',
    height: '25px',
    width: '600px'
  },
  checkBoxStyle : {
    float: 'left',
    marginRight: '10px'
  },
  captionSpanOpen : {
    display : 'inline-block',
    color: 'rgba(164, 135, 212, 1)',
    cursor: 'pointer',
    width: '125px',
    fontWeight : 'bold',
    whiteSpace: 'nowrap',
    textOverflow : 'ellipsis',
    overflow : 'hidden',
    float : 'left'
  },
  captionSpanClose : {
    display : 'inline-block',
    color : 'gray',
    cursor: 'pointer',
    width : '125px',
    fontWeight : 'bold',
    whiteSpace: 'nowrap',
    textOverflow : 'ellipsis',
    overflow : 'hidden',
    float : 'left'
  }
}

const AreaChartItem = React.createClass({
  getInitialState(){
    this._fnOnCheck = this._handlerCheckBox.bind(null, true);
    this._fnOnUnCheck = this._handlerCheckBox.bind(null, false);
    return {
      isOpen: true,
      isShowChart : true,
      isShowIndicator : false,
      isShowInfo : false,

      isInitVolume : false, isShowVolume : false,
      isATHVolume : false, isShowATH : false,
      isInitHighLow : false, isShowHighLow : false,

      chartsDescription : [],
      mfiConfigs : [],
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
    this.setState({isShowIndicator : !this.state.isShowIndicator});
  },

  _handlerClickInfo(){
    this.setState({isShowChart: false, isShowInfo: true, isShowIndicator: false});
  },

  _handlerClickVolume(){
    const {isInitVolume, isShowVolume} = this.state;
    if (isInitVolume){
      this.setState({isShowVolume: !this.state.isShowVolume});
    } else {
      this.state.chartsDescription.push({type: 'Volume'});
      this.setState({
        chartsDescription : this.state.chartsDescription,
        isShowVolume: true, isInitVolume: true
      });
    }
  },
  _handlerClickATH(){
    const {isInitATH, isShowATH} = this.state;
    if (isInitATH){
      this.setState({isShowATH: !isShowATH});
    } else {
      this.state.chartsDescription.push({type: 'ATH'});
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
     const _btIndicator = (
       <ButtonTab
         caption={'Indicator'}
         isShow={this.state.isShowIndicator}
         style= {{left: '10px'}}
         onClick={this._handlerClickIndicator}
       />
     );

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
      <div>
         {_btIndicator}
         {_btInfo}
         {_btVolume}
         {_btATH}
         {_btHL}
      </div>
    );
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
          <ZhHighchart
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
          <ZhHighchart
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
    const {caption, config, onSetActive, onCloseItem} = this.props;
    const {
            isOpen, isShowChart, isShowInfo, isShowIndicator,
            mfiConfigs
          } = this.state;
    const _styleCaption = isOpen ? styles.captionSpanOpen : styles.captionSpanClose;

    return (
      <div style={styles.rootDiv}>
        <div style={styles.headerDiv}>
          <SvgCheckBox
             rootStyle={styles.checkBoxStyle}
             onCheck={this._fnOnCheck}
             onUnCheck={this._fnOnUnCheck}
          />
          <span
             title={caption}
             style={_styleCaption}
             onClick={this._handlerToggleOpen}
          >
             {caption}
          </span>
          <ValueMovingBadge
             valueMoving={config.valueMoving}
          />
          <SvgClose onClose={onCloseItem} />
        </div>
        <ShowHide isShow={isOpen}>
           <ZhHighchart
              ref="chart"
              isShow={isShowChart}
              toolBar={this._createChartToolBar(config)}
              config={config}
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
              onClickChart={this._handlerClickChart}
           />
          {this._renderIndicatorCharts(mfiConfigs)}
          {this._renderMetricCharts()}
        </ShowHide>
      </div>
    )
  }
});

export default AreaChartItem;
