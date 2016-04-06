import React from 'react';

import ToolBarButton from '../ToolBarButton';
import ComponentActions from '../../flux/actions/ComponentActions';
import {BrowserType} from '../../constants/Type';

const styles = {
  rootDiv : {
    position: 'relative',
    zIndex: 30,
    //marginTop: '8px',
    //marginLeft: '10px'
  }
}

const HeaderBar = React.createClass({
  getInitialState(){
    this.fnBrowser = function (browserType) {
      return ComponentActions.showBrowser.bind(null, browserType)
    }
    return {}
  },

  render(){
    return (
      <div className="header" style={styles.rootDiv}>
         <span
           style={{color:'#80c040' , paddingLeft: '10px', paddingRight: '10px', fontSize: '16px', fontWeight: 'bold', display: 'inline-block'}}
           title="Economic Rest Client v. 0.10.0"
        >
           ERC v. 0.10.0
        </span>

        <ToolBarButton
          type="TypeA"
          caption="Quandl"
          title="Quandl DataSets Browser"
          onClick={this.fnBrowser(BrowserType.QUANDL)}
        />

        <ToolBarButton
          type="TypeA"
          caption="Yahoo"
          title="Quandl Yahoo Stocks Browser"
          onClick={this.fnBrowser(BrowserType.QUANDL_YAHOO)}
        />

        <ToolBarButton
          type="TypeA"
          caption="Google"
          title="Quandl Google Stocks Browser"
          onClick={this.fnBrowser(BrowserType.QUANDL_GOOGLE)}
         />

         <ToolBarButton
           type="TypeA"
           caption="About"
           title="Description about application ERC"
           onClick={ComponentActions.showAbout}
          />

      </div>
    );
  }
});

export default HeaderBar;
