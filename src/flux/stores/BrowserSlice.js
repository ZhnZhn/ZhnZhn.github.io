
import BrowserMenu from '../../constants/BrowserMenu';

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
  }

}

export default BrowserSlice
