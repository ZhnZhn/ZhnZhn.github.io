import React, { Component } from 'react';

import { ComponentActionTypes } from '../../flux/actions/ComponentActions';
import { ChartActionTypes } from '../../flux/actions/ChartActions';

import ScrollPane from '../zhn/ScrollPane'
import BrowserCaption from '../zhn/BrowserCaption'
import TwitterLink from './TwitterLink'
import Step from './Step';
import Token from './Token';
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

         <div style={S.DIV_WRAPPER}>
         <p>
           <Token color="#80c040">
             ERC
           </Token>
           <Token color="gray" isFirstBlank={true}>
             is an economic RESTful client.
           </Token>
         </p>
         <p style={S.P_BOTTOM}>
           With it, you can view economic free open data from WEB.
         </p>
         <p>
          <Token color="gray">
            Data providers:
          </Token>
        </p>
        <p>
          <Link.Quandl/>
          <Token color="black">
            &nbsp;(Key),&nbsp;
          </Token>
          <Link.Barchart/>
          <Token color="black">
            &nbsp;(Key),&nbsp;
          </Token>
          <Link.AlphaVantage/>
          <Token color="black">
            &nbsp;(Key),
          </Token>
         </p>
         <p style={S.P_BOTTOM}>
           <Link.Eurostat/>
           <Token color="#009ae5">
             ,&nbsp;
           </Token>
           <Link.Insee/>
           <Token color="black">
             &nbsp;(Https Proxy for CORS).
           </Token>
         </p>
          <p>
            <Step step="1" />
            <Token color="black" isFirstBlank={true}>
               Choose a data source Browser from Topics.
            </Token>
          </p>
          <p style={S.MARGIN_TOP}>
            <Step step="2" />
            <Token color="black" isFirstBlank={true}>
               Choose a dataset menu item in a Browser.
            </Token>
          </p>
          <p style={S.MARGIN_TOP}>
            <Step step="3" />
            <Token color="black" isFirstBlank={true}>
               Select params and enter query date in a draggable Dialog.
            </Token>
          </p>
          <p style={S.MARGIN_TOP}>
             <Step step="4" />
             <Token color="black" isFirstBlank={true}>
                Click a button Load.
             </Token>
          </p>
          <p style={S.MARGIN_TOP}>
             <Step step="5" />
             <Token color="black" isFirstBlank={true}>
                Also you can export chart to PNG, JPG, SVG, print to PDF.
             </Token>
          </p>
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
            <Token color="#F44336">
               Attention:
            </Token>
            <Token color="gray" isFirstBlank={true}>
              For one item from Dialog can be only one Chart in a container. If you want to change query parameters for it,
              close the chart in the container and load data again.
            </Token>
         </p>
         <p style={S.P_BOTTOM}>
             The value of currency is not always USD as shows in a chart tooltip.
             Sometimes more details about data can be look at tab Info on a Chart.
         </p>
         <p style={S.P_BOTTOM}>
           <Token color="gray">
             In that case of data loading from&nbsp;
           </Token>
           <Link.Quandl/>
           <Token color="gray" isFirstBlank={true}>
              data provider, for accessing without API Key, exists some restriction on frequency
              and amount queries (<Token color="#2f7ed8">50 per day/1 at a time</Token><Token color="gray">).</Token>
           </Token>
         </p>
         <p>
            According to Quandl, anonymous requests can be deprecated soon. With API Key
         </p>
         <p style={S.P_BOTTOM}>
           <Token color="gray">
             you will be have (<Token color="#2f7ed8">50 000 per day/1 at a time</Token>). It's free of charge to receive.
           </Token>
         </p>
         <p>
             A Quandl API Key, for using with ERC, can be set in dialog Settings/User Settings.
             Settings save in browser's memory only for a current WEB session.
         </p>
         <p style={S.P_BOTTOM}>
            Premium Free Sample Data can be requested only with Quandl API Key.
         </p>
         <p>
           <Token color="gray">
             For loading data from&nbsp;
           </Token>
           <Link.Eurostat/>
           <Token color="gray" isFirstBlank={true}>
             does not exist any restrictions.
           </Token>
         </p>
         <IconLogoBar />
         <p>
           <Token color="black">
             *Logos Fair Use.
           </Token>
         </p>
        </div>
        </ScrollPane>
      </div>
    );
  }
}

export default About
