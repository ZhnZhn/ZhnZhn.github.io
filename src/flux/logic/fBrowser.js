import {
  bindTo,
  createElement
} from '../../components/uiApi';

import {
  ComponentActions
} from '../actions/ComponentActions';
import {
  showModalDialog
} from '../stores/compStore';
import {
  useMsBrowserLoad,
  useMsBrowserShow,
  loadBrowser
} from '../stores/browserStore';
import {
  useWatchList
} from '../watch-list/watchListStore';
import {
  getProxy
} from '../stores/settingStore';

import {
  showItemsContainer
} from '../stores/itemStore';

import {
  BT_WATCH_LIST,
  BT_SWEDEN_STAT_ALL,
  BT_NORWAY_STAT_ALL,
  BT_FINLAND_STAT_ALL,
  BT_DENMARK_STAT_ALL,
  BT_IRELAND_STAT_ALL
} from '../../constants/BrowserType';

import RouterBrowser from './RouterBrowser';

import RouterItemOption from '../../components/zhn-select/RouterItemOption';
import RouterBrowserItem from '../../components/browser-items/RouterBrowserItem';

const _crBrowserWatchList = (
  Comp
) => createElement(Comp, {
   key: BT_WATCH_LIST,
   browserType: BT_WATCH_LIST,
   caption: "Watch List",
   isInitShow: true,
   useMsBrowserShow,
   useWatchList
});

const _crBrowserDynamic = (
  Comp,
  option
) => {
   const {
     browserType,
     caption='Source Browser' ,
     sourceMenuUrl,
     chartContainerType,
     modalDialogType,
     itemOptionType,
     itemType,
     descrUrl,
     dfProps
    } = option
    , ItemOptionComp = itemOptionType
        ? RouterItemOption[itemOptionType] || RouterBrowserItem.DF
        : RouterBrowserItem.DF
    , ItemComp = itemType
        ? RouterBrowserItem[itemType] || RouterBrowserItem.DEFAULT
        : void 0
    , onClickInfo = typeof ItemComp !== "undefined"
         ? ComponentActions.showDescription
         : void 0
    //for Type2
    , onShowLoadDialog = chartContainerType
         ? item => showModalDialog(modalDialogType, {
             item,
             browserType,
             chartContainerType,
             onShow: bindTo(showItemsContainer, chartContainerType, browserType)
           })
        : void 0;

   return createElement(Comp , {
     dfProps,
     key: browserType,
     browserType,
     isInitShow: true,
     caption,
     ItemOptionComp,
     ItemComp,
     descrUrl,
     onClickInfo,
     useMsBrowserShow,
     useMsBrowserLoad,
     onLoadMenu: bindTo(loadBrowser, { browserType, caption, sourceMenuUrl }),
     onShowLoadDialog, //for Type2
     getProxy // for BrowserSlider
   });
 }

const STAT_ALL_TYPES = [
  BT_SWEDEN_STAT_ALL,
  BT_NORWAY_STAT_ALL,
  BT_FINLAND_STAT_ALL,
  BT_DENMARK_STAT_ALL,
  BT_IRELAND_STAT_ALL
];
const _isStatAll = browserType => STAT_ALL_TYPES
  .indexOf(browserType) !== -1;


export const crAsyncBrowser = (
  option
) => {
  const bT = option.browserType;
  if (bT === BT_WATCH_LIST) {
    return RouterBrowser[BT_WATCH_LIST]
      .then(_crBrowserWatchList);
  }
  if (_isStatAll(bT)) {
    return RouterBrowser.STAT_ALL
      .then(Comp => _crBrowserDynamic(Comp, option));
  }
  return Promise.resolve(
     _crBrowserDynamic(
       RouterBrowser[bT] || RouterBrowser.DEFAULT,
       option
     )
  );
}
