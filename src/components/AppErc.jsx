
import React, { Component } from 'react';

import LocationSearch from '../flux/logic/LocationSearch';
import ChartStore from '../flux/stores/ChartStore';
import HeaderBar from './header/HeaderBar';

import BrowserContainer from './browser-container/BrowserContainer';
import About from './about/About';
import ComponentHrzContainer from './chart-container/ComponentHrzContainer';
import DialogContainer from './dialogs/DialogContainer';

import ConsentCookiePopup from './zhn/ConsentCookiePopup';

import ComponentActions, { ComponentActionTypes as CAT } from '../flux/actions/ComponentActions';
import { BrowserActionTypes as BAT } from '../flux/actions/BrowserActions';
import { ChartActionTypes as CHAT } from '../flux/actions/ChartActions';
import AnalyticActions from '../flux/actions/AnalyticActions';

import initTheme from './styles/theme'
import ThemeContext from './hoc/ThemeContext'

const PREV_BUILD = '13-05-2018';

const {
  answerYes, answerView, answerNo, noAnswer
} = AnalyticActions;

const _checkBuild = () => {
  if (window.fetch) {
  fetch('./data/build.json', {cache: "no-cache"})
    .then(res => res.json())
    .then(json => {
      const { build='' } = json;
      if (build !== PREV_BUILD && document.cookie.indexOf('erc') === -1) {
        ComponentActions.showModalDialog(
           "RELOAD", {
             prevDate: PREV_BUILD,
             nextDate: build
           }
        )
      }
    })
    .catch(err => {
      console.log(err.message)
    })
  }
}

class AppErc extends Component {

  constructor(){
    super()
    this.state = {
      theme: initTheme
    }
  }

  componentDidMount(){
    this.unsubsribe = ChartStore.listen(this._onStore)
    LocationSearch.load(ComponentActions);
    _checkBuild()
  }
  componentWillUnmout(){
    this.unsubsribe()
  }
  _onStore = (actionType, themeName) => {
    if (actionType === CAT.CHANGE_THEME) {
      this.setState(({ theme }) => {
        theme.setThemeName(themeName)
        return {
          theme: {...theme}
        };
      })
    }
  }

  render(){
    const { theme } = this.state;
    return (
      <ThemeContext.Provider value={theme}>
      <div>
        <HeaderBar store={ChartStore} />
        <div className="component-container">
           <BrowserContainer
              store={ChartStore}
              showBrowserAction={BAT.SHOW_BROWSER}
              initBrowserAction={BAT.INIT_BROWSER_DYNAMIC}
              updateBrowserAction={BAT.UPDATE_BROWSER_MENU}
              //updateWatchAction={BAT.UPDATE_WATCH_BROWSER}
              showDialogAction={CAT.SHOW_DIALOG}
              onCloseDialog={ComponentActions.closeDialog}
           />
           <About store={ChartStore} isShow={true} />
           <ComponentHrzContainer
              store={ChartStore}
              addAction={CHAT.INIT_AND_SHOW_CHART}
           />
       </div>
       <DialogContainer store={ChartStore} />
       <ConsentCookiePopup
          onAnswerYes={answerYes}
          onAnswerView={answerView}
          onAnswerNo={answerNo}
          onNoAnswer={noAnswer}
       />
     </div>
     </ThemeContext.Provider>
   );
  }
}

export default AppErc
