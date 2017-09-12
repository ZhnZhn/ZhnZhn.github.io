import React, { Component } from 'react'

import ProgressLoading from './ProgressLoading'
import AppLabel from './AppLabel'
import IconLogoErc from './IconLogoErc'
import FlatButton from '../zhn-m/FlatButton'
import ModalButton from '../zhn-m/ModalButton'
import LimitRemainingLabel from './LimitRemainingLabel'
import PanelBrowsers from './PanelBrowsers'
import ComponentActions from '../../flux/actions/ComponentActions'
import BrowserActions from '../../flux/actions/BrowserActions'
import BrowserConfig from '../../constants/BrowserConfig'
import { BrowserType, ModalDialog } from '../../constants/Type'


const LOGO_TITLE = "ERC: Economic RESTful Client v0.14.0"
    , CAPTION = "ERC v0.14.0";

const styles = {
  rootDiv : {
    position: 'relative',
    boxShadow: '0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.6)',
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
  },
  btTopics: {
    marginLeft: '8px'
  },
  btRoot: {
    //color: 'rgb(35, 47, 59)'
    color: '#1b2836'
  },
  btAbout: {
    float: 'right'
  },
  btSettings: {
    float: 'right',
    marginRight: '20px'
  },
  lbLimit: {
    float: 'right',
    paddingTop: '9px'
  }
}

class HeaderBar extends Component {

  constructor(props){
    super()

    this._settingFn = props.store.exportSettingFn()
    this.state = {
      isDS: false
    }
  }

  _handleClickQuandl = () => {
    BrowserActions.showBrowser(BrowserType.ECONOMIC)
    this.setState({ isDS: false })
  }

  _handleClickDynamic = (browserConfig) => {
    BrowserActions.showBrowserDynamic(browserConfig)
    this.setState({ isDS: false })
  }

  _handleClickWatch = () => {
    BrowserActions.showBrowser(BrowserType.WATCH_LIST)
    this.setState({ isDS: false })
  }

  _onRegDS = (dsNode) => {
    this.dsNode = dsNode
  }
  _handleClickDS = () => {
    this.setState({ isDS: !this.state.isDS })
  }
  _handleCloseDS = (event) => {
    if (!this.dsNode.contains(event.target)){
      this.setState({ isDS: false })
    }
  }

  _handleDialogSettings = () => {
    ComponentActions.showModalDialog(
      ModalDialog.SETTINGS, this._settingFn
    )
  }

  render(){
    const { store } = this.props
        , { isDS } = this.state;
    return (
      <div className="header" style={styles.rootDiv}>
         <ProgressLoading store={store} />
         <IconLogoErc
            className="header__icon-erc"
            title={LOGO_TITLE}
         />
         <AppLabel
            className="header__app-label"
            caption={CAPTION}
         />

         <ModalButton
             rootStyle={{ ...styles.btRoot, ...styles.btTopics }}
             caption="Topics"
             title="Topic Data Source Browsers"
             accessKey="t"
             onClick={this._handleClickDS}
             onReg={this._onRegDS}
          >
            <span className="arrow-down"></span>
          </ModalButton>
          <FlatButton
            className="header__bt-quandl"
            rootStyle={styles.btRoot}
            caption="Quandl"
            title="Quandl Economic Browser"
            accessKey="q"
            onClick={this._handleClickQuandl}
          />
          <FlatButton
            className="header_bt-eurostat"
            rootStyle={styles.btRoot}
            caption="Eurostat"
            title="European Statistics Browser"
            accessKey="u"
            onClick={this._handleClickDynamic.bind(null, BrowserConfig[BrowserType.EUROSTAT])}
          />
          <FlatButton
             className="header__bt-watch"
             rootStyle={styles.btRoot}
             caption="Watch"
             title="Watch List Browser"
             accessKey="w"
             onClick={this._handleClickWatch}
          />

           <FlatButton
             rootStyle={{ ...styles.btRoot, ...styles.btSettings }}
             caption="Settings"
             title="Application settings"
             accessKey="s"
             isPrimary={true}
             onClick={this._handleDialogSettings}
           />
           <FlatButton
             rootStyle={{ ...styles.btRoot, ...styles.btAbout }}
             caption="About"
             title="Description about application ERC"
             accessKey="a"
             onClick={ComponentActions.showAbout}
           />
           <LimitRemainingLabel
              store={store}
              style={styles.lbLimit}
           />

           <PanelBrowsers
              className="header__panel-browser"
              isShow={isDS}
              BROWSER={BrowserType}
              browserConfig={BrowserConfig}
              onClose={this._handleCloseDS}
              onClickQuandl={this._handleClickQuandl}
              onClickDynamic={this._handleClickDynamic}
              onClickWatch={this._handleClickWatch}
           />
      </div>
    );
  }
}

export default HeaderBar
