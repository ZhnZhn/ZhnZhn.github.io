import React, { Component } from 'react'

import ProgressLoading from './ProgressLoading'
import AppLabel from './AppLabel'
import IconLogoErc from './IconLogoErc'
import FlatButton from '../zhn-m/FlatButton'
import ModalButton from '../zhn-m/ModalButton'
import HotBar from './HotBar'
import LimitRemainingLabel from './LimitRemainingLabel'
import BrowserMenu from './BrowserMenu'

import ComponentActions, { ComponentActionTypes} from '../../flux/actions/ComponentActions'
import BrowserActions from '../../flux/actions/BrowserActions'
import { T as LPA } from '../../flux/actions/LoadingProgressActions'

import { BrowserType as BT, ModalDialog } from '../../constants/Type'
import MODEL from './Model'

const LOGO_TITLE = "ERC: Economic RESTful Client v0.14.0"
    , CAPTION = "ERC v0.14.0";

const styles = {
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
  btRoot: {
    //color: 'rgb(35, 47, 59)'
    color: '#1b2836'
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
    BrowserActions.showBrowser(BT.ECONOMIC)
    this.setState({ isDS: false })
  }

  _handleClickDynamic = (browserConfig) => {
    BrowserActions.showBrowserDynamic(browserConfig)
    this.setState({ isDS: false })
  }

  _handleClickAbout = () => {
    ComponentActions.showAbout()
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
      <div className="header">
         <ProgressLoading store={store} ACTIONS={LPA} />
         <IconLogoErc
            className="header__icon-erc"
            title={LOGO_TITLE}
         />
         <AppLabel
            className="header__app-label"
            caption={CAPTION}
         />

         <ModalButton
             className="header__bt-topics"
             rootStyle={styles.btRoot}
             caption="Topics"
             title="Topics Data Set Browsers Menu"
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
            title="Quandl: World Economy Browser"
            accessKey="q"
            onClick={this._handleClickQuandl}
          />
          <FlatButton
            className="header__bt-eurostat"
            rootStyle={styles.btRoot}
            caption="Eurostat"
            title="Eurostat Statistics Browser"
            accessKey="u"
            onClick={this._handleClickDynamic.bind(null, BT.EUROSTAT)}
          />
          <FlatButton
             className="header__bt-watch"
             rootStyle={styles.btRoot}
             caption="Watch"
             title="Watch List Browser"
             accessKey="w"
             onClick={this._handleClickDynamic.bind(null, BT.WATCH_LIST)}
          />
          <HotBar
            store={store}
            closeDialogAction={ComponentActionTypes.CLOSE_DIALOG}
            onShowDialog={ComponentActions.showDialog}
          />

           <FlatButton
             className="header__bt-settins"
             rootStyle={styles.btRoot}
             caption="Settings"
             title="User Settings Dialog"
             accessKey="s"
             isPrimary={true}
             onClick={this._handleDialogSettings}
           />
           <FlatButton
             className="header__bt-about"
             rootStyle={styles.btRoot}
             caption="About"
             title="About Web Application ERC"
             accessKey="a"
             onClick={ComponentActions.showAbout}
           />
           <LimitRemainingLabel
              store={store}
              style={styles.lbLimit}
           />

           <BrowserMenu
              className="header__panel-browser"
              isShow={isDS}
              model={MODEL}
              onClose={this._handleCloseDS}
              onClickQuandl={this._handleClickQuandl}
              onClickDynamic={this._handleClickDynamic}
              onClickAbout={this._handleClickAbout}
           />
      </div>
    );
  }
}

export default HeaderBar
