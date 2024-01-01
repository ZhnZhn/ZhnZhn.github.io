//import PropTypes from "prop-types";
import {
  forwardRef,
  useState,
  useMemo,
  useEffect,
  useImperativeHandle
} from '../uiApi';

import memoEqual from '../hoc/memoEqual';

import useProperty from '../hooks/useProperty';
import useToggle from '../hooks/useToggle';
import { useBool } from '../hooks/useBool';

import useVm from './useVm';
import useSetCheckBox from './useSetCheckBox';
import useCaption from './useCaption';
import useMiniConfigs from './useMiniConfigs';
import useMiniTitles from './useMiniTitles';
import useMiniHandles from './useMiniHandles';
import useDataSourceEl from './useDataSourceEl';

import { isWideWidth } from '../has';
import Comp from '../Comp';
import ChartToolBar from '../toolbars/ChartToolBar';
import crModelMore from './ChartItemMore';
import Header from './Header';
import ChartLegend from './ChartLegend';
import MiniCharts from './MiniCharts';
import PanelDataInfo from './PanelDataInfo';

import arrangeConfigsBy from './arrangeConfigsBy';

const {
  ShowHide,
  ErrorBoundary,
  MsgRenderErr,
  HighchartWrapper
} = Comp;

const CL_CHART_ITEM = 'chart-item'
, S_TAB_DIV = {
  position: 'relative',
  backgroundColor: 'transparent',
  height: 30
}
, S_ML_8 = { marginLeft: 8 }
, S_MT_6 = { marginTop: 6 };

const _IS_ANIMATE_REFLOW = isWideWidth()
, MINI_CONFIGS_ID_PN = "btTitle";

export const ChartItem = memoEqual(forwardRef(({
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
  onToTop
}, ref) => {
  const {
    zhConfig,
    valueMoving,
    info,
    zhMiniConfigs
  } = config || {}
  , {
      dataSource,
      itemCaption:_itemCaption,
      itemValue,
      itemTime,

      legend
    } = zhConfig || {}
  , [_refVm, compareTo] = useVm()
  , [_hLoaded, getMainChart] = useProperty()
  , [hasError, _hError] = useBool()
  , [isShowChart, showChart, hideChart] = useBool(true)
  , isShowInfo = !isShowChart
  , [isOpen, toggleOpen] = useToggle(true)
  , [isShowLegend, toggleLegend] = useToggle()
  , [isShowToolbar, toggleToolbar] = useToggle(true)
  , [itemCaption] = useState(() => _itemCaption || caption || '')
  , [isCaption, showCaption, hideCaption] = useCaption(getMainChart, toggleToolbar)
  , [onCheckItem, onUnCheckItem] = useSetCheckBox(getMainChart, chartType, onSetActive)
  , [loadMiniChart, unloadMiniChart] = useMiniHandles(getMainChart)
  , [_dataSourceEl] = useDataSourceEl(dataSource)
  , [mfiConfigs, _addMfi, _removeMfi] = useMiniConfigs()
  , [miniTitles, _hMiniChart] = useMiniTitles()
  , isShowAbs = (miniTitles.length === 0)

  /*eslint-disable react-hooks/exhaustive-deps */
  , [
    _hToggleSeria,
    _hClickInfo,
    _crValueMoving,
    _moreModel
  ] = useMemo(() => [
    item => {
      getMainChart().zhToggleSeria(item.index)
    },
    () => {
      hideChart()
      toggleLegend(false)
    },
    (prev, dateTo) => crValueMoving(getMainChart(), prev, dateTo),
    crModelMore(
      toggleToolbar,
      onToTop,
      hideCaption
    )
  ], [])
  // getMainChart
  // hideChart, toggleLegend
  // getMainChart, crValueMoving
  // toggleToolbar, onToTop, hideCaption
  /*eslint-enable react-hooks/exhaustive-deps */

  , _zhMiniConfigs = useMemo(() => arrangeConfigsBy(
       zhMiniConfigs,
       miniTitles,
       MINI_CONFIGS_ID_PN
    ), [zhMiniConfigs, miniTitles])

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
     const mainChart = getMainChart();
     if (mainChart) {
       mainChart.zhUpdateSpacing(isShowAbs)
     }
  }, [isShowAbs])
  // getMainChart
  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */
  useImperativeHandle(ref, () => ({
    compareTo,
    hideCaption,
    showCaption,
    reflowChart: (width) => {
      const mainChart = getMainChart();
      if (mainChart) {
        mainChart.zhReflowCharts(_IS_ANIMATE_REFLOW, width)
      }
    }
  }), [])
  // compareTo, hideCaption, showCaption, getMainChart
  /*eslint-enable react-hooks/exhaustive-deps */

  return (
    <div className={CL_CHART_ITEM}>
       { isCaption && <Header
          isOpen={isOpen}
          isAdminMode={isAdminMode}
          itemCaption={itemCaption}
          itemValue={itemValue}
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
         style={S_ML_8}
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
              style={S_MT_6}
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
}))

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
  onToTop: PropTypes.func
}
*/
