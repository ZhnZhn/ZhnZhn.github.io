import React, { Component } from 'react'

import withTheme from '../hoc/withTheme'

import ProgressLoading from './ProgressLoading'
import AppLabel from './AppLabel'
import IconLogoErc from './IconLogoErc'
import FlatButton from '../zhn-m/FlatButton'
import ModalButton from '../zhn-m/ModalButton'
import HotBar from './HotBar'
import LimitRemainingLabel from './LimitRemainingLabel'

import ModalSlider from '../zhn-modal-slider/ModalSlider'
import crBrowserModel from './BrowserModel'

import CA, { ComponentActionTypes as CAT } from '../../flux/actions/ComponentActions'
import BA from '../../flux/actions/BrowserActions'
import { T as LPAT } from '../../flux/actions/LoadingProgressActions'

import { BrowserType as BT, ModalDialog } from '../../constants/Type'

const LOGO_TITLE = "Web app ERC (Economic RESTful Client)"
    , CAPTION = "ERC v0.15.0";

const ID = 'HEADER_BAR';

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

  BROWSER_MENU: "popup-menu header__panel-browser"
};

const MODEL = crBrowserModel();

class HeaderBar extends Component {

  constructor(props){
    super()
    this._settingFn = props.store.exportSettingFn()

    this._hShowEconomic = BA.showBrowser.bind(null, BT.ECONOMIC)
    this._hShowEurostat = BA.showBrowserDynamic.bind(null, BT.EUROSTAT)
    this._hShowWatch = BA.showBrowserDynamic.bind(null, BT.WATCH_LIST)

    this.state = {
      isDS: false
    }
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

  _hToggleDS = () => {
    this.setState(prevState => ({
      isDS: !prevState.isDS
    }))
  }

  _hDialogSettings = () => {
    CA.showModalDialog(
      ModalDialog.SETTINGS, this._settingFn
    )
  }

  render(){
    const { store, theme } = this.props
        , { isDS } = this.state
        , S = theme.getStyle(ID);
    return (
      <div className={CL.HEADER} style={S.ROOT} >
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
            onClick={this._hShowEconomic}
          />
          <FlatButton
            className={CL.EUROSTAT}
            rootStyle={S.BT}
            caption="Eurostat"
            title="Eurostat Statistics Browser"
            accessKey="u"
            onClick={this._hShowEurostat}
          />
          <FlatButton
             className={CL.WATCH}
             rootStyle={S.BT}
             caption="Watch"
             title="Watch List Browser"
             accessKey="w"
             onClick={this._hShowWatch}
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

           <ModalSlider
             isShow={isDS}
             className={CL.BROWSER_MENU}
             INIT_ID="page_0"
             pageWidth={235}
             maxPages={2}
             model={MODEL}
             onClose={this._hToggleDS}
           />

      </div>
    );
  }
}

export default withTheme(HeaderBar)
