import React from 'react';

import ProgressLoading from './ProgressLoading';
import AppLabel from './AppLabel';
import IconLogoErc from './IconLogoErc';
import ToolBarButton from '../ToolBarButton';
import LimitRemainingLabel from './LimitRemainingLabel';
import PanelBrowsers from './PanelBrowsers';
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
    marginLeft: '35px',
    paddingLeft: '10px',
    paddingRight: '10px',
    fontSize: '16px',
    fontWeight: 'bold'
  }
}

const BrowserConfig = {
  EUROSTAT : {
    browserType: 'ES',
    caption: 'European Statistics',
    sourceMenuUrl : './data/eurostat/source-menu.json'
  },
  GOOGLE : {
    browserType: 'QD',
    caption: 'Quandl Google Stocks',
    sourceMenuUrl : './data/google/source-menu.json'
  },
  YAHOO : {
    browserType: 'QY',
    caption: 'Quandl Yahoo Stocks',
    sourceMenuUrl : './data/yahoo/source-menu.json'
  },
  PREMIUM_SAMPLE : {
    browserType: 'QPS',
    caption: 'Quandl Premium Sample',
    sourceMenuUrl : './data/quandl-sample/source-menu.json'
  }
}

const HeaderBar = React.createClass({
  getInitialState(){
    return {
       isDS : false
    }
  },

  _handlerClickQuandl(){
    BrowserActions.showBrowser(BrowserType.QUANDL);
    this.setState({ isDS: false });
  },
  _handlerClickDynamic(browserConfig){
    BrowserActions.showBrowserDynamic(browserConfig);
    this.setState({ isDS: false });
  },
  _handlerClickWatch(){
    BrowserActions.showBrowser(BrowserType.WATCH_LIST);
    this.setState({ isDS: false });
  },

  _handlerClickDS(){
    this.setState({ isDS: !this.state.isDS });
  },

  render(){
    const { store } = this.props
        , { isDS } = this.state;
    return (
      <div className="header" style={styles.rootDiv}>
         <ProgressLoading store={store} />
         <IconLogoErc />
         <AppLabel
            style={styles.appLabel}
            caption="ERC v. 0.11.0"
         />

         <ToolBarButton
           type="TypeA"
           caption="DS"
           title="Data Source Browsers"
           onClick={this._handlerClickDS}
         >
           <span className={'arrow-down'}></span>
         </ToolBarButton>


        <ToolBarButton
          type="TypeA"
          caption="Quandl"
          title="Quandl Economic Browser"
          onClick={this._handlerClickQuandl}
        />

        <ToolBarButton
           type="TypeA"
           caption="Eurostat"
           title="European Statistics Browser"
           onClick={this._handlerClickDynamic.bind(null, BrowserConfig.EUROSTAT)}
        />

         <ToolBarButton
           type="TypeA"
           caption="Watch"
           title="Watch List Browser"
           onClick={this._handlerClickWatch}
         />

         <ToolBarButton
           type="TypeA"
           style={{ float: 'right', marginRight: '20px'}}
           caption="About"
           title="Description about application ERC"
           onClick={ComponentActions.showAbout}
          />

          <ToolBarButton
            type="TypeA"
            style={{ float: 'right'}}
            caption="Settings"
            title="Application settings"
            onClick={ComponentActions.showModalDialog.bind(null, ModalDialog.SETTINGS)}
           />

           <LimitRemainingLabel
              store={store}
              style={{ float: 'right', paddingTop: '5px' }}
           />

           <PanelBrowsers
              isShow={isDS}
              browserConfig={BrowserConfig}
              onClickQuandl={this._handlerClickQuandl}
              onClickDynamic={this._handlerClickDynamic}
              onClickWatch={this._handlerClickWatch}
           />
      </div>
    );
  }
});

export default HeaderBar;
