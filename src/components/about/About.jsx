import React, { Component } from 'react';

import withTheme from '../hoc/withTheme'

import { ComponentActionTypes as CAT } from '../../flux/actions/ComponentActions';
import { ChartActionTypes as CHAT } from '../../flux/actions/ChartActions';

import ScrollPane from '../zhn/ScrollPane'
import BrowserCaption from '../zhn/BrowserCaption'
import OpenClose from '../zhn/OpenClose'
import TwitterLink from './TwitterLink'
import DataProviders from './DataProviders'
import StepTitle from './StepTitle'
import Link from '../links/ProviderLinks';
import LogosBar from './LogosBar';

import C from '../styles/Color'
import S from './About.Style'

const TH_ID = 'ABOUT';

const CL = {
  ABOUT: 'about-container',
  SCROLL: 'scroll-container-y',
  SHOW: 'show-popup'
};

const STEP = {
  T1: "Please, choose a data source Browser from Topics [t]",
  T2: "Next, choose a dataset menu item in the the opended up Browser",
  T3: "Select params and enter query date in the opened up draggable Dialog",
  T4: "Click a button Load",
  T5: "Also you can export chart to PNG, JPG, SVG, print to PDF"
};

const OC_CAPTION_STYLE = {
  color: C.TITLE
}

class About extends Component {
  /*
  static propsTypes = {
     theme: PropTypes.object,
     isShow: PropTypes.bool,
     store: PropTypes.object
  }
  */
  constructor(props){
    super(props);
    this.state = {
      isCloseProviders: this._calcIsProviders(),
      isShow: props.isShow
    }
  }

  _calcIsProviders = () => {
    const strWidth = window
      .getComputedStyle(document.body, ':after')
      .getPropertyValue('content');
    switch(strWidth){
      case '"W600"': case '"W500"': return true;
      default: return false;
    }
  }

  componentDidMount(){
    this.unsubscribe = this.props.store.listen(this._onStore);
  }
  componentWillUnmount(){
    this.unsubscribe();
  }
  _onStore = (actionType, data) => {
    if (actionType === CAT.SHOW_ABOUT){
      this.setState({ isShow: true });
    } else if (actionType === CHAT.INIT_AND_SHOW_CHART){
      this.setState({ isShow: false });
    } else if (actionType === CHAT.SHOW_CHART){
      this.setState({ isShow: false });
    }
  }

  _handleClose = () => {
    this.setState({ isShow: false });
  }

  render(){
    const { theme } = this.props
    , TS = theme.getStyle(TH_ID)
    , { isShow, isCloseProviders } = this.state
    ,  _clOpen = isShow ? CL.SHOW : ''
    , _clRoot = `${CL.ABOUT} ${_clOpen}`
    , _styleOpen = isShow
          ? S.BLOCK
          : S.NONE;
    return (
      <div
        className={_clRoot}
        style={{..._styleOpen, ...TS.ROOT}}
       >
         <BrowserCaption
            caption="About"
            onClose={this._handleClose}
         >
           <TwitterLink
              rootStyle={S.BT_TWITTER}
              account="webapperc"
              title="Twitter page @wepapperc with examples"
           />
         </BrowserCaption>

         <ScrollPane
             className={CL.SCROLL}
             style={S.SCROLL_DIV}
          >

         <div style={{...S.DIV_WRAPPER, ...S.GREY}}>
         <p style={S.M_B_4}>
           <span style={S.GREEN}>
             ERC (Economic RESTful Client)&nbsp;
           </span>
           <span>
             is a web app that gives the ability to explore, visualize and compose economic and financial data mostly to charts from open and private data providers.
           </span>
         </p>
         <DataProviders
           isClose={isCloseProviders}
           ocCaptionStyle={OC_CAPTION_STYLE}
         />
         <div style={S.BLACK}>
            <StepTitle step="1" title={STEP.T1} />
            <StepTitle step="2" title={STEP.T2} />
            <StepTitle step="3" title={STEP.T3} />
            <StepTitle step="4" title={STEP.T4} />
         </div>
          <p style={S.MARGIN_TOP}>
            The result will be shown in a chart in a resizebale container.
          </p>
          <p style={S.P_BOTTOM}>
            Also you can export chart to PNG, JPG, SVG, print to PDF.
          </p>
          <p style={S.P_BOTTOM}>
            <span style={S.RED}>
               Attention:&nbsp;
            </span>
            <span>
              For one item from <span style={S.BLACK}>Dialog</span> can be only one <span style={S.BLACK}>Chart item</span> in a container.
              If you want to change a date period, please, use <span style={S.BLACK}>Highcharts zoom option</span> or close the chart in the container and load data again.
              More information about data can be found on a <span style={S.BLACK}>tab Info, Chart item</span>.
            </span>
         </p>
          <OpenClose
            isClose={true}
            caption="More..."
            captionStyle={OC_CAPTION_STYLE}
            rootStyle={S.MORE}
            openColor={C.YELLOW}
          >
            <p style={S.P_BOTTOM}>
              After clicking a <span style={S.BLACK}>button Show</span> in a Dialog will be an opened up <span style={S.BLACK}>Chart container</span> with charts or empty.
              After closing a <span style={S.BLACK}>Chart container</span> all charts remains. In one time max three <span style={S.BLACK}>Dialogs</span> can be opened.
            </p>
            <p style={S.P_BOTTOM}>
              Some open and private data providers require user's <span style={S.BLACK}>API Key</span>.
            </p>
            <p style={S.P_BOTTOM}>
              <span>For example, for loading data from&nbsp;</span>
              <Link.Quandl/>
              <span>
              &nbsp;without API Key exists some restriction
              on frequency and amount of queries (<span style={S.BLUE_DARK}>50 per day/1 at a time</span>) and can be deprecated,
              according to Quandl. With <span style={S.BLACK}>API Key</span> it is possible to make (<span style={S.BLUE_DARK}>50 000 per day/1 at a time</span>).
              It's free of charge to receive.
              </span>
            </p>
            <p style={S.P_BOTTOM}>
              Data providers API Keys can be set on the <span style={S.BLACK}>tab ApiKeys, dialog Settings [s]</span>.
            </p>
            <p style={S.P_BOTTOM}>
              Also for loading data from data providers with HTTP protocol required <span style={S.BLACK}>HTTPS proxy server</span>,
              by default settled in the <span style={S.BLACK}>tab Options, dialog Settings [s]</span>.
            </p>
            <p style={S.P_BOTTOM}>
              There is three UI theme in the web app ERC: <span style={S.BLACK}>Dark, Light, and Sand</span> can be set on <span style={S.BLACK}>tab Options, dialog Settings [s]</span>. All user's settings keep in browser's memory only for a current web session.
            </p>
         </OpenClose>
         <LogosBar />
         <p>
           <span style={S.BLACK}>
             *Logos Fair Use.
           </span>
         </p>
        </div>
        </ScrollPane>
      </div>
    );
  }
}

export default withTheme(About)
