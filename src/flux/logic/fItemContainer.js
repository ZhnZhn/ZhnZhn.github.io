import {
  bindTo,
  createElement
} from '../../components/uiApi';

import ChartContainer from '../../components/zhn-containers/ChartContainer';
import BrowserConfig from '../../constants/BrowserConfig';

import {
  CAT_CLOSE_CHART_CONTAINER,
  ComponentActions
} from '../actions/ComponentActions';
import {
  setActiveContainer
} from '../stores/contCheckBoxLogic';
import {
  CHAT_SORT_BY,
  CHAT_UPDATE_MOVING_VALUES,
  CHAT_CLOSE,
  CHAT_REMOVE_ALL,
  ChartActions
} from '../actions/ChartActions';

const _isStr = str => typeof str === 'string';

const _crCaption = (
  dialogConf,
  browserType
) => {
  let _caption = dialogConf.contFullCaption
    || BrowserConfig[browserType].contFullCaption;
  if (_caption) {
    return _caption;
  }

  const {
    contCaption,
    dialogCaption,
    menuTitle,
    dialogProps
  } = dialogConf
  , { dataSource= '' } = dialogProps || {};

  _caption = _isStr(contCaption)
     ? contCaption
     : dialogCaption || menuTitle || 'Item Container';
  return [dataSource, _caption]
    .filter(Boolean)
    .join(': ');
};

export const crItemContainerEl = ({
  browserType,
  dialogConf,
  store
}) => {
  const {
    type,
    chartContainerComp,
    contWidth
  } = dialogConf || {}
  , Comp = chartContainerComp || ChartContainer
  , _chartType = type || BrowserConfig[browserType].chartContainerType
  , _caption = _crCaption(dialogConf, browserType);

  return createElement(Comp, {
    key: _chartType,
    caption: _caption,
    chartType: _chartType,
    store,
    browserType,
    contWidth,
    onSetActive: bindTo(setActiveContainer, _chartType, browserType),
    onCloseContainer: bindTo(ComponentActions[CAT_CLOSE_CHART_CONTAINER], _chartType, browserType),
    onSortBy: bindTo(ChartActions[CHAT_SORT_BY], _chartType),
    updateMovingValues: bindTo(ChartActions[CHAT_UPDATE_MOVING_VALUES], _chartType),
    onCloseItem: ChartActions[CHAT_CLOSE],
    onRemoveAll: bindTo(ChartActions[CHAT_REMOVE_ALL], _chartType, browserType)
  });
}
