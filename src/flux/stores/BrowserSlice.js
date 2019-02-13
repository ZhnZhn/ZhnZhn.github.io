
import BrowserMenu from '../../constants/BrowserMenu';
import BrowserConfig from '../../constants/BrowserConfig';
import { BrowserType } from '../../constants/Type';

import Factory from '../logic/Factory';
import { BrowserActionTypes as BA } from '../actions/BrowserActions';

import DataWL from '../../constants/DataWL';

const C = {
  FAILED: 'Failed'
};

const _isArray = Array.isArray;

const _findItem = (menu, chartType) => {
  if (!_isArray(menu)) { return;}

  for (const topics of menu){
    const items = topics.items;
    if (_isArray(items)) {
      for(const item of items){
        if (item.id === chartType){
          return item;
        }
      }
    }
  }
};

const _setIsOpen = (value, menu, chartType) => {
  const item = _findItem(menu, chartType);
  if (item) {
    item.isOpen = value;
  }
}
, _setItemOpen = _setIsOpen.bind(null, true)
, _setItemClose = _setIsOpen.bind(null, false);

const _plusCounter = (value, menu, chartType) => {
  const item = _findItem(menu, chartType);
  if (item){
    item.counter += value;
    item.isOpen = true;
  }
}
, _addCounter = _plusCounter.bind(null, 1)
, _minusCounter = _plusCounter.bind(null, -1);

const _crSelectProps = (selectProps, obj) => {
  const arr = [...selectProps, ...(obj.selectProps || [])];
  return arr.length > 0
    ? { selectProps: arr }
    : undefined;
};

const _addDialogProps = (items) => {
  Object.keys(items).forEach(propName => {
    const item = items[propName]
        , addProps = item.addProps;
    if (addProps !== undefined) {
      const dialogProps = item.dialogProps
      , baseProps = items[addProps].dialogProps
      , { selectProps } = baseProps
      , _selectProps = _isArray(selectProps)
          ? _crSelectProps(selectProps, dialogProps)
          : undefined;
      item.dialogProps = Object.assign({},
        baseProps, dialogProps, _selectProps
      )
    }
  })
};

const BrowserSlice = {
  browserMenu: BrowserMenu,
  routeDialog: {
    WL: DataWL
  },

  getBrowserMenu(browserType){
     return this.browserMenu[browserType];
  },
  isWithItemCounter(browserType){
    const _config = BrowserConfig[browserType];
    return typeof _config === 'undefined'
      ? false
      : !_config.withoutItemCounter;
  },
  setMenuItemOpen(cT, bT){
    if (this.isWithItemCounter(bT)){
      _setItemOpen(this.getBrowserMenu(bT), cT);
    }
  },
  setMenuItemClose(cT, bT){
    if (this.isWithItemCounter(bT)){
      _setItemClose(this.getBrowserMenu(bT), cT);
    }
  },
  addMenuItemCounter(cT, bT){
    if (this.isWithItemCounter(bT)){
      _addCounter(this.getBrowserMenu(bT), cT);
    }
  },
  minusMenuItemCounter(cT, bT){
    if (this.isWithItemCounter(bT)){
      _minusCounter(this.getBrowserMenu(bT), cT);
    }
  },

  getSourceConfig(browserId, sourceId){
    if (sourceId.indexOf(BrowserType.STOCKS_BY_SECTORS) > 0){
      return BrowserConfig[browserId];
    }
    const _r = this.routeDialog[browserId];
    return _r ? _r[sourceId] : undefined;
  },

  onShowBrowserDynamicCompleted(option){
    const { browserType } = option;
    if ( !this.getBrowserMenu(browserType) ) {
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
  onShowBrowserDynamicFailed(option){
      this.showAlertDialog(option)
      this.trigger(BA.SHOW_BROWSER_DYNAMIC + C.FAILED)
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
         menuItems: elMenu,
         browserType: browserType
      })
    } else {
      this.trigger(BA.LOAD_BROWSER_DYNAMIC_COMPLETED, {
         json, browserType
      })
    }
  },
  onLoadBrowserDynamicFailed(option){
    const { alertItemId, caption } = option;
    option.alertItemId = alertItemId || caption
    this.showAlertDialog(option);
  }

}

export default BrowserSlice
