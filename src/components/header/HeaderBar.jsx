import React, { Component } from 'react';

import ProgressLoading from './ProgressLoading';
import AppLabel from './AppLabel';
import IconLogoErc from './IconLogoErc';
import ToolBarButton from '../ToolBarButton';
import LimitRemainingLabel from './LimitRemainingLabel';
import PanelBrowsers from './PanelBrowsers';
import ComponentActions from '../../flux/actions/ComponentActions';
import BrowserActions from '../../flux/actions/BrowserActions';
import BrowserConfig from '../../constants/BrowserConfig';
import { BrowserType, ModalDialog } from '../../constants/Type';


const styles = {
  rootDiv : {
    position: 'relative',
    zIndex: 1050
  },
  appLabel : {
    display: 'inline-block',
    color:'#80c040',
    marginTop: '8px',
    marginLeft: '35px',
    paddingLeft: '10px',
    paddingRight: '10px',
    fontSize: '16px',
    fontWeight: 'bold'
  }
}

class HeaderBar extends Component {
  state = {
    isDS : false
  }

  _handleClickQuandl = () => {
    //BrowserActions.showBrowser(BrowserType.QUANDL);
    BrowserActions.showBrowser(BrowserType.ECONOMIC);
    this.setState({ isDS: false });
  }

  _handleClickDynamic = (browserConfig) => {
    BrowserActions.showBrowserDynamic(browserConfig);
    this.setState({ isDS: false });
  }

  _handleClickWatch = () => {
    BrowserActions.showBrowser(BrowserType.WATCH_LIST);
    this.setState({ isDS: false });
  }

  _handleClickDS = () => {
    this.setState({ isDS: !this.state.isDS });
  }

  render(){
    const { store } = this.props
        , { isDS } = this.state;
    return (
      <div className="header" style={styles.rootDiv}>
         <ProgressLoading store={store} />
         <IconLogoErc
            className="header__icon-erc"
            title="ERC : Economic RESTful Client v0.12.0"
         />
         <AppLabel
            className="header__app-label"
            caption="ERC v0.12.0"
         />

         <ToolBarButton
           style={{ marginTop: '8px', marginLeft: '10px' }}
           type="TypeA"
           caption="DS"
           title="Data Source Browsers"
           onClick={this._handleClickDS}
         >
           <span className={'arrow-down'}></span>
         </ToolBarButton>


        <ToolBarButton
          style={{ marginTop: '8px' }}
          type="TypeA"
          caption="Quandl"
          title="Quandl Economic Browser"
          onClick={this._handleClickQuandl}
        />

        <ToolBarButton
           style={{ marginTop: '8px' }}
           type="TypeA"
           caption="Eurostat"
           title="European Statistics Browser"
           onClick={this._handleClickDynamic.bind(null, BrowserConfig[BrowserType.EUROSTAT])}
        />

         <ToolBarButton
           style={{ marginTop: '8px' }}
           type="TypeA"
           caption="Watch"
           title="Watch List Browser"
           onClick={this._handleClickWatch}
         />

         <ToolBarButton
           type="TypeA"
           style={{ float: 'right', marginRight: '20px', marginTop: '8px'}}
           caption="About"
           title="Description about application ERC"
           onClick={ComponentActions.showAbout}
          />

          <ToolBarButton
            type="TypeA"
            style={{ float: 'right', marginTop: '8px'}}
            caption="Settings"
            title="Application settings"
            onClick={ComponentActions.showModalDialog.bind(null, ModalDialog.SETTINGS)}
           />

           <LimitRemainingLabel
              store={store}
              style={{ float: 'right', paddingTop: '14px' }}
           />

           <PanelBrowsers
              className="header__panel-browser"
              isShow={isDS}
              BROWSER={BrowserType}
              browserConfig={BrowserConfig}
              onClickQuandl={this._handleClickQuandl}
              onClickDynamic={this._handleClickDynamic}
              onClickWatch={this._handleClickWatch}
           />
      </div>
    );
  }
}

export default HeaderBar;
