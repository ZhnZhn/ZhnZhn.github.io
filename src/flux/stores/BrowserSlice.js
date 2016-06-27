
import BrowserMenu from '../../constants/BrowserMenu';

import Factory from '../logic/Factory';
import { BrowserActionTypes } from '../actions/BrowserActions';

import DataQE from '../../constants/DataQE';

import DataWL from '../../constants/DataWL';

const fnFindObj = function(menu, chartType){
  for (var i=0, maxPart=menu.length; i<maxPart; i++){
    for(var j=0, maxItem=menu[i].items.length; j<maxItem; j++){
      if (menu[i].items[j].id === chartType){
        return menu[i].items[j];
      }
    }
  }
};

const fnSetIsOpen = function(chartType, browserMenu, browserType, value){
  const obj = fnFindObj(browserMenu[browserType], chartType);
  obj.isOpen = value;
};

const fnAddCounter = function(chartType, browserType, browserMenu, value){
  const obj = fnFindObj(browserMenu[browserType], chartType);
  obj.counter += value;
  obj.isOpen = true;
};

const BrowserSlice = {
  browserMenu : BrowserMenu,
  routeDialog : {
    QE : DataQE,

    WL : DataWL
  },

  getBrowserMenu(browserType){
     return this.browserMenu[browserType];
  },
  setMenuItemOpen(chartType, browserType){
    fnSetIsOpen(chartType, this.browserMenu, browserType, true);
  },
  setMenuItemClose(chartType, browserType){
    fnSetIsOpen(chartType, this.browserMenu, browserType, false);
  },
  addMenuItemCounter(chartType, browserType){
    fnAddCounter(chartType, browserType, this.browserMenu, 1);
  },
  minusMenuItemCounter(chartType, browserType){
    fnAddCounter(chartType, browserType, this.browserMenu, -1);
  },

  getSourceConfig(browserId, sourceId){
    return this.routeDialog[browserId][sourceId];
  },

  onShowBrowser(browserType){
    this.trigger(BrowserActionTypes.SHOW_BROWSER, browserType);
  },

  onShowBrowserDynamic(option){
    const { browserType } = option;
    if (!this.browserMenu[browserType]) {
       const elBrowser = Factory.createBrowserDynamic(option);
       this.browserMenu[browserType] = [];
       this.trigger(BrowserActionTypes.INIT_BROWSER_DYNAMIC, elBrowser);
    } else {
       this.trigger(BrowserActionTypes.SHOW_BROWSER_DYNAMIC, browserType);
    }
  },
  onLoadBrowserDynamicCompleted(option){
    const { menu, items, browserType } = option
        , elMenu = BrowserMenu.createMenu(menu, items, browserType);
    this.routeDialog[browserType] = items;
    this.browserMenu[browserType] = elMenu;
    this.trigger(BrowserActionTypes.LOAD_BROWSER_DYNAMIC_COMPLETED, {
      menuItems : elMenu, browserType: browserType
    })
  },
  onLoadBrowserDynamicFailed(option){
    option.alertItemId = option.caption;
    this.showAlertDialog(option);
  }

}

export default BrowserSlice
