import use from '../hooks/use';

import { ComponentActionTypes as CAT } from '../../flux/actions/ComponentActions';
import { ChartActionTypes as CHAT } from '../../flux/actions/ChartActions';

import has from '../has'

import A from '../Comp';
import TwitterLink from './TwitterLink';
import DataProviders from './DataProviders';
import StepTitle from './StepTitle';
import Link from '../links/ProviderLinks';
import LogosBar from './LogosBar';

import S from './About.Style';

const { useBool, useListen, useTheme } = use;

const TH_ID = 'ABOUT'

, CL_ABOUT = 'about-container'
, CL_SCROLL = 'scroll-container-y'

, STEP_T1 = "Please, choose a data source Browser from Topics [t]"
, STEP_T2 = "Next, choose a dataset menu item in the the opended up Browser"
, STEP_T3 = "Select params and enter query date in the opened up draggable Dialog"
, STEP_T4 = "Click a button Load"

, IS_CLOSE_PROVIDERS = !has.isWideWidth;

const About = ({
  store,
  isInitShow
}) => {
  const [isShow, show, hide] = useBool(isInitShow);

  useListen(store, actionType => {
    if (actionType === CAT.SHOW_ABOUT){
      show()
    } else if (actionType === CHAT.INIT_AND_SHOW_CHART ||
      actionType === CHAT.SHOW_CHART){
      hide()
    }
  })

  const TS = useTheme(TH_ID);

  return (
    <A.ShowHide
      className={CL_ABOUT}
      style={TS.ROOT}
      isShow={isShow}
    >
       <A.BrowserCaption
          caption="About"
          onClose={hide}
       >
         <TwitterLink
            style={S.BT_TWITTER}
            account="webapperc"
            title="Twitter page @wepapperc with chart examples"
         />
       </A.BrowserCaption>

       <A.ScrollPane
         className={CL_SCROLL}
         style={S.SCROLL_DIV}
       >
         <div style={{...S.DIV_WRAPPER, ...S.GREY}}>
         <p style={S.MB_4}>
           <span style={S.GREEN}>
             ERC (Economic RESTful Client)&nbsp;
           </span>
           <span>
             is a web app that gives the ability to explore, visualize and compose economic and financial data mostly to charts from open and private data providers.
           </span>
         </p>
         <DataProviders isClose={IS_CLOSE_PROVIDERS} />
         <div style={S.BLACK}>
            <StepTitle step="1" title={STEP_T1} />
            <StepTitle step="2" title={STEP_T2} />
            <StepTitle step="3" title={STEP_T3} />
            <StepTitle step="4" title={STEP_T4} />
         </div>
          <p style={S.MARGIN_TOP}>
            The result will be shown in a chart in a resizebale container.
          </p>
          <p style={S.MB_8EM}>
            Also it's possible to export the chart to PNG, JPG, SVG or print to PDF.
          </p>
          <p style={S.MB_6EM}>
            <span style={S.RED}>
               Attention:&nbsp;
            </span>
            <span>
              For one item from <span style={S.BLACK}>Dialog</span> can be only one <span style={S.BLACK}>Chart item</span> in a container.
              More information about a dataset can be found on a <span style={S.BLACK}>tab Info of Chart item.</span>
            </span>
         </p>
          <A.OpenClose
            caption="More..."
            style={S.LH_14}
            ocStyle={S.LH_18}
          >
            <p style={S.MB_8EM}>
              After clicking a <span style={S.BLACK}>button Show</span> in a Dialog will be an opened up <span style={S.BLACK}>Chart container</span> with charts or empty.
              After closing a <span style={S.BLACK}>Chart container</span> all charts remains. In one time max three <span style={S.BLACK}>Dialogs</span> can be opened.
            </p>
            <p style={S.MB_8EM}>
              Some open and private data providers require user's <span style={S.BLACK}>API Key</span>.
            </p>
            <p style={S.MB_8EM}>
              <span>For example, for loading data from&nbsp;</span>
              <Link.Quandl/>
              <span>
              &nbsp;without API Key exists some restriction
              on frequency and amount of queries (<span style={S.BLUE_DARK}>50 per day/1 at a time</span>) and can be deprecated,
              according to Quandl. With <span style={S.BLACK}>API Key</span> it is possible to make (<span style={S.BLUE_DARK}>50 000 per day/1 at a time</span>).
              It's free of charge to receive.
              </span>
            </p>
            <p style={S.MB_8EM}>
              Data providers API Keys can be set on the <span style={S.BLACK}>tab ApiKeys, dialog Settings [s]</span>.
            </p>
            <p style={S.MB_8EM}>
              Also for loading data from data providers with HTTP protocol required <span style={S.BLACK}>HTTPS proxy server</span>,
              by default settled in the <span style={S.BLACK}>tab Options, dialog Settings [s]</span>.
            </p>
            <p style={S.MB_8EM}>
              There is three UI theme in the web app ERC: <span style={S.BLACK}>Dark, Light, and Sand</span> can be set on <span style={S.BLACK}>tab Options, dialog Settings [s]</span>. All user's settings keep in browser's memory only for a current web session.
            </p>
         </A.OpenClose>
         <LogosBar />
         <p>
           <span style={S.BLACK}>
             *Logos Fair Use.
           </span>
         </p>
         </div>
      </A.ScrollPane>
   </A.ShowHide>
  );
}

/*
<div
  className={_cn}
  style={{..._style, ...TS.ROOT}}
 >
  */

/*
About.propsTypes = {
  isInitShow: PropTypes.bool,
  store: PropTypes.object
}
*/

export default About
