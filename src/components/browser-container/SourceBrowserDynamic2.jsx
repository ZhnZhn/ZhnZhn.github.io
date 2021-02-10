import memoEqual from '../hoc/memoEqual'
import BrowserMenu2 from '../zhn-menu/BrowserMenu2'

const SourceBrowserDynamic2 = memoEqual(
  props => <BrowserMenu2 {...props} />
);

export default SourceBrowserDynamic2
