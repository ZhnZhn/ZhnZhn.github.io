import { Component, createRef } from 'react';
//import PropTypes from "prop-types";

import has from '../has';
import Comp from '../Comp';
import ChartToolBar from '../toolbars/ChartToolBar';
import crModelMore from './ChartItemMore';
import Header from './Header';
import ChartLegend from './ChartLegend';
import MiniCharts from './MiniCharts';
import PanelDataInfo from './PanelDataInfo';

const {
  ShowHide,
  ErrorBoundary,
  MsgRenderErr,
  HighchartWrapper
} = Comp;

const CL_CHART_ITEM =  'chart-item'
, S_TAB_DIV = {
  position: 'relative',
  backgroundColor: 'transparent',
  height: 30
}
, S_SHOW_HIDE = { marginLeft: 8 }
, S_WRAPPER = { marginTop: 6 }
, S_DATA_SOURCE = {
  position: 'absolute',
  left: 5,
  bottom: 0,
  color: '#909090',
  fontSize: '11px'
};

const _isArr = Array.isArray
, _isNarrowWidth = !has.wideWidth()
, MINI_CONFIGS_ID_PN = "btTitle";

const _crMiniTitles = (miniTitles, btTitle) => {
  return miniTitles.indexOf(btTitle) === -1
    ? [btTitle, ...miniTitles]
    : miniTitles.filter(t => t !== btTitle);
};

const _arrangeConfigsBy = (
  configs,
  configIds,
  idPropName
) => {
  const _hmConfigs = (configs || []).reduce((hm, config) => {
    hm[config[idPropName]] = config
    return hm;
  }, {});
  return configIds.reduce((arrangedConfigs, id) => {
    arrangedConfigs.push(_hmConfigs[id])
    return arrangedConfigs
  }, []);
};

const _toggle = (comp, propName) => {
  comp.setState(prevState => ({
    [propName]: !prevState[propName]
  }))
};

const _callChartMethod = (comp, methodName, ...args) => {
   const _chart = comp.getMainChart();
   if (_chart) {
     _chart[methodName](...args)
   }
};

const _reflowCharts = (mainChart, width, ChartFn) => {
  if (mainChart) {
    const _isAnimate = !_isNarrowWidth && mainChart.zhIsAnimation()
    , zhDetailCharts = mainChart.zhGetDetailCharts();

    mainChart.setSize(width, void 0, _isAnimate)
    if (_isArr(zhDetailCharts)) {
      const spacingLeft = ChartFn.calcYAxisOffset(mainChart);
      zhDetailCharts.forEach(chart => {
        if (spacingLeft) {
          chart.update({ chart: { spacingLeft } }, false)
        }
        chart.setSize(width, void 0, _isAnimate)
      })
    }
  }
};



class ChartItem extends Component {
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

    this._refVm = createRef()

    this._hToggleOpen = _toggle.bind(null, this, 'isOpen')
    this._hClickLegend = _toggle.bind(null, this, 'isShowLegend')
    this._hToggleToolbar = _toggle.bind(null, this, 'isShowToolbar')

    this._moreModel = crModelMore(this, {
      onToggle: this._hToggleToolbar,
      onToTop: props.onToTop,
      onHideCaption: this.hideCaption
    })

    this._hLoadedMiniChart = _callChartMethod.bind(null, this, 'zhAddDetailChart')
    this._hUnLoadedMiniChart = _callChartMethod.bind(null, this, 'zhRemoveDetailChart')

    this._fnOnCheck = this._hCheckBox.bind(this, true)
    this._fnOnUnCheck = this._hCheckBox.bind(this, false)

    const { config, caption } = props
    , { zhConfig } = config || {}
    , { dataSource, itemCaption } = zhConfig || {}
    , _itemCaption = itemCaption || caption || '';

