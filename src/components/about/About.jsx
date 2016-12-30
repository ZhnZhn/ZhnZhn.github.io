import React from 'react';

import { ComponentActionTypes } from '../../flux/actions/ComponentActions';
import { ChartActionTypes } from '../../flux/actions/ChartActions';

import ScrollPane from '../zhn/ScrollPane';
import CaptionRow from '../CaptionRow';
import Step from './Step';
import Token from './Token';
import LinkToken from './LinkToken';
import IconLogoBar from './IconLogoBar';

import ContainerStyles from '../styles/ContainerStyles.js';
const styles = ContainerStyles;

const Styles = {
  scrollDiv : {
    overflowY: 'auto',
    height: '92%',
    //height: 'calc(100vh - 90px)',
    paddingRight: '10px'
  }
};

const About = React.createClass({
  getInitialState(){
    return {
      isShow : this.props.isShow
    }
  },

  componentWillMount(){
    this.unsubscribe = this.props.store.listen(this._onStore);
  },
  componentWillUnmount(){
    this.unsubscribe();
  },
  _onStore(actionType, data){
    if (actionType === ComponentActionTypes.SHOW_ABOUT){
      this.setState({isShow : true});
    } else if (actionType === ChartActionTypes.INIT_AND_SHOW_CHART){
      this.setState({isShow : false});
    } else if (actionType === ChartActionTypes.SHOW_CHART){
      this.setState({isShow : false});
    }
  },

  _handlerClose(){
    this.setState({ isShow : false });
  },
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
         <CaptionRow
            caption="About"
            onClose={this._handlerClose}
         />

         <ScrollPane style={Styles.scrollDiv}>

         <div style={{paddingLeft: '5px', paddingRight: '5px', lineHeight : 1.4}}>
         <p>
           <Token color="#80c040">
             ERC
           </Token>
           <Token color="gray" isFirstBlank={true}>
             is an economic RESTful client.
           </Token>
         </p>
         <p>
           <Token color="gray">
             With it, you can view economic free open data from WEB.
          </Token>
          <br/>
          <Token color="gray">
            Data providers :
          </Token>
          <LinkToken
             href="https://www.quandl.com/"
             color="#E05927"
             isFirstBlank={true}
          >
             Quandl
          </LinkToken>
          <Token color="gray">
            ,
          </Token>
          <LinkToken
             href="http://ec.europa.eu/eurostat"
             color="#009ae5"
             isFirstBlank={true}
          >
             Eurostat
          </LinkToken>
          <Token color="gray">
            .
          </Token>
         </p>
          <br/>
          <p>
            <Step step="1" />
            <Token color="black" isFirstBlank={true}>
               Choose a data source Browser from the header bar
            </Token>
          </p>
          <p style={{marginTop: '3px'}}>
            <Step step="2" />
            <Token color="black" isFirstBlank={true}>
               Choose a dataset menu item in a Browser
            </Token>
          </p>
          <p style={{marginTop: '3px'}}>
            <Step step="3" />
            <Token color="black" isFirstBlank={true}>
               Select params and enter query date in a draggable Dialog
            </Token>
          </p>
          <p style={{marginTop: '3px'}}>
             <Step step="4" />
             <Token color="black" isFirstBlank={true}>
                Click a button Load
             </Token>
          </p>
          <p style={{marginTop: '3px'}}>
             <Step step="5" />
             <Token color="black" isFirstBlank={true}>
                Also you can export chart to PNG, JPG, SVG, print to PDF
             </Token>
          </p>
          <p style={{marginTop: '3px'}}>
             <Token color="gray">
                The result will be shown in a Chart in a Chart container.
             </Token>
          </p>
          <br/>
          <p>
            <Token color="gray">
              After clicking a button Show in a Dialog will be opened Chart container with Charts
              or empty. After closing a Chart container all Charts remains.
            </Token>
          </p>
          <p>
            <Token color="gray">
              In one time max three Dialogs can be opened.
            </Token>
          </p>
          <br/>
          <p>
            <Token color="#F44336">
               Attention:
            </Token>
            <Token color="gray" isFirstBlank={true}>
              For one item from Dialog can be only one Chart in a container. If you want to change query parameters for it,
              close the chart in the container and load data again.
            </Token>
         </p>
         <p>
           <Token color="gray">
             The value of currency is not always USD as shows in a chart tooltip.
             Sometimes more details about data can be look at tab Info on a Chart.
           </Token>
         </p>
         <br/>
         <p>
           <Token color="gray">
             In that case of data loading from
           </Token>
           <LinkToken
              href="https://www.quandl.com/"
              color="#E05927"
              isFirstBlank={true}
           >
              Quandl
           </LinkToken>
           <Token color="gray" isFirstBlank={true}>
              data provider, for accessing without API Key, exists some restriction on frequency
              and amount queries (<Token color="#2f7ed8">50 per day/1 at a time</Token><Token color="gray">).</Token>
           </Token>
         </p>
         <br/>
         <p>
           <Token color="gray">
             According to Quandl, anonymous requests can be deprecated soon. With API Key
           </Token>
         </p>
         <p>
           <Token color="gray">
             you will be have (<Token color="#2f7ed8">50 000 per day/1 at a time</Token>). It's free of charge to receive.
           </Token>
         </p>
         <br/>
         <p>
           <Token color="gray">
             A Quandl API Key, for using with ERC, can be set in dialog Settings/User Settings.
             Settings save in browser's memory only for a current WEB session.
             <p>Premium Free Sample Data can be requested only with Quandl API Key.</p>
           </Token>
         </p>
         <br/>
         <p>
           <Token color="gray">
             For loading data from
           </Token>
           <LinkToken
              href="http://ec.europa.eu/eurostat"
              color="#009ae5"
              isFirstBlank={true}
           >
              Eurostat
           </LinkToken>
           <Token color="gray" isFirstBlank={true}>
             does not exist any restrictions.
           </Token>
         </p>
         <IconLogoBar />
        </div>

        </ScrollPane>

      </div>


    );
  }
});

export default About
