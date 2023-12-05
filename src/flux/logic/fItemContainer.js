import {
  bindTo,
  createElement
} from '../../components/uiApi';

import ChartContainer from '../../components/zhn-containers/ChartContainer';
import BrowserConfig from '../../constants/BrowserConfig';

import { setActiveContainer } from '../stores/contCheckBoxLogic';
import { closeChartContainer } from '../stores/compStore';
import { isAdminMode } from '../stores/settingStore';

import {
  sortItemsBy,
  updateMv,
  closeChartItem,
  removeItemsAll
} from '../stores/itemStore';

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
  dialogConf
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