    this._dataSourceEl = (
       <div style={S_DATA_SOURCE}>
         {dataSource || ''}
       </div>
    )
    this.state = {
      hasError: false,
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


  componentDidUpdate(prevProps, prevState){
    const { isShowAbs } = this.state
    , mainChart = this.mainChart;
    if (isShowAbs !== prevState.isShowAbs && mainChart) {
      mainChart.update(
        this.props.ChartFn.crMetricConfig(mainChart, isShowAbs)
      )
    }
  }

  _hError = () => {
    this.setState({ hasError: true })
  }

  setItemCaption = (str) => {
    this.setState({ itemCaption: str })
  }
  setDataSource = (strDataSource) => {
    this._dataSourceEl = (
       <div style={S_DATA_SOURCE}>
         {strDataSource}
       </div>
    )
    this.forceUpdate()
  }

  _hLoaded = (chart) => this.mainChart = chart
  getMainChart = () => this.mainChart

  _hToggleSeria = (item) => {
    this.mainChart.zhToggleSeria(item.index)
  }

  _hClickInfo = () => {
    this.setState({
      isShowInfo: true,
      isShowChart: false,
      isShowLegend: false
    });
  }

  _hClickChart = () => {
    this.setState({
       isShowChart: true,
       isShowInfo: false
     });
  }

  _hCheckBox = (isCheck, checkBox) => {
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

  _hClickConfig = () => {
    const { caption, onShowConfigDialog } = this.props;
    onShowConfigDialog({
      caption,
      chart: this.mainChart,
      setItemCaption: this.setItemCaption,
      setDataSource: this.setDataSource,
      onToggleToolbar: this._hToggleToolbar
    })
  }

  _crValueMoving = (prev, dateTo) => {
     return this.props.crValueMoving(this.mainChart, prev, dateTo);
  }

 _hMiniChart = (btTitle) => {
   const miniTitles = _crMiniTitles(this.state.miniTitles, btTitle)
   , isShowAbs = miniTitles.length === 0 ? true : false;
   this.setState({ miniTitles, isShowAbs })
 }

  render(){
    const {
        config,
        onCloseItem,
        isAdminMode,
        onAddToWatch,
        onZoom,
        onCopy,
        onPasteTo
      } = this.props
    , {
        valueMoving,
        info,
        zhConfig,
        zhMiniConfigs
      } = config || {}
    , {
        itemTime,
        legend
      } = zhConfig || {}
    , {
        isOpen,
        isShowChart,
        isShowInfo,
        isShowLegend,
        isShowAbs,
        isCaption,
        itemCaption,
        mfiConfigs,
        miniTitles,
        hasError,
        isShowToolbar
    } = this.state
    , _zhMiniConfigs = _arrangeConfigsBy(
         zhMiniConfigs,
         miniTitles,
         MINI_CONFIGS_ID_PN
      );

    return (
      <div className={CL_CHART_ITEM}>
         { isCaption && <Header
            isOpen={isOpen}
            isAdminMode={isAdminMode}
            itemCaption={itemCaption}
            itemTime={itemTime}
            valueMoving={valueMoving}
            moreModel={this._moreModel}
            onCheck={this._fnOnCheck}
            onUnCheck={this._fnOnUnCheck}
            onToggle={this._hToggleOpen}
            onClose={onCloseItem}
            crValueMoving={this._crValueMoving}
            refVm={this._refVm}
         />
        }
        <ShowHide
           isShow={isOpen}
           withoutAnimation={true}
           style={S_SHOW_HIDE}
        >
           {isShowChart && <ShowHide
                isShow={isShowToolbar}
                withoutAnimation={true}
             >
               <ChartToolBar
                 style={S_TAB_DIV}
                 hasError={hasError}
                 config={config}
                 getChart={this.getMainChart}
                 onMiniChart={this._hMiniChart}
                 onAddMfi={this._addMfi}
                 onRemoveMfi={this._removeMfi}
                 onClickLegend={this._hClickLegend}
                 onAddToWatch={onAddToWatch}
                 onClickInfo={this._hClickInfo}
                 onClickConfig={this._hClickConfig}
                 onCopy={onCopy}
                 onPasteTo={onPasteTo}
                 onZoom={onZoom}
                />
             </ShowHide>
           }
           <ErrorBoundary
              FallbackComp={<MsgRenderErr
                 isShow={isShowChart}
                 msg="chart"
              />}
              onError={this._hError}
           >
              <ShowHide
                isShow={isShowChart}
                withoutAnimation={true}
                style={S_WRAPPER}
              >
                 <HighchartWrapper
                   config={config}
                   isShowAbs={isShowAbs}
                   absComp={this._dataSourceEl}
                   onLoaded={this._hLoaded}
                 />
              </ShowHide>
           </ErrorBoundary>
           <PanelDataInfo
              isShow={isShowInfo}
              info={info}
              zhInfo={zhConfig}
              onClickChart={this._hClickChart}
           />
           <ChartLegend
             isShow={isShowLegend}
             legend={legend}
             onClickItem={this._hToggleSeria}
           />
           <MiniCharts
              withoutAnimation={true}
              configs={mfiConfigs}
              absComp={this._dataSourceEl}
              onLoaded={this._hLoadedMiniChart}
              onWillUnLoaded={this._hUnLoadedMiniChart}
           />
           <MiniCharts
              withoutAnimation={true}
              configs={_zhMiniConfigs}
              idPropName={MINI_CONFIGS_ID_PN}
              absComp={this._dataSourceEl}
              onLoaded={this._hLoadedMiniChart}
              onWillUnLoaded={this._hUnLoadedMiniChart}
           />
        </ShowHide>
      </div>
    );
  }

  compareTo(dateTo){
    const { current } = this._refVm;
    if (current) {
      return current._updateDateTo(dateTo);
    }
  }

  hideCaption() {
    const _chart = this.mainChart;
    if (_chart) {
      _chart.zhHideCaption()
      this.setState({
        isShowToolbar: false,
        isCaption: false
      })
    }
  }
  showCaption() {
    const _chart = this.mainChart;
    if (!this.state.isCaption && _chart) {
      _chart.zhShowCaption()
      this.setState({
        isShowToolbar: true,
        isCaption: true
      })
    }
  }

  reflowChart(width){
    _reflowCharts(this.mainChart, width, this.props.ChartFn)
  }

}

export default ChartItem
