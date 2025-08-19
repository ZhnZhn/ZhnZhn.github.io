import { COLOR_GREEN } from '../../constants/Color';
import { useMsAbout } from '../../flux/stores/compStore';

import { isWideWidth } from '../has';
import {
  crBsContainerCn,
  crScrollYCn,
  crColorStyle
} from '../styleFn';

import useShowHideComponent from '../hooks/useShowHideComponent';

import BrowserCaption from '../zhn/BrowserCaption';
import ScrollPane from '../zhn/ScrollPane';
import OpenClose from '../zhn/OpenClose';
import ShowHide from '../zhn/ShowHide';

import XPlatformLink from './XPlatformLink';
import DataProviders from './DataProviders';

import StepTitles from '../zhn/StepTitles';
import { MarkBlack } from '../zhn/SpanToken';
import LogosBar from './LogosBar';

const CL_ABOUT = crBsContainerCn("about-container")
, CL_SHOW_CONT = "show-cont"
, CL_SCROLL_Y = crScrollYCn()
, CL_BLACK = "black"
, S_SCROLL_DIV = { height: '94%' }
, S_DIV_WRAPPER = {
  paddingLeft: 12,
  paddingRight: 5,
  lineHeight: 1.4,
  color: 'gray',
  fontWeight: 'bold'
}
, S_LH_18 = { lineHeight: 1.8 }
, S_LH_14 = { lineHeight: 1.4 }
, S_MB_8EM = { marginBottom: '0.8em' }
, S_MB_6EM = { marginBottom: '0.6em' }
, S_MB_4 = { marginBottom: 4 }
, S_MT_4 = { marginTop: 4 }
, S_BT_X_PLATFORM = { marginLeft: 12 }
, S_GREEN = crColorStyle(COLOR_GREEN)
, S_RED = crColorStyle('#f44336')

, STEP_TITLES = [
  "Please, choose a data source Browser from Topics [t]",
  "Next, choose a dataset menu item in the the opended up Browser",
  "Select params and enter query date in the opened up draggable Dialog",
  "Click a button Load"
]

, IS_CLOSE_PROVIDERS = !isWideWidth();

const About = () => {
  const [
    isShow,
    show,
    hide,
    hKeyDown
  ] = useShowHideComponent(!0);

  useMsAbout(msAbout => {
    if (msAbout) {
      (msAbout.is ? show : hide)()
    }
  })

  return (
    <ShowHide
      isShow={isShow}
      className={CL_ABOUT}
      animationClass={CL_SHOW_CONT}
      onKeyDown={hKeyDown}
    >
       <BrowserCaption
          caption="About"
          onClose={hide}
       >
         <XPlatformLink
            style={S_BT_X_PLATFORM}
            account="webapperc"
            title="X / Twitter page @webapperc with chart examples"
         />
       </BrowserCaption>

       <ScrollPane
         className={CL_SCROLL_Y}
         style={S_SCROLL_DIV}
       >
         <div style={S_DIV_WRAPPER}>
         <p style={S_MB_4}>
           <span style={S_GREEN}>
             ERC (Economic RESTful Client)&nbsp;
           </span>
           <span>
             is a web app that gives the ability to explore, visualize and compose economic and financial data mostly to charts from open and private data providers.
           </span>
         </p>
         <DataProviders isClose={IS_CLOSE_PROVIDERS} />
         <StepTitles
           className={CL_BLACK}
           stepColor={COLOR_GREEN}
           titles={STEP_TITLES}
         />
          <p style={{...S_MT_4, ...S_MB_6EM}}>
            The results will be displayed in a chart within a resizable container.
            It is also possible to export the chart in PNG, JPG, SVG formats, or to print it as a PDF.
          </p>
          <p style={S_MB_6EM}>
            <span style={S_RED}>
               Notice:&nbsp;
            </span>
            <span>
              For each set of params from a dialog can be only one chart item within a chart container.
              Additional information about certain loaded dataset can be found in the <MarkBlack>Info tab of the chart item</MarkBlack>.
            </span>
         </p>
          <OpenClose
            caption="More..."
            style={S_LH_14}
            ocStyle={S_LH_18}
          >
            <p style={S_MB_8EM}>
              After clicking a <MarkBlack>button Open</MarkBlack> in a dialog, a chart container will appear.
              Upon closing a chart container all charts will remains accesible.
            </p>
            <p style={S_MB_8EM}>
              Certain open and private data providers require the user's <MarkBlack>API key</MarkBlack>.
              API keys for data providers can be configured in the <MarkBlack>ApiKeys tab of dialog Settings [s]</MarkBlack>.
            </p>
            <p style={S_MB_8EM}>
              For downloading data without CORS restriction from some data providers requires a <MarkBlack>local HTTP proxy server</MarkBlack>.
              It can be configured in the <MarkBlack>Options tab of dialog Settings [s]</MarkBlack>.
            </p>
            <p style={S_MB_8EM}>
              The web application ERC currently has nine distinct UI themes.
              All user settings are stored in the browser's memory and are retained only for the duration of the current web session.
            </p>
         </OpenClose>
         <LogosBar />
         <p>
           <MarkBlack>
             *Logos Fair Use.
           </MarkBlack>
         </p>
         </div>
      </ScrollPane>
   </ShowHide>
  );
};

export default About
