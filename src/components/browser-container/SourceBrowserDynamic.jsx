import memoEqual from '../hoc/memoEqual'
import BrowserMenu from '../zhn-menu/BrowserMenu'

const SourceBrowserDynamic = memoEqual(
  (props) => <BrowserMenu {...props} />
);

export default SourceBrowserDynamic
