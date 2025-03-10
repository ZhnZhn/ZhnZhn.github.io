import { isStr } from "../../utils/isTypeFn";
import { joinByColon } from "../../utils/arrFn";
import { bindTo } from "../../utils/bindTo";

import BrowserConfig from "../../constants/BrowserConfig";
import ChartContainer from "../../components/zhn-containers/ChartContainer";

import { isAdminMode } from "../stores/settingStore";
import { setActiveContainer } from "../stores/contCheckBoxLogic";
import { closeChartContainer } from "../stores/compStore";
import {
  sortItemsBy,
  updateMv,
  closeChartItem,
  removeItemsAll
} from "../stores/itemStore";

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
  , {
    ds,
    dataSource
  } = dialogProps || {};
  _caption = isStr(contCaption)
     ? contCaption
     : dialogCaption || menuTitle || "Item Container";
  return joinByColon(ds || dataSource, _caption);
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
  , _chartType = type || BrowserConfig[browserType].chartContainerType
  , Comp = chartContainerComp || ChartContainer;

  return (<Comp
    key={_chartType}
    chartType={_chartType}
    caption={_crCaption(dialogConf, browserType)}
    browserType={browserType}
    contWidth={contWidth}
    isAdminMode={isAdminMode}
    onSetActive={bindTo(setActiveContainer, _chartType, browserType)}
    onCloseContainer={bindTo(closeChartContainer, _chartType, browserType)}
    onSortBy={bindTo(sortItemsBy, _chartType)}
    updateMovingValues={bindTo(updateMv, _chartType)}
    onCloseItem={closeChartItem}
    onRemoveAll={bindTo(removeItemsAll, _chartType, browserType)}
  />);
}
