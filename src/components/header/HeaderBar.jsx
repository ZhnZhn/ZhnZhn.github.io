import {
  showAbout,
  showDialog,
  useMsCloseDialog
} from '../../flux/stores/compStore';

import {
  showNdl,
  showEurostat,
  showWatch
} from '../../flux/stores/browserStore';

import {
  crContainerCn
} from '../styleFn';

import {
  HK_TOPICS,
  HK_NDL_BROWSER,
  HK_EUROSTAT_BROWSER,
  HK_WATCHLIST_BROWSER,
  HK_SETTINGS,
  HK_ABOUT
} from '../hotkeys/hotkeys';

import useToggle from '../hooks/useToggle';
import { useFnFocus } from '../hooks/useFocus';

import FlatButton from '../zhn-m/FlatButton';
import SvgSettings from '../zhn/svg/SvgSettings';
import SvgInfo from '../zhn/svg/SvgInfo';
import ModalSlider from '../zhn-modal-slider/ModalSlider';

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
, CL_NDL = "hbt-ndl"
, CL_EUROSTAT = "hbt-eurostat"
, CL_WATCH = "hbt-watch"
, CL_ABOUT = "hbt-about"
, CL_BTS_RIGHT = `${CL_HEADER}__bts-right`
, CL_BROWSER_MENU = `popup-menu ${CL_HEADER}__panel-browser`

, S_SVG_BT = {
  verticalAlign: 'middle',
  margin: '0 8px 3px 8px'
}

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
          refBt={refBt}
          isArrow={true}
          timeout={0}
          caption="Topics"
          title="Topics Menu"
          hotKey={HK_TOPICS}
          onClick={_toggleTopics}
       />
       <FlatButton
          className={CL_EUROSTAT}
          caption="Eurostat"
          title="Eurostat Browser"
          hotKey={HK_EUROSTAT_BROWSER}
          onClick={showEurostat}
       />
       <FlatButton
          className={CL_NDL}
          caption="NDL"
          title="Nasdaq Data Link Browser"
          hotKey={HK_NDL_BROWSER}
          onClick={showNdl}
       />
       <FlatButton
          className={CL_WATCH}
          caption="Watch"
          title="Watch List Browser"
          hotKey={HK_WATCHLIST_BROWSER}
          onClick={showWatch}
       />
       <HotBar
          useMsCloseDialog={useMsCloseDialog}
          onShowDialog={showDialog}
       />
       <div className={CL_BTS_RIGHT}>
          <LimitRemainingLabel />
          <FlatButton
             isPrimary={true}
             title="User Settings Dialog"
             hotKey={HK_SETTINGS}
             timeout={500}
             onClick={showSettings}
           >
             <SvgSettings style={S_SVG_BT} />
          </FlatButton>
          <FlatButton
             className={CL_ABOUT}
             title="About Web Application ERC"
             hotKey={HK_ABOUT}
             timeout={0}
             onClick={showAbout}
          >
             <SvgInfo style={S_SVG_BT} />
          </FlatButton>
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
