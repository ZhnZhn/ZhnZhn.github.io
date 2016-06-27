import React from 'react';

import ProgressLoading from './ProgressLoading';
import AppLabel from './AppLabel';
import ToolBarButton from '../ToolBarButton';
import ComponentActions from '../../flux/actions/ComponentActions';
import BrowserActions from '../../flux/actions/BrowserActions';
import {BrowserType, ModalDialog} from '../../constants/Type';

const styles = {
  rootDiv : {
    position: 'relative',
    zIndex: 50
  },
  appLabel : {
    display: 'inline-block',
    color:'#80c040',
    paddingLeft: '10px',
    paddingRight: '10px',
    fontSize: '16px',
    fontWeight: 'bold'
  }
}

const BrowserConfig = {
  GOOGLE : {
    browserType: 'QD',
    caption: 'Quandl Google Stocks',
    sourceMenuUrl : './data/google/source-menu.json'
  },
  YAHOO : {
    browserType: 'QY',
    caption: 'Quandl Yahoo Stocks',
    sourceMenuUrl : './data/yahoo/source-menu.json'
  }
}

const HeaderBar = React.createClass({
  getInitialState(){
    this.fnBrowser = function (browserType) {
      return BrowserActions.showBrowser.bind(null, browserType)
    }

    return { }
  },

  _handlerClickDynamic(browserConfig){
    BrowserActions.showBrowserDynamic(browserConfig);
  },

  render(){
    const {store} = this.props;
    return (
      <div className="header" style={styles.rootDiv}>
         <ProgressLoading store={store} />
         <AppLabel
            style={styles.appLabel}
            title="Economic Rest Client v. 0.10.0"
            caption="ERC v. 0.10.0"
         />

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
           onClick={this._handlerClickDynamic.bind(null, BrowserConfig.YAHOO)}
        />
        <ToolBarButton
           type="TypeA"
           caption="Google"
           title="Quandl Google Stocks Browser"
           onClick={this._handlerClickDynamic.bind(null, BrowserConfig.GOOGLE)}
         />

         <ToolBarButton
           type="TypeA"
           caption="Watch"
           title="Watch List Browser"
           onClick={this.fnBrowser(BrowserType.WATCH_LIST)}
         />

         <ToolBarButton
           type="TypeA"
           caption="Settings"
           title="Application settings"
           onClick={ComponentActions.showModalDialog.bind(null, ModalDialog.SETTINGS)}
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
