import {
  useState, useCallback, useMemo,
  useEffect,
  forwardRef, memo, useImperativeHandle
} from 'react';
//import PropTypes from "prop-types";

import useToggle from '../hooks/useToggle'
import useBool from '../hooks/useBool'

import useVm from './useVm'
import useLoadChart from './useLoadChart'
import useSetCheckBox from './useSetCheckBox'
import useCaption from './useCaption'
import useMiniConfigs from './useMiniConfigs'
import useMiniTitles from './useMiniTitles'
import useMiniHandles from './useMiniHandles'
import useDataSourceEl from './useDataSourceEl'

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
, S_WRAPPER = { marginTop: 6 };


const _isArr = Array.isArray
, _isNarrowWidth = !has.wideWidth()
, MINI_CONFIGS_ID_PN = "btTitle";

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

const _isNotShouldUpdate = () => true;

const ChartItem = memo(forwardRef(({
  caption,

  config,
  onCloseItem,
  isAdminMode,
  onAddToWatch,
  onZoom,
  onCopy,
  onPasteTo,

  chartType,
  onSetActive,

  onShowConfigDialog,
  crValueMoving,
  ChartFn,
  onToTop
}, ref) => {
  const [_refVm, compareTo] = useVm()
  , [_hLoaded, getMainChart] = useLoadChart()
  , [hasError, _hError] = useBool(false)
  , [isOpen, toggleOpen] = useToggle(true)
  , [isShowLegend, toggleLegend] = useToggle(false)
  , [isShowToolbar, toggleToolbar] = useToggle(true)
  , [onCheckItem, onUnCheckItem] = useSetCheckBox(getMainChart, chartType, onSetActive)
  , [loadMiniChart, unloadMiniChart] = useMiniHandles(getMainChart)

  const {
    zhConfig,
    valueMoving,
    info,
    zhMiniConfigs
  } = config || {}
  , {
      dataSource,
      itemCaption:_itemCaption,
      itemTime,
      legend
    } = zhConfig || {}
  , [_dataSourceEl] = useDataSourceEl(dataSource)
  , [itemCaption] = useState(() => _itemCaption || caption || '')

  , _hToggleSeria = useCallback(item => {
      getMainChart().zhToggleSeria(item.index)
    }, [getMainChart])

  , [isShowChart, showChart, hideChart] = useBool(true)
  , isShowInfo = !isShowChart
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hClickInfo = useCallback(() => {
     hideChart()
     toggleLegend(false)
  }, [])
  // hideChart, toggleLegend
  /*eslint-enable react-hooks/exhaustive-deps */

  , [mfiConfigs, _addMfi, _removeMfi] = useMiniConfigs()
  , [miniTitles, _hMiniChart] = useMiniTitles()
  , isShowAbs = (miniTitles.length === 0)
  /*eslint-disable react-hooks/exhaustive-deps */
  , _crValueMoving = useCallback((prev, dateTo) =>
       crValueMoving(getMainChart(), prev, dateTo)
    , [])
  // getMainChart, crValueMoving
  /*eslint-enable react-hooks/exhaustive-deps */
  , [isCaption, showCaption, hideCaption] = useCaption(getMainChart, toggleToolbar)
  , _zhMiniConfigs = useMemo(() => _arrangeConfigsBy(
       zhMiniConfigs,
       miniTitles,
       MINI_CONFIGS_ID_PN
    ), [zhMiniConfigs, miniTitles])
  /*eslint-disable react-hooks/exhaustive-deps */
  , _moreModel = useMemo(() => crModelMore(
      toggleToolbar,
      onToTop,
      hideCaption
    ), [])
  // toggleToolbar, onToTop, hideCaption
  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
     const mainChart = getMainChart();
     if (mainChart) {
       mainChart.update(
        ChartFn.crMetricConfig(mainChart, isShowAbs)
       )
     }
  }, [isShowAbs])
  // getMainChart, ChartFn
  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */
  useImperativeHandle(ref, () => ({
    compareTo,
    hideCaption,
    showCaption,
    reflowChart: (width) => {
      _reflowCharts(getMainChart(), width, ChartFn)
    }
  }), [])
  // compareTo, hideCaption, showCaption, getMainChart, ChartFn
  /*eslint-enable react-hooks/exhaustive-deps */

  return (
    <div className={CL_CHART_ITEM}>
       { isCaption && <Header
          isOpen={isOpen}
          isAdminMode={isAdminMode}
          itemCaption={itemCaption}
          itemTime={itemTime}
          valueMoving={valueMoving}
          moreModel={_moreModel}
          onCheck={onCheckItem}
          onUnCheck={onUnCheckItem}
          onToggle={toggleOpen}
          onClose={onCloseItem}
          crValueMoving={_crValueMoving}
          refVm={_refVm}
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
               getChart={getMainChart}
               onMiniChart={_hMiniChart}
               onAddMfi={_addMfi}
               onRemoveMfi={_removeMfi}
               onClickLegend={toggleLegend}
               onAddToWatch={onAddToWatch}
               onClickInfo={_hClickInfo}
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
            onError={_hError}
         >
            <ShowHide
              isShow={isShowChart}
              withoutAnimation={true}
              style={S_WRAPPER}
            >
               <HighchartWrapper
                 config={config}
                 isShowAbs={isShowAbs}
                 absComp={_dataSourceEl}
                 onLoaded={_hLoaded}
               />
            </ShowHide>
         </ErrorBoundary>
         <PanelDataInfo
            isShow={isShowInfo}
            info={info}
            zhInfo={zhConfig}
            onClickChart={showChart}
         />
         <ChartLegend
           isShow={isShowLegend}
           legend={legend}
           onClickItem={_hToggleSeria}
         />
         <MiniCharts
            withoutAnimation={true}
            configs={mfiConfigs}
            absComp={_dataSourceEl}
            onLoaded={loadMiniChart}
            onWillUnLoaded={unloadMiniChart}
         />
         <MiniCharts
            withoutAnimation={true}
            configs={_zhMiniConfigs}
            idPropName={MINI_CONFIGS_ID_PN}
            absComp={_dataSourceEl}
            onLoaded={loadMiniChart}
            onWillUnLoaded={unloadMiniChart}
         />
      </ShowHide>
    </div>
  );
}), _isNotShouldUpdate);

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
  onZoom: PropTypes.func,
  onCopy: PropTypes.func,
  onPasteTo: PropTypes.func,
  onToTop: PropTypes.func,
  ChartFn: PropTypes.shape({
    crMetricConfig: PropTypes.func,
    calcYAxisOffset: PropTypes.func
  })
}
*/

export default ChartItem
