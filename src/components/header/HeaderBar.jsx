import {
  showAbout,
  showDialog,
  useMsCloseDialog
} from '../../flux/stores/compStore';

import {
  showEurostat,
  showDbn,
  showWatch
} from '../../flux/stores/browserStore';

import {
  crBtAriaLabelProps
} from '../a11yFn';

import {
  crContainerCn
} from '../styleFn';

import {
  HK_TOPICS,
  HK_EUROSTAT_BROWSER,
  HK_DBN_BROWSER,
  HK_WATCHLIST_BROWSER,
  HK_SETTINGS,
  HK_ABOUT
} from '../hotkeys/hotkeys';

import { useToggle } from '../hooks/useToggle';
import { useFnFocus } from '../hooks/useFocus';

import FlatButton from '../zhn-m/FlatButton';
import {
  FlatButtonSettings,
  FlatButtonInfo
} from '../zhn-m/FlatButtonSvg';
import { ModalSlider } from '../zhn-modal-slider/ModalSlider';

import ProgressLoading from './ProgressLoading';
import AppLabel from './AppLabel';
import IconLogoErc from './IconLogoErc';
import HotBar from './HotBar';
import LimitRemainingLabel from './LimitRemainingLabel';
import crBrowserModel from './BrowserModel';

const LOGO_TITLE = "Web app ERC (Economic RESTful Client)"
, CAPTION = "ERC v0.18.0"

, CL_HEADER = "header"
, CL_HEADER_BAR = crContainerCn(CL_HEADER)
, CL_ICON = `${CL_HEADER}__icon-erc`
, CL_LABEL = `${CL_HEADER}__app-label`
, CL_DBN = "bt-dbn"
, CL_EUROSTAT = "bt-eurostat"
, CL_WATCH = "bt-watch"
, CL_ABOUT = "bt-about"
, CL_BTS_RIGHT = `${CL_HEADER}__bts-right`
, CL_BROWSER_MENU = `${CL_HEADER}__panel-browser`

, _crTitleOpen = strNoun => `Open ${strNoun}`
, _crBtFlatProps = (
  caption,
  title,
  hotKey,
  className
) => ({
  ...crBtAriaLabelProps(title),
  caption,
  hotKey,
  className
})
, BT_TOPICS_PROPS = _crBtFlatProps(
  "Topics",
  _crTitleOpen("Topics Menu"),
  HK_TOPICS
)
, BT_EUROSTAT_PROPS= _crBtFlatProps(
  "Eurostat",
  _crTitleOpen("Eurostat Browser"),
  HK_EUROSTAT_BROWSER,
  CL_EUROSTAT
)
, BT_DBN_PROPS = _crBtFlatProps(
  "DBN",
  _crTitleOpen("DBnomics Browser"),
  HK_DBN_BROWSER,
  CL_DBN
)
, BT_WATCH_PROPS = _crBtFlatProps(
  "Watch",
  _crTitleOpen("Watch List Browser"),
  HK_WATCHLIST_BROWSER,
  CL_WATCH
)
, BT_SETTINGS_PROPS = crBtAriaLabelProps(
  _crTitleOpen("Settings")
)
, BT_ABOUT_PROPS = crBtAriaLabelProps(
  _crTitleOpen("About")
)

, MODEL = crBrowserModel();

const HeaderBar = ({
  showSettings
}) => {
  const [
    isTopics,
    toggleTopics
  ] = useToggle()
  , [
    refBt,
    _toggleTopics
  ] = useFnFocus(toggleTopics);

  return (
    <div className={CL_HEADER_BAR}>
       <ProgressLoading />
       <IconLogoErc
          className={CL_ICON}
          title={LOGO_TITLE}
       />
       <AppLabel
          className={CL_LABEL}
          caption={CAPTION}
       />
       <FlatButton
          {...BT_TOPICS_PROPS}
          timeout={0}
          refBt={refBt}
          isArrow={true}
          onClick={_toggleTopics}
       />
       <FlatButton
          {...BT_EUROSTAT_PROPS}
          onClick={showEurostat}
       />
       <FlatButton
          {...BT_DBN_PROPS}
          onClick={showDbn}
       />
       <FlatButton
          {...BT_WATCH_PROPS}
          onClick={showWatch}
       />
       <HotBar
          useMsCloseDialog={useMsCloseDialog}
          onShowDialog={showDialog}
       />
       <div className={CL_BTS_RIGHT}>
          <LimitRemainingLabel />
          <FlatButtonSettings
            {...BT_SETTINGS_PROPS}
            hotKey={HK_SETTINGS}
            timeout={500}
            onClick={showSettings}
          />
          <FlatButtonInfo
            {...BT_ABOUT_PROPS}
            className={CL_ABOUT}
            hotKey={HK_ABOUT}
            onClick={showAbout}
          />
        </div>
        <ModalSlider
           isShow={isTopics}
           className={CL_BROWSER_MENU}
           model={MODEL}
           onClose={_toggleTopics}
        />
    </div>
  );
};

export default HeaderBar
