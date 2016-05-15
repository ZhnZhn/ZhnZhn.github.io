import React from 'react';

import AppLabel from './AppLabel';
import SettingsDialog from './SettingsDialog';
import ToolBarButton from '../ToolBarButton';
import ComponentActions from '../../flux/actions/ComponentActions';
import {BrowserType} from '../../constants/Type';

const styles = {
  rootDiv : {
    position: 'relative',
    zIndex: 50,
  },
  appLabel : {
    display: 'inline-block',
    color:'#80c040',
    paddingLeft: '10px',
    paddingRight: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
  }
}

const HeaderBar = React.createClass({
  getInitialState(){
    this.fnBrowser = function (browserType) {
      return ComponentActions.showBrowser.bind(null, browserType)
    }
    return {
      isShowSettings : false
    }
  },

  _handlerOpenSettings(){
    this.setState({isShowSettings: true});
  },
  _handlerCloseSettings(){
    this.setState({isShowSettings: false});
  },

  render(){
    return (
      <div className="header" style={styles.rootDiv}>
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
           caption="Watch"
           title="Watch List Browser"
           onClick={this.fnBrowser(BrowserType.WATCH_LIST)}
         />

         <ToolBarButton
           type="TypeA"
           caption="Settings"
           title="Application settings"
           onClick={this._handlerOpenSettings}
          />

         <ToolBarButton
           type="TypeA"
           caption="About"
           title="Description about application ERC"
           onClick={ComponentActions.showAbout}
          />

          <SettingsDialog
             isShow={this.state.isShowSettings}
             onClose={this._handlerCloseSettings}
          />
      </div>
    );
  }
});

export default HeaderBar;
