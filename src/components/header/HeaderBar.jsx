import React, { Component } from 'react'

import ProgressLoading from './ProgressLoading'
import AppLabel from './AppLabel'
import IconLogoErc from './IconLogoErc'
import FlatButton from '../zhn-m/FlatButton'
import ModalButton from '../zhn-m/ModalButton'
import HotBar from './HotBar'
import LimitRemainingLabel from './LimitRemainingLabel'
import BrowserMenu from './BrowserMenu'

import CA, { ComponentActionTypes as CAT } from '../../flux/actions/ComponentActions'
import BA from '../../flux/actions/BrowserActions'
import { T as LPAT } from '../../flux/actions/LoadingProgressActions'

import { BrowserType as BT, ModalDialog } from '../../constants/Type'
import MODEL from './Model'

const LOGO_TITLE = "ERC: Economic RESTful Client v0.15.0"
    , CAPTION = "ERC v0.15.0";

const CL = {
  HEADER: "header",
  ICON: `header__icon-erc`,
  LABEL: "header__app-label",
  BM: "popup-menu header__panel-browser",
  TOPICS: "header__bt-topics",
  ARROW: "arrow-down",
  QUANDL: "header__bt-quandl",
  EUROSTAT: "header__bt-eurostat",
  WATCH: "header__bt-watch",
  SETTINGS: "header__bt-settins",
  ABOUT: "header__bt-about",
};

const S = {
  BT: {
    color: '#1b2836'
  },
  LIMIT: {
    float: 'right',
    paddingTop: '9px'
  }
};

class HeaderBar extends Component {

  constructor(props){
    super()
    this._settingFn = props.store.exportSettingFn()
    this.state = {
      isDS: false
    }
  }

  _hClickQuandl = () => {
    BA.showBrowser(BT.ECONOMIC)
    this.setState({ isDS: false })
  }

  _hClickDynamic = (browserConfig) => {
    BA.showBrowserDynamic(browserConfig)
    this.setState({ isDS: false })
  }

  _hClickAbout = () => {
    CA.showAbout()
    this.setState({ isDS: false })
  }

  _onRegDS = (dsNode) => {
    this.dsNode = dsNode
  }
  _hClickDS = () => {
    this.setState({ isDS: !this.state.isDS })
  }
  _hCloseDS = (event) => {
    if (!this.dsNode.contains(event.target)){
      this.setState({ isDS: false })
    }
  }

  _hDialogSettings = () => {
    CA.showModalDialog(
      ModalDialog.SETTINGS, this._settingFn
    )
  }

  render(){
    const { store } = this.props
        , { isDS } = this.state;
    return (
      <div className={CL.HEADER}>
         <ProgressLoading store={store} ACTIONS={LPAT} />
         <IconLogoErc
            className={CL.ICON}
            title={LOGO_TITLE}
         />
         <AppLabel
            className={CL.LABEL}
            caption={CAPTION}
         />

         <ModalButton
             className={CL.TOPICS}
             rootStyle={S.BT}
             caption="Topics"
             title="Click to open topics menu"
             accessKey="t"
             onClick={this._hClickDS}
             onReg={this._onRegDS}
          >
            <span className={CL.ARROW} />
          </ModalButton>
          <FlatButton
            className={CL.QUANDL}
            rootStyle={S.BT}
            caption="Quandl"
            title="Quandl: World Economy Browser"
            accessKey="q"
            onClick={this._hClickQuandl}
          />
          <FlatButton
            className={CL.EUROSTAT}
            rootStyle={S.BT}
            caption="Eurostat"
            title="Eurostat Statistics Browser"
            accessKey="u"
            onClick={this._hClickDynamic.bind(null, BT.EUROSTAT)}
          />
          <FlatButton
             className={CL.WATCH}
             rootStyle={S.BT}
             caption="Watch"
             title="Watch List Browser"
             accessKey="w"
             onClick={this._hClickDynamic.bind(null, BT.WATCH_LIST)}
          />
          <HotBar
            store={store}
            closeDialogAction={CAT.CLOSE_DIALOG}
            onShowDialog={CA.showDialog}
          />

           <FlatButton
             className={CL.SETTINGS}
             rootStyle={S.BT}
             isPrimary={true}
             caption="Settings"
             title="User Settings Dialog"
             accessKey="s"
             onClick={this._hDialogSettings}
           />
           <FlatButton
             className={CL.ABOUT}
             rootStyle={S.BT}
             caption="About"
             title="About Web Application ERC"
             accessKey="a"
             onClick={CA.showAbout}
           />
           <LimitRemainingLabel
              store={store}
              style={S.LIMIT}
           />

           <BrowserMenu
              className={CL.BM}
              isShow={isDS}
              model={MODEL}
              onClose={this._hCloseDS}
              onClickQuandl={this._hClickQuandl}
              onClickDynamic={this._hClickDynamic}
              onClickAbout={this._hClickAbout}
           />
      </div>
    );
  }
}

export default HeaderBar
