import { createElement } from 'react';

import ChartContainer from '../../components/zhn-containers/ChartContainer';
import BrowserConfig from '../../constants/BrowserConfig';

import {
  CAT_SET_ACTIVE_CONTAINER,
  CAT_CLOSE_CHART_CONTAINER,
  ComponentActions
} from '../actions/ComponentActions';
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
    onSetActive: ComponentActions[CAT_SET_ACTIVE_CONTAINER]
      .bind(null, _chartType, browserType),
    onCloseContainer: ComponentActions[CAT_CLOSE_CHART_CONTAINER]
      .bind(null, _chartType, browserType),
    onSortBy: ChartActions[CHAT_SORT_BY]
      .bind(null, _chartType),
    updateMovingValues: ChartActions[CHAT_UPDATE_MOVING_VALUES]
      .bind(null, _chartType),
    onCloseItem: ChartActions[CHAT_CLOSE],
    onRemoveAll: ChartActions[CHAT_REMOVE_ALL]
      .bind(null, _chartType, browserType)
  });
}
