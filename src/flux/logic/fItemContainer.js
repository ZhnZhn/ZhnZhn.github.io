import {
  bindTo,
  createElement
} from '../../components/uiApi';

import ChartContainer from '../../components/zhn-containers/ChartContainer';
import BrowserConfig from '../../constants/BrowserConfig';

import { isStr } from '../storeApi';
import { setActiveContainer } from '../stores/contCheckBoxLogic';
import { closeChartContainer } from '../stores/compStore';
import { isAdminMode } from '../stores/settingStore';

import {
  sortItemsBy,
  updateMv,
  closeChartItem,
  removeItemsAll
} from '../stores/itemStore';

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

  _caption = isStr(contCaption)
     ? contCaption
     : dialogCaption || menuTitle || 'Item Container';
  return [dataSource, _caption]
    .filter(Boolean)
    .join(': ');
};

export const crItemContainerEl = ({
  browserType,
  dialogConf
}) => {
  const {
    type,
    chartContainerComp,
    contWidth
  } = dialogConf || {}
  , _chartType = type || BrowserConfig[browserType].chartContainerType;

  return createElement(chartContainerComp || ChartContainer, {
    key: _chartType,
    chartType: _chartType,
    caption: _crCaption(dialogConf, browserType),
    browserType,
    contWidth,
    isAdminMode,
    onSetActive: bindTo(setActiveContainer, _chartType, browserType),
    onCloseContainer: bindTo(closeChartContainer, _chartType, browserType),
    onSortBy: bindTo(sortItemsBy, _chartType),
    updateMovingValues: bindTo(updateMv, _chartType),
    onCloseItem: closeChartItem,
    onRemoveAll: bindTo(removeItemsAll, _chartType, browserType)
  });
}
