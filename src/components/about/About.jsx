import { isWideWidth } from '../has';
import {
  crStepStyle,
  crBsContainerCn,
  crScrollYCn
} from '../styleFn';

import useShowHideComponent from '../hooks/useShowHideComponent';
import { useMsAbout } from '../../flux/stores/compStore';

import BrowserCaption from '../zhn/BrowserCaption';
import ScrollPane from '../zhn/ScrollPane';
import OpenClose from '../zhn/OpenClose';
import ShowHide from '../zhn/ShowHide';

import XPlatformLink from './XPlatformLink';
import DataProviders from './DataProviders';

import StepTitles from '../zhn/StepTitles';
import { SpanBlack } from '../zhn/SpanToken';
import Link from '../links/ProviderLinks';
import LogosBar from './LogosBar';

const CL_ABOUT = crBsContainerCn("about-container")
, CL_SHOW_CONT = "show-cont"
, CL_SCROLL_Y = crScrollYCn()
, CL_BLACK = "black"

, S_STEP = crStepStyle("#80c040")
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
, S_GREEN = { color: '#80c040' }
, S_BLUE_DARK = { color: '#2f7ed8' }
, S_RED = { color: '#f44336' }

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
  ] = useShowHideComponent(true);

  useMsAbout(msAbout => {
    if (msAbout) {
      if (msAbout.is) {
        show()
      } else {
        hide()
      }
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
           stepStyle={S_STEP}
           titles={STEP_TITLES}
         />
          <p style={S_MT_4}>
            The result will be shown in a chart in a resizebale container.
          </p>
          <p style={S_MB_8EM}>
            Also it's possible to export the chart to PNG, JPG, SVG or print to PDF.
          </p>
          <p style={S_MB_6EM}>
            <span style={S_RED}>
               Attention:&nbsp;
            </span>
            <span>
              For one item from <SpanBlack>Dialog</SpanBlack> can be only one <SpanBlack>Chart item</SpanBlack> in a container.
              More information about a dataset can be found on a <SpanBlack>tab Info of Chart item.</SpanBlack>
            </span>
         </p>
          <OpenClose
            caption="More..."
            style={S_LH_14}
            ocStyle={S_LH_18}
          >
            <p style={S_MB_8EM}>
              After clicking a <SpanBlack>button Show</SpanBlack> in a Dialog will be an opened up <SpanBlack>Chart container</SpanBlack> with charts or empty.
              After closing a <SpanBlack>Chart container</SpanBlack> all charts remains. In one time max three <SpanBlack>Dialogs</SpanBlack> can be opened.
            </p>
            <p style={S_MB_8EM}>
              Some open and private data providers require user's <SpanBlack>API Key</SpanBlack>.
            </p>
            <p style={S_MB_8EM}>
              <span>For example, for loading data from&nbsp;</span>
              <Link.Ndl/>
              <span>
              &nbsp;without API Key exists some restriction
              on frequency and amount of queries (<span style={S_BLUE_DARK}>50 per day/1 at a time</span>) and can be deprecated,
              according to Nasdaq Data Link. With <SpanBlack>API Key</SpanBlack> it is possible to make (<span style={S_BLUE_DARK}>50 000 per day/1 at a time</span>).
              It's free of charge to receive.
              </span>
            </p>
            <p style={S_MB_8EM}>
              Data providers API Keys can be set on the <SpanBlack>tab ApiKeys, dialog Settings [s]</SpanBlack>.
            </p>
            <p style={S_MB_8EM}>
              Also for loading data from data providers with HTTP protocol required <SpanBlack>HTTPS proxy server</SpanBlack>,
              by default settled in the <SpanBlack>tab Options, dialog Settings [s]</SpanBlack>.
            </p>
            <p style={S_MB_8EM}>
              There is three UI theme in the web app ERC: <SpanBlack>Dark, Light, and Sand</SpanBlack> can be set on <SpanBlack>tab Options, dialog Settings [s]</SpanBlack>. All user's settings keep in browser's memory only for a current web session.
            </p>
         </OpenClose>
         <LogosBar />
         <p>
           <SpanBlack>
             *Logos Fair Use.
           </SpanBlack>
         </p>
         </div>
      </ScrollPane>
   </ShowHide>
  );
};

export default About
