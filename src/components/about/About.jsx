import React from 'react';

import {ComponentActionTypes} from '../../flux/actions/ComponentActions';
import {ChartActionTypes} from '../../flux/actions/ChartActions';

import ScrollPane from '../zhn/ScrollPane';
import CaptionRow from '../CaptionRow';
import Step from './Step';
import Token from './Token';
import LinkToken from './LinkToken';


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

  componentWillMount: function(){
    this.unsubscribe = this.props.store.listen(this._onStore);
  },
  componentWillUnmount: function(){
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
    this.setState({isShow : false});
  },
  render(){
    const classOpen = this.state.isShow ? "show-popup" : null;
    let styleOpen = this.state.isShow ? {display: 'block'} : {display: 'none'};

    return (
      <div className={classOpen} style={Object.assign({}, styles.aboutRootDiv, styleOpen)}>
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
             is a economic RESTFul client.
           </Token>
         </p>
         <p>
           <Token color="gray">
             With it you can view economic free open data from WEB.
          </Token>
         </p>
          <br/>
          <p>
            <Step step="1" />
            <Token color="black" isFirstBlank={true}>
               Choose a data source from the header bar
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
               Select a data item and enter query date in a dragable Dialog
            </Token>
          </p>
          <p style={{marginTop: '3px'}}>
             <Step step="4" />
             <Token color="black" isFirstBlank={true}>
                Click a button Load
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
              In one time max three Dalogs can be opened.
            </Token>
          </p>
          <br/>
          <p>
            <Token color="#F44336">
               Attention:
            </Token>
            <Token color="gray" isFirstBlank={true}>
              For one item from Dialog can be only one Chart in a container. If you want change query parameters for it,
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
             In that case all data load from
           </Token>
           <LinkToken
              href="https://www.quandl.com/"
              color="#E05927"
              isFirstBlank={true}
           >
              Quandl
           </LinkToken>
           <Token color="gray" isFirstBlank={true}>
              REST services. For accessing without Api Key, exists some restriction on frequency
              and amount queries (<Token color="black">50 calls per day</Token><Token color="gray">).</Token>
           </Token>
         </p>
         <br/>
         <p>
           <Token color="gray">
             A Quandl Api Key, for using with ERC, can be set in dialog Settings/User Settings.
             Settings saves in browser's memory only for current WEB session.
           </Token>
         </p>
        </div>

        </ScrollPane>

      </div>


    );
  }
});

export default About
