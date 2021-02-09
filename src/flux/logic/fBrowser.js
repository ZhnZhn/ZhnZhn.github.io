import { createElement } from 'react'

import ChartStore from '../stores/ChartStore';

import CA from '../actions/ComponentActions';
import CHA from '../actions/ChartActions';
import BA, { BrowserActionTypes as BAT } from '../actions/BrowserActions';
import { BrowserType as BT } from '../../constants/Type';

import RouterBrowser from './RouterBrowser';

import RouterItemOption from '../../components/zhn-select/RouterItemOption';
import RouterBrowserItem from '../../components/browser-items/RouterBrowserItem';


const _crBrowserWatchList = (Comp) => createElement(Comp, {
   key: BT.WATCH_LIST,
   browserType: BT.WATCH_LIST,
   caption: "Watch List",
   isInitShow: true,
   store: ChartStore,
   //showAction: BAT.SHOW_BROWSER,
   showAction: BAT.SHOW_BROWSER_DYNAMIC,
   updateAction: BAT.UPDATE_WATCH_BROWSER
})

const _crBrowserDynamic = (Comp, option) => {
   const {
         browserType, caption='Source Browser' , sourceMenuUrl,
         chartContainerType,
         modalDialogType, itemOptionType, itemType, descrUrl, dfProps
       } = option
    , ItemOptionComp = itemOptionType
          ? RouterItemOption[itemOptionType] || RouterBrowserItem.DEFAULT
          : RouterBrowserItem.DEFAULT
    , ItemComp = itemType
          ? RouterBrowserItem[itemType] || RouterBrowserItem.DEFAULT
          : void 0
    , onClickInfo = typeof ItemComp !== "undefined"
         ? CA.showDescription
         : void 0
    //for Type2
    , onShowLoadDialog = chartContainerType
         ? item => CA.showModalDialog(modalDialogType, {
             item, browserType, chartContainerType,
             onShow: CHA.showChart.bind(null, chartContainerType, browserType)
           })
        : void 0;

   return createElement(Comp , {
     dfProps,
     key: browserType,
     browserType: browserType,
     store: ChartStore,
     isInitShow: true,
     caption,
     ItemOptionComp,
     ItemComp,
     descrUrl,
     onClickInfo,
     showAction: BAT.SHOW_BROWSER_DYNAMIC,
     loadedAction: BAT.LOAD_BROWSER_DYNAMIC_COMPLETED,
     failedAction: BAT.LOAD_BROWSER_FAILED,
     updateAction: BAT.UPDATE_BROWSER_MENU, //for Type
     onLoadMenu: BA.loadBrowserDynamic.bind(null, { browserType, caption, sourceMenuUrl }),
     onShowLoadDialog //for Type2
   });
 }

const fBrowser = {
  crAsyncBrowser(option) {
    const { browserType } = option;
    switch (browserType) {
      case BT.WATCH_LIST:
        return RouterBrowser[BT.WATCH_LIST]
          .then(_crBrowserWatchList);

      case BT.SWEDEN_STAT_ALL:
      case BT.NORWAY_STAT_ALL:
      case BT.FINLAND_STAT_ALL:
        return RouterBrowser.STAT_ALL
          .then(Comp => _crBrowserDynamic(Comp, option));

      default:
        return Promise.resolve(
           _crBrowserDynamic(
             RouterBrowser[browserType] || RouterBrowser.DEFAULT,
             option
           )
        );
    }
  }
}

export default fBrowser
