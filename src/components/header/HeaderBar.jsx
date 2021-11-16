import CA, { ComponentActionTypes as CAT } from '../../flux/actions/ComponentActions'
import BA from '../../flux/actions/BrowserActions'

import use from '../hooks/use'
import Comp from '../Comp'

import ProgressLoading from './ProgressLoading'
import AppLabel from './AppLabel'
import IconLogoErc from './IconLogoErc'
import HotBar from './HotBar'
import LimitRemainingLabel from './LimitRemainingLabel'
import crBrowserModel from './BrowserModel'

const {
  FlatButton,
  SvgSettings, SvgInfo,
  ModalSlider
} = Comp;

const { useTheme, useToggle, useFnFocus } = use;

const LOGO_TITLE = "Web app ERC (Economic RESTful Client)"
, CAPTION = "ERC v0.18.0"

, THEME_ID = 'HEADER_BAR'

, CL_HEADER = "header"
, CL_ICON = "header__icon-erc"
, CL_LABEL = "header__app-label"
, CL_TOPICS = "header__bt-topics"
, CL_QUANDL = "header__bt-quandl"
, CL_EUROSTAT = "header__bt-eurostat"
, CL_WATCH = "header__bt-watch"
, CL_BTS_RIGHT = "header__bts-right"
, CL_ABOUT = "header__bt-about"
, CL_BROWSER_MENU = "popup-menu header__panel-browser"

, S_SVG_BT = {
  verticalAlign: 'middle',
  margin: '0 8px 3px 8px'
}

, MODEL = crBrowserModel();

const HeaderBar = ({
  store,
  showSettings
}) => {
  const [isTopics, toggleTopics] = useToggle(false)
  , [refBt, _toggleTopics] = useFnFocus(toggleTopics)
  , TS = useTheme(THEME_ID);

  return (
    <div className={CL_HEADER} style={TS.ROOT} >
       <ProgressLoading store={store} />
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
         className={CL_TOPICS}
         style={TS.BT}
         caption="Topics"
         title="Click to open topics menu"
         accessKey="t"
         onClick={_toggleTopics}
        />
        <FlatButton
          className={CL_QUANDL}
          style={TS.BT}
          caption="Quandl"
          title="Quandl Browser"
          accessKey="q"
          onClick={BA.showQuandl}
        />
        <FlatButton
          className={CL_EUROSTAT}
          style={TS.BT}
          caption="Eurostat"
          title="Eurostat Browser"
          accessKey="u"
          onClick={BA.showEurostat}
        />
        <FlatButton
           className={CL_WATCH}
           style={TS.BT}
           caption="Watch"
           title="Watch List Browser"
           accessKey="w"
           onClick={BA.showWatch}
        />
        <HotBar
          btStyle={TS.BT_HOT}
          store={store}
          closeDialogAction={CAT.CLOSE_DIALOG}
          onShowDialog={CA.showDialog}
        />
        <div className={CL_BTS_RIGHT}>
          <LimitRemainingLabel store={store} />
          <FlatButton
             style={TS.BT}
             isPrimary={true}
             title="User Settings Dialog"
             accessKey="s"
             timeout={500}
             onClick={showSettings}
           >
             <SvgSettings style={S_SVG_BT} />
           </FlatButton>
           <FlatButton
             className={CL_ABOUT}
             style={TS.BT}
             title="About Web Application ERC"
             accessKey="a"
             timeout={0}
             onClick={CA.showAbout}
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
