
import BrowserMenu from '../../constants/BrowserMenu';

const BrowserSlice = {
  browserMenu : BrowserMenu,
  getBrowserMenu(browserType){
     return this.browserMenu[browserType];
  }
}

export default BrowserSlice
