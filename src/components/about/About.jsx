import React, { Component } from 'react';

import { ComponentActionTypes } from '../../flux/actions/ComponentActions';
import { ChartActionTypes } from '../../flux/actions/ChartActions';

import ScrollPane from '../zhn/ScrollPane'
import BrowserCaption from '../zhn/BrowserCaption'
import OpenClose from '../zhn/OpenClose'
import TwitterLink from './TwitterLink'
import DataProviders from './DataProviders'
import StepTitle from './StepTitle'
import Link from '../links/Links';
import IconLogoBar from './IconLogoBar';

import styles from '../styles/ContainerStyles';
import S from './About.Style'

const STEP = {
  T1: "Choose a data source Browser from Topics [t]",
  T2: "Choose a dataset menu item in a Browser",
  T3: "Select params and enter query date in a draggable Dialog",
  T4: "Click a button Load",
  T5: "Also you can export chart to PNG, JPG, SVG, print to PDF"
};

class About extends Component {
  constructor(props){
    super();
    this.state = {
      isCloseProviders: this._calcIsProviders(),
      isShow : props.isShow
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
    if (actionType === ComponentActionTypes.SHOW_ABOUT){
      this.setState({isShow : true});
    } else if (actionType === ChartActionTypes.INIT_AND_SHOW_CHART){
      this.setState({isShow : false});
    } else if (actionType === ChartActionTypes.SHOW_CHART){
      this.setState({isShow : false});
    }
  }

  _handleClose = () => {
    this.setState({ isShow : false });
  }

  render(){
    const { isShow, isCloseProviders } = this.state
        ,  _classOpen = isShow
              ? "show-popup"
              : null
        , _styleOpen = isShow
              ? {display: 'block'}
              : {display: 'none'};
    return (
      <div
        className={_classOpen}
        style={Object.assign({}, styles.aboutRootDiv, _styleOpen)}
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

         <ScrollPane style={S.SCROLL_DIV}>

         <div style={{...S.DIV_WRAPPER, ...S.GREY}}>
         <p>
           <span style={S.GREEN}>
             Web app ERC&nbsp;
           </span>
           <span>
             is an economic RESTful client.
           </span>
         </p>
         <p style={S.P_BOTTOM}>
           With it, you can view economic & finance open data from Web.
         </p>
         <DataProviders isClose={isCloseProviders} />
         <div style={S.BLACK}>
            <StepTitle step="1" title={STEP.T1} />
            <StepTitle step="2" title={STEP.T2} />
            <StepTitle step="3" title={STEP.T3} />
            <StepTitle step="4" title={STEP.T4} />
            <StepTitle step="5" title={STEP.T5} />
         </div>
          <p style={{...S.P_BOTTOM, ...S.MARGIN_TOP }}>
            The result will be shown in a chart in a resizebale container.
          </p>
          <OpenClose
            isClose={true}
            caption="More..."
            rootStyle={S.MORE}
          >
            <p>
               After clicking a button Show in a Dialog will be opened Chart container with Charts
               or empty. After closing a Chart container all Charts remains.
            </p>
            <p style={S.P_BOTTOM}>
               In one time max three Dialogs can be opened.
            </p>
            <p>
              <span style={S.RED}>
                 Attention:&nbsp;
              </span>
              <span>
                For one item from Dialog can be only one Chart in a container. If you want to change query parameters for it,
                close the chart in the container and load data again.
              </span>
           </p>
           <p style={S.P_BOTTOM}>
               The value of currency is not always USD as shows in a chart tooltip.
               Sometimes more details about data can be look at tab Info on a Chart.
           </p>
           <p style={S.P_BOTTOM}>
             <span>
               In that case of data loading from&nbsp;
             </span>
             <Link.Quandl/>
             <span>
                &nbsp;data provider, for accessing without API Key, exists some restriction on frequency
                and amount queries (<span style={S.BLUE_DARK}>50 per day/1 at a time</span><span style={S.GREY}>).</span>
             </span>
           </p>
           <p>
              According to Quandl, anonymous requests can be deprecated soon. With API Key
           </p>
           <p style={S.P_BOTTOM}>
             <span>
               you will be have (<span style={S.BLUE_DARK}>50 000 per day/1 at a time</span>). It's free of charge to receive.
             </span>
           </p>
           <p>
               A Quandl API Key, for using with ERC, can be set in dialog Settings/User Settings.
               Settings save in browser's memory only for a current WEB session.
           </p>
           <p style={S.P_BOTTOM}>
              Premium Free Sample Data can be requested only with Quandl API Key.
           </p>
           <p>
             <span>
               For loading data from&nbsp;
             </span>
             <Link.Eurostat/>
             <span>
               &nbsp;does not exist any restrictions.
             </span>
           </p>
         </OpenClose>
         <IconLogoBar />
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

export default About
