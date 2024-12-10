import { isUndef } from "../../utils/isTypeFn";
import { bindTo } from "../../utils/bindTo";
import { isInArrStr } from "../../utils/arrFn";

import {
  BT_WATCH_LIST,
  BT_SWEDEN_STAT_ALL,
  BT_NORWAY_STAT_ALL,
  BT_FINLAND_STAT_ALL,
  BT_DENMARK_STAT_ALL,
  BT_IRELAND_STAT_ALL
} from "../../constants/BrowserType";

import { showDescription } from "../actions/ComponentActions";
import { showModalDialog } from "../stores/compStore";
import { showItemsContainer } from "../stores/itemStore";
import { getProxy } from "../stores/settingStore";
import {
  useMsBrowserLoad,
  useMsBrowserShow,
  loadBrowser
} from "../stores/browserStore";

import { useWatchList } from "../watch-list/watchListStore";

import { getItemOptionComp } from "../../components/zhn-select/RouterItemOption";
import { getBrowserItemComp } from "../../components/browser-items/RouterBrowserItem";

import { getBrowserComp } from "./RouterBrowser";

const _crBrowserWatchList = (
  Comp
) => (<Comp
  key={BT_WATCH_LIST}
  isInitShow={true}
  browserType={BT_WATCH_LIST}
  caption="Watch List"
  useMsBrowserShow={useMsBrowserShow}
  useWatchList={useWatchList}
/>);

const _crBrowserDynamic = (
  Comp,
  option
) => {
  const {
    browserType,
    caption="Source Browser",
    itemStyle,
    topicStyle,
    sourceMenuUrl,
    chartContainerType,
    modalDialogType,
    itemOptionType,
    itemType,
    descrUrl,
    dfProps
  } = option
  , ItemComp = getBrowserItemComp(itemType);

  return (<Comp
    key={browserType}
    isInitShow={true}
    dfProps={dfProps}
    browserType={browserType}
    caption={caption}
    descrUrl={descrUrl}
    itemStyle={itemStyle}
    topicStyle={topicStyle}
    ItemOptionComp={getItemOptionComp(itemOptionType)}
    ItemComp={ItemComp}
    onClickInfo={isUndef(ItemComp) ? void 0 : showDescription}
    useMsBrowserShow={useMsBrowserShow}
    useMsBrowserLoad={useMsBrowserLoad}
    onLoadMenu={bindTo(loadBrowser, {
      browserType,
      caption,
      sourceMenuUrl})
    }
    onShowLoadDialog={chartContainerType
      ? item => showModalDialog(modalDialogType, {
          item,
          browserType,
          chartContainerType,
          onShow: bindTo(showItemsContainer, chartContainerType, browserType)
        })
      : void 0} //for Type2
    getProxy={getProxy} // for BrowserSlider
  />);
};

const _isStatAllBrowserType = isInArrStr([
  BT_SWEDEN_STAT_ALL,
  BT_NORWAY_STAT_ALL,
  BT_FINLAND_STAT_ALL,
  BT_DENMARK_STAT_ALL,
  BT_IRELAND_STAT_ALL
]);

export const crAsyncBrowser = (
  option
) => {
  const bT = option.browserType;
  return bT === BT_WATCH_LIST
    ? getBrowserComp(BT_WATCH_LIST).then(_crBrowserWatchList)
    : _isStatAllBrowserType(bT)
       ? getBrowserComp("STAT_ALL").then(Comp => _crBrowserDynamic(Comp, option))
       : Promise.resolve(_crBrowserDynamic(getBrowserComp(bT), option));
}
