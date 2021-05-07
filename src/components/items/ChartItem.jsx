import { Component } from 'react';
//import PropTypes from "prop-types";

import has from '../has'
import Comp from '../Comp'
import ChartToolBar from '../toolbars/ChartToolBar';
import crModelMore from './ChartItemMore'
import Header from './Header';
import ChartLegend from './ChartLegend'
import MiniCharts from './MiniCharts';
import PanelDataInfo from './PanelDataInfo';

const {
  ShowHide,
  MsgRenderErr,
  HighchartWrapper
} = Comp

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

const _crMiniTitles = (miniTitles, btTitle) => {
  return miniTitles.indexOf(btTitle) === -1
    ? [btTitle, ...miniTitles]
    : miniTitles.filter(t => t !== btTitle);
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

    this._hToggleOpen = this._toggle.bind(this, 'isOpen')
    this._hClickLegend = this._toggle.bind(this, 'isShowLegend')
    this._hToggleToolbar = this._toggle.bind(this, 'isShowToolbar')

    this._moreModel = crModelMore(this, {
      onToggle: this._hToggleToolbar,
      onToTop: props.onToTop,
      onHideCaption: this.hideCaption
    })

    this._fnOnCheck = this._hCheckBox.bind(this, true)
    this._fnOnUnCheck = this._hCheckBox.bind(this, false)

    const { config={}, caption='' } = props
    , { zhConfig={} } = config
    , { dataSource='', itemCaption } = zhConfig
    , _itemCaption = itemCaption || caption;

    this._dataSourceEl = (
       <div style={S.DATA_SOURCE}>
         {dataSource}
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
        this.props.ChartFn.arMetricOption(mainChart, isShowAbs)
      )
    }
  }


  hideCaption = () => {
    if (this.mainChart) {
      this.mainChart.zhHideCaption()
      this.setState({
        isShowToolbar: false,
        isCaption: false
      })
    }
  }
  showCaption = () => {
    if (!this.state.isCaption && this.mainChart) {
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


  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  /*
  componentDidCatch(error, errMsg){
  }
  */

  _hLoaded = (chart) => this.mainChart = chart
  getMainChart = () => this.mainChart


  _hLoadedMiniChart = (metricChart) => {
     if (this.mainChart) {
       this.mainChart.zhAddDetailChart(metricChart)
     }
  }
  _hUnLoadedMiniChart = (objChart) => {
    if (this.mainChart) {
      this.mainChart.zhRemoveDetailChart(objChart)
    }
  }

  _toggle = (propName) => {
    this.setState(prevState =>({
      [propName]: !prevState[propName]
    }))
  }

  _hToggleSeria = (item) => {
    this.mainChart.zhToggleSeria(item.index)
  }

  _hClick2H = () => {
    this.mainChart.zhToggle2H()
  }

  _hZoom = () => {
    const { onZoom } = this.props;
    if (_isFn(onZoom)) {
      onZoom({ chart: this.mainChart })
    }
  }

  _hAddToWatch = () => {
    const { caption, config, onAddToWatch } = this.props;
    onAddToWatch( {caption, config} )
  }

  _hCopy = () => {
    this.props.onCopy(this.mainChart)
  }
  _hPasteTo = () => {
    this.props.onPasteToDialog({
      toChart: this.mainChart,
      fromChart: this.props.getCopyFromChart()
    })
  }
  _toggleMinMax = () => {
    this.mainChart.zhToggleMinMaxLines()
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

  _regCompVm = (comp) => {
    this._compVm = comp
  }
  compareTo(dateTo){
    if (this._compVm) {
      return this._compVm._updateDateTo(dateTo);
    }
  }

 _hMiniChart = (btTitle) => {
   const miniTitles = _crMiniTitles(this.state.miniTitles, btTitle)
   , isShowAbs = miniTitles.length === 0 ? true : false;
   this.setState({ miniTitles, isShowAbs })
 }

 _crChartToolBar = (config, withoutAnimation) => {
   const { hasError, isShowToolbar } = this.state;
   return (
         <ShowHide
            isShow={isShowToolbar}
            withoutAnimation={withoutAnimation}
         >
           <ChartToolBar
             hasError={hasError}
             style={S.TAB_DIV}
             config={config}
             onMiniChart={this._hMiniChart}
             getChart={this.getMainChart}
             onAddMfi={this._addMfi}
             onRemoveMfi={this._removeMfi}
             onClickLegend={this._hClickLegend}
             onClick2H={this._hClick2H}
             onAddToWatch={this._hAddToWatch}
             onClickInfo={this._hClickInfo}
             onClickConfig={this._hClickConfig}
             onCopy={this._hCopy}
             onPasteTo={this._hPasteTo}
             onMinMax={this._toggleMinMax}
             onZoom={this._hZoom}
            />
         </ShowHide>
      );
   }

  render(){
    const {
        caption, config={},
        onCloseItem, isAdminMode
      } = this.props
    , { zhConfig={}, zhMiniConfigs } = config
    , { itemTime, legend, withoutAnimation } = zhConfig
    , {
        hasError,
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
            onToggle={this._hToggleOpen}
            valueMoving={config.valueMoving}
            onClose={onCloseItem}
            isAdminMode={isAdminMode}
            crValueMoving={this._crValueMoving}
            regCompVm={this._regCompVm}
         />
        }
        <ShowHide
           isShow={isOpen}
           withoutAnimation={_withoutAnimation}
           style={S.SHOW_HIDE}
        >
           {isShowChart && this._crChartToolBar(config, _withoutAnimation)}
           {hasError
             ? <MsgRenderErr
                 isShow={isShowChart}
                 msg="chart"
               />
             : <HighchartWrapper
                 isShow={isShowChart}
                 style={S.WRAPPER}
                 config={config}
                 isShowAbs={isShowAbs}
                 absComp={this._dataSourceEl}
                 onLoaded={this._hLoaded}
               />
           }
           <PanelDataInfo
              isShow={isShowInfo}
              info={config.info}
              zhInfo={config.zhConfig}
              onClickChart={this._hClickChart}
           />
           <ChartLegend
             isShow={isShowLegend}
             legend={legend}
             onClickItem={this._hToggleSeria}
           />
           <MiniCharts
              withoutAnimation={_withoutAnimation}
              configs={mfiConfigs}
              absComp={this._dataSourceEl}
              onLoaded={this._hLoadedMiniChart}
              onWillUnLoaded={this._hUnLoadedMiniChart}
           />
           <MiniCharts
              withoutAnimation={_withoutAnimation}
              configs={zhMiniConfigs}
              idPropName="btTitle"
              ids={miniTitles}
              absComp={this._dataSourceEl}
              onLoaded={this._hLoadedMiniChart}
              onWillUnLoaded={this._hUnLoadedMiniChart}
           />
        </ShowHide>
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

export default ChartItem
