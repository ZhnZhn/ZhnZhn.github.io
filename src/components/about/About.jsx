import useBool from '../hooks/useBool';
import useListen from '../hooks/useListen';
import useTheme from '../hooks/useTheme';

import {
  CAT_SHOW_ABOUT
} from '../../flux/actions/ComponentActions';
import {
  CHAT_INIT_AND_SHOW,
  CHAT_SHOW
} from '../../flux/actions/ChartActions';

import { HAS_WIDE_WIDTH } from '../has';

import A from '../Comp';
import TwitterLink from './TwitterLink';
import DataProviders from './DataProviders';
import StepTitle from './StepTitle';
import Link from '../links/ProviderLinks';
import LogosBar from './LogosBar';

const TH_ID = 'ABOUT'

, CL_ABOUT = 'about-container'
, CL_SHOW_CONT = 'show-cont'
, CL_SCROLL = 'scroll-container-y'

, S_BROWSER_CAPTION = { paddingTop: 6 }
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
, S_BT_TWITTER = { marginLeft: 12 }
, S_GREEN = { color: '#80c040' }
, S_BLACK = { color: 'black' }
, S_BLUE_DARK = { color: '#2f7ed8' }
, S_RED = { color: '#f44336' }

, STEP_T1 = "Please, choose a data source Browser from Topics [t]"
, STEP_T2 = "Next, choose a dataset menu item in the the opended up Browser"
, STEP_T3 = "Select params and enter query date in the opened up draggable Dialog"
, STEP_T4 = "Click a button Load"

, IS_CLOSE_PROVIDERS = !HAS_WIDE_WIDTH;

const _isHide = actionType =>
  actionType === CHAT_INIT_AND_SHOW
  || actionType === CHAT_SHOW;

const About = () => {
  const [
    isShow,
    show,
    hide
  ] = useBool(true)
  , TS = useTheme(TH_ID);

  useListen(actionType => {
    if (actionType === CAT_SHOW_ABOUT){
      show()
    } else if (_isHide(actionType)) {
      hide()
    }
  })

  return (
    <A.ShowHide
      className={CL_ABOUT}
      style={TS.ROOT}
      isShow={isShow}
      animationClass={CL_SHOW_CONT}
    >
       <A.BrowserCaption
          style={S_BROWSER_CAPTION}
          caption="About"
          onClose={hide}
       >
         <TwitterLink
            style={S_BT_TWITTER}
            account="webapperc"
            title="Twitter page @wepapperc with chart examples"
         />
       </A.BrowserCaption>

       <A.ScrollPane
         className={CL_SCROLL}
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
         <div style={S_BLACK}>
            <StepTitle step="1" title={STEP_T1} />
            <StepTitle step="2" title={STEP_T2} />
            <StepTitle step="3" title={STEP_T3} />
            <StepTitle step="4" title={STEP_T4} />
         </div>
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
              For one item from <span style={S_BLACK}>Dialog</span> can be only one <span style={S_BLACK}>Chart item</span> in a container.
              More information about a dataset can be found on a <span style={S_BLACK}>tab Info of Chart item.</span>
            </span>
         </p>
          <A.OpenClose
            caption="More..."
            style={S_LH_14}
            ocStyle={S_LH_18}
          >
            <p style={S_MB_8EM}>
              After clicking a <span style={S_BLACK}>button Show</span> in a Dialog will be an opened up <span style={S_BLACK}>Chart container</span> with charts or empty.
              After closing a <span style={S_BLACK}>Chart container</span> all charts remains. In one time max three <span style={S_BLACK}>Dialogs</span> can be opened.
            </p>
            <p style={S_MB_8EM}>
              Some open and private data providers require user's <span style={S_BLACK}>API Key</span>.
            </p>
            <p style={S_MB_8EM}>
              <span>For example, for loading data from&nbsp;</span>
              <Link.Ndl/>
              <span>
              &nbsp;without API Key exists some restriction
              on frequency and amount of queries (<span style={S_BLUE_DARK}>50 per day/1 at a time</span>) and can be deprecated,
              according to Nasdaq Data Link. With <span style={S_BLACK}>API Key</span> it is possible to make (<span style={S_BLUE_DARK}>50 000 per day/1 at a time</span>).
              It's free of charge to receive.
              </span>
            </p>
            <p style={S_MB_8EM}>
              Data providers API Keys can be set on the <span style={S_BLACK}>tab ApiKeys, dialog Settings [s]</span>.
            </p>
            <p style={S_MB_8EM}>
              Also for loading data from data providers with HTTP protocol required <span style={S_BLACK}>HTTPS proxy server</span>,
              by default settled in the <span style={S_BLACK}>tab Options, dialog Settings [s]</span>.
            </p>
            <p style={S_MB_8EM}>
              There is three UI theme in the web app ERC: <span style={S_BLACK}>Dark, Light, and Sand</span> can be set on <span style={S_BLACK}>tab Options, dialog Settings [s]</span>. All user's settings keep in browser's memory only for a current web session.
            </p>
         </A.OpenClose>
         <LogosBar />
         <p>
           <span style={S_BLACK}>
             *Logos Fair Use.
           </span>
         </p>
         </div>
      </A.ScrollPane>
   </A.ShowHide>
  );
};

export default About
