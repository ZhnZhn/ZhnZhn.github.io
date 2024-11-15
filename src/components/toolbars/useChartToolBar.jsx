import { isWideWidth } from '../has';

import useToggle from '../hooks/useToggle';
import ButtonTab from '../zhn/ButtonTab';

import ModalMenuFn from './ModalMenuFn';
import ModalMenuIndicator from './ModalMenuIndicator';
import ModalMenuInd2 from './ModalMenuInd2';
import ModalMenuAppearance from './ModalMenuAppearance';
import ModalMenuMini from './ModalMenuMini';

const _isArr = Array.isArray
, MODAL_POPUP_STYLE_TOP = isWideWidth()
   ? 75
   : 65
, _crModalPopupStyle = (left) => ({
  top: MODAL_POPUP_STYLE_TOP,
  left
})
, _crLeftStyle = (left) => ({
  left
})
, S_BT_IND = _crLeftStyle(8)
, S_M_IND = _crModalPopupStyle(5)

, S_BT_APPEARANCE = _crLeftStyle(95)
, S_M_APPEARANCE = _crModalPopupStyle(75)

, S_BT_LEGEND = _crLeftStyle(115)

, S_BT_FN_APPEARANCE = _crLeftStyle(230)
, S_BT_FN = _crLeftStyle(190)
, S_M_FN = _crModalPopupStyle(160)

, S_BT_MINI = {
  left: 350,
  width: 68
}
, S_M_MINI = _crModalPopupStyle(290);

const LINE_TYPES = ['area', 'spline', 'line'];
const _isColumnCategoryConfig = (
 { type, categories }={}
) => type === 'category' && _isArr(categories);

const _isIndicatorTab = ({ series, xAxis }, isWithoutIndicator) => !isWithoutIndicator
  && _isArr(series) && series[0]
  && ( LINE_TYPES.indexOf(series[0].type) !== -1
       || _isColumnCategoryConfig(xAxis)
     );

const useChartToolBar = (
  hasError,
  _crModalMenuLeftStyle,
  config,
  getChart,
  onClickInfo,
  onClickLegend,
  onAddToWatch,
  onAddMfi,
  onRemoveMfi,
  onMiniChart,
  chartHandlers
) => {
  const {
    zhConfig,
    info,
    zhMiniConfigs
  } = config || {}
  , {
    isWithoutIndicator,
    itemConf,
    legend
  } = zhConfig || {}
  , [isShowInd, toggleInd] = useToggle()
  , [isShowAppearance, toggleAppearance] = useToggle()
  , [isShowFn, toggleFn] = useToggle()
  , [isShowMini, toggleMini] = useToggle()
  , _modalMenuArr = [];

  const _btInfo = (<ButtonTab
    is={!!info}
    caption="Info"
    onClick={onClickInfo}
  />)

  if (hasError) {
    return [_btInfo];
  }

  _modalMenuArr.push(<ModalMenuFn
    {...chartHandlers}
    isShow={isShowFn}
    style={{...S_M_FN, ..._crModalMenuLeftStyle(isShowFn, S_BT_FN)}}
    config={config}
    getChart={getChart}
    onAddToWatch={itemConf ? onAddToWatch : void 0}
    onClose={toggleFn}
    key="fn"
  />)

  const _btLegend = (<ButtonTab
    is={!!legend}
    style={S_BT_LEGEND}
    caption="Legend"
    onClick={onClickLegend}
  />)

  let _btTabIndicator = null
  , _btAppearance = null;

  if (_isIndicatorTab(config, isWithoutIndicator)) {
    let _tabIndCaption = "Indicator";
    if (_isColumnCategoryConfig(config.xAxis)) {
      _tabIndCaption = "Math"
      _modalMenuArr.push(<ModalMenuInd2
        key="ind2"
        isShow={isShowInd}
        style={S_M_IND}
        config={config}
        getChart={getChart}
        onClose={toggleInd}
      />)
      _modalMenuArr.push(<ModalMenuAppearance
        key="appearance"
        isShow={isShowAppearance}
        style={S_M_APPEARANCE}
        config={config}
        getChart={getChart}
        onClose={toggleAppearance}
      />)
      _btAppearance = (<ButtonTab
        style={S_BT_APPEARANCE}
        caption="Appearance"
        isMenu={true}
        onClick={toggleAppearance}
      />)
    } else {
     _modalMenuArr.push(<ModalMenuIndicator
        key="ind"
        isShow={isShowInd}
        style={S_M_IND}
        config={config}
        getChart={getChart}
        onAddMfi={onAddMfi}
        onRemoveMfi={onRemoveMfi}
        onClose={toggleInd}
     />)
    }
    _btTabIndicator = (<ButtonTab
       style= {S_BT_IND}
       caption={_tabIndCaption}
       isMenu={true}
       onClick={toggleInd}
    />)
  }

  let _btTabMini = null;
  if (zhMiniConfigs && zhMiniConfigs.length) {
    _btTabMini = (<ButtonTab
       style= {S_BT_MINI}
       caption="Mini"
       isMenu={true}
       onClick={toggleMini}
    />)

    _modalMenuArr.push(<ModalMenuMini
       key="mini"
       isShow={isShowMini}
       style={{...S_M_MINI, ..._crModalMenuLeftStyle(isShowMini, S_M_MINI)}}
       configs={zhMiniConfigs}
       onClickItem={onMiniChart}
       onClose={toggleMini}
    />)
  }

  const _btFn = (<ButtonTab
    style={_btAppearance ? S_BT_FN_APPEARANCE : S_BT_FN}
    caption="Fn"
    isMenu={true}
    onClick={toggleFn}
  />)

  return [
    _btInfo,
    _btTabIndicator,
    _btAppearance,
    _btLegend,
    _btFn,
    _btTabMini,
    _modalMenuArr
  ];
};

export default useChartToolBar
