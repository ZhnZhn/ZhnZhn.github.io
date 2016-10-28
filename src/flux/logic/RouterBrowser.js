import { BrowserType } from '../../constants/Type';

import SourceBrowserDynamic from '../../components/browser-container/SourceBrowserDynamic';
import SourceBrowserDynamic2 from '../../components/browser-container/SourceBrowserDynamic2';

const RouterBrowser = {
   DEFAULT : SourceBrowserDynamic,

  [BrowserType.US_STOCKS] : SourceBrowserDynamic2,
  [BrowserType.NYSE_STOCKS] : SourceBrowserDynamic2,
  [BrowserType.NASDAQ_STOCKS] : SourceBrowserDynamic2,
  [BrowserType.LONDON_STOCKS] : SourceBrowserDynamic2
};

export default RouterBrowser
