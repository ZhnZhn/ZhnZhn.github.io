
import BrowserMenu from '../../constants/BrowserMenu';
import BrowserConfig from '../../constants/BrowserConfig';
import { BrowserType } from '../../constants/Type';

import Factory from '../logic/Factory';
import { BrowserActionTypes as BA } from '../actions/BrowserActions';

import DataQE from '../../constants/DataQE';
import DataWL from '../../constants/DataWL';

const fnFindObj = function(menu, chartType){
  if (!menu) {
    return undefined;
  }

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
  if (obj) {
    obj.isOpen = value;
  }
};

const fnAddCounter = function(chartType, browserType, browserMenu, value){
  const obj = fnFindObj(browserMenu[browserType], chartType);
  if (obj){
    obj.counter += value;
    obj.isOpen = true;
  }
};

const _addDialogProps = (items) => {
  let propName, item, addProps;
  for (propName in items){
    item = items[propName]
    addProps = item.addProps
    if (addProps !== undefined) {
      Object.assign(item.dialogProps, items[addProps].dialogProps)
    }
  }
}

const BrowserSlice = {
  browserMenu : BrowserMenu,
  routeDialog : {
    QE : DataQE,
    WL : DataWL
  },

  getBrowserMenu(browserType){
     return this.browserMenu[browserType];
  },
  isWithItemCounter(browserType){
    const _config = BrowserConfig[browserType]
    if (typeof _config === 'undefined'){
      return false;
    } else {
      return !_config.withoutItemCounter;
    }
    //return !BrowserConfig[browserType].withoutItemCounter;
  },
  setMenuItemOpen(chartType, browserType){
    if (this.isWithItemCounter(browserType)){
       fnSetIsOpen(chartType, this.browserMenu, browserType, true);
    }
  },
  setMenuItemClose(chartType, browserType){
    if (this.isWithItemCounter(browserType)){
      fnSetIsOpen(chartType, this.browserMenu, browserType, false);
    }
  },
  addMenuItemCounter(chartType, browserType){
    if (this.isWithItemCounter(browserType)){
      fnAddCounter(chartType, browserType, this.browserMenu, 1);
    }
  },
  minusMenuItemCounter(chartType, browserType){
    if (this.isWithItemCounter(browserType)){
      fnAddCounter(chartType, browserType, this.browserMenu, -1);
    }
  },

  getSourceConfig(browserId, sourceId){
    if (sourceId.indexOf(BrowserType.STOCKS_BY_SECTORS) > 0){
      return BrowserConfig[browserId];
    }
    const _r = this.routeDialog[browserId];    
    return _r ? _r[sourceId] : undefined;
  },

  onShowBrowser(browserType){
    this.trigger(BA.SHOW_BROWSER, browserType);
  },

  onShowBrowserDynamic(option){
    const { browserType } = option;
    if (!this.browserMenu[browserType]) {
      Factory.crAsyncBrowser(option)
        .then(elBrowser => {
           this.browserMenu[browserType] = [];
           this.trigger(
              BA.INIT_BROWSER_DYNAMIC,
              elBrowser
           );
        })
        .catch(err => {
          //this.showAlertDialog(option);
          console.log(err)
        })
    } else {
       this.trigger(BA.SHOW_BROWSER_DYNAMIC, browserType);
    }
  },
  onLoadBrowserDynamicCompleted(option){
    const { json, browserType } = option;
    if (this.isWithItemCounter(browserType)){
      const { menu, items } = json
          , elMenu = BrowserMenu.createMenu(menu, items, browserType);
      _addDialogProps(items);

      this.routeDialog[browserType] = items;
      this.browserMenu[browserType] = elMenu;
      this.trigger(BA.LOAD_BROWSER_DYNAMIC_COMPLETED, {
         menuItems : elMenu, browserType: browserType
      })
    } else {
      this.trigger(BA.LOAD_BROWSER_DYNAMIC_COMPLETED, {
               json, browserType
      })
    }
  },
  onLoadBrowserDynamicFailed(option){
    option.alertItemId = (option.alertItemId)
              ? option.alertItemId
              : option.caption;
    this.showAlertDialog(option);
  }

}

export default BrowserSlice
