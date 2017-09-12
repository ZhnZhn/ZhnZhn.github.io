import React, { Component } from 'react';

import { ComponentActionTypes } from '../../flux/actions/ComponentActions';
import { ChartActionTypes } from '../../flux/actions/ChartActions';

import ScrollPane from '../zhn/ScrollPane'
import BrowserCaption from '../zhn/BrowserCaption'
import TwitterLink from './TwitterLink'
import Step from './Step';
import Link from '../links/Links';
import IconLogoBar from './IconLogoBar';

import styles from '../styles/ContainerStyles';

const S = {
  SCROLL_DIV: {
    overflowY: 'auto',
    height: '92%',
    paddingRight: '10px'
  },
  DIV_WRAPPER : {
    paddingLeft: '12px',
    paddingRight: '5px',
    lineHeight : 1.4,
    color: 'gray',
    fontWeight: 'bold'
  },
  P_BOTTOM : {
    marginBottom: '1em'
  },
  MARGIN_TOP : {
    marginTop: '3px'
  },
  BT_TWITTER : {
    marginLeft: '12px'
  },
  GREEN: {
    color: '#80c040'
  },
  GRAY: {
    color: 'gray'
  },
  BLACK: {
    color: 'black'
  },
  BLUE: {
    color: '#009ae5'
  },
  BLUE_DARK: {
    color: '#2f7ed8'
  },
  RED: {
    color: '#F44336'
  }
};


class About extends Component {
  constructor(props){
    super();
    this.state = {
      isShow : props.isShow
    }
  }

  componentWillMount(){
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
    const { isShow } = this.state
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
             ERC&nbsp;
           </span>
           <span>
             is an economic RESTful client.
           </span>
         </p>
         <p style={S.P_BOTTOM}>
           With it, you can view economic free open data from WEB.
         </p>
         <p>
          <span>
            Data providers:
          </span>
        </p>
        <p>
          <Link.Quandl/>
          <span style={S.BLACK}>
            &nbsp;(Key),&nbsp;
          </span>
          <Link.Barchart/>
          <span style={S.BLACK}>
            &nbsp;(Key),&nbsp;
          </span>
          <Link.AlphaVantage/>
          <span style={S.BLACK}>
            &nbsp;(Key),
          </span>
         </p>
         <p style={S.P_BOTTOM}>
           <Link.Eurostat/>
           <span style={S.BLUE}>
             ,&nbsp;
           </span>
           <Link.UnComtrade />
           <span style={S.BLUE}>
             ,&nbsp;
           </span>
           <Link.Insee/>
           <span style={S.BLACK}>
             &nbsp;(Https Proxy for CORS).
           </span>
         </p>
         <div style={S.BLACK}>
            <p>
              <Step step="1" />
              <span>
                 &nbsp;Choose a data source Browser from Topics.
              </span>
            </p>
            <p style={S.MARGIN_TOP}>
              <Step step="2" />
              <span>
                 &nbsp;Choose a dataset menu item in a Browser.
              </span>
            </p>
            <p style={S.MARGIN_TOP}>
              <Step step="3" />
              <span>
                 &nbsp;Select params and enter query date in a draggable Dialog.
              </span>
            </p>
            <p style={S.MARGIN_TOP}>
               <Step step="4" />
               <span>
                  &nbsp;Click a button Load.
               </span>
            </p>
            <p style={S.MARGIN_TOP}>
               <Step step="5" />
               <span>
                  &nbsp;Also you can export chart to PNG, JPG, SVG, print to PDF.
               </span>
            </p>
         </div>
          <p style={Object.assign({}, S.P_BOTTOM, S.MARGIN_TOP)}>
            The result will be shown in a Chart in a Chart container.
          </p>
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
