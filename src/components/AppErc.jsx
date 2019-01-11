
import React, { Component } from 'react';

import LocationSearch from '../flux/logic/LocationSearch';
import ChartStore from '../flux/stores/ChartStore';
import HeaderBar from './header/HeaderBar';

import BrowserContainer from './browser-container/BrowserContainer';
import About from './about/About';
import ComponentHrzContainer from './chart-container/ComponentHrzContainer';
import DialogContainer from './dialogs/DialogContainer';

import ComponentActions, { ComponentActionTypes as CAT } from '../flux/actions/ComponentActions';
import { BrowserActionTypes as BAT } from '../flux/actions/BrowserActions';
import { ChartActionTypes as CHAT } from '../flux/actions/ChartActions';

import initTheme from './styles/theme'
import ThemeContext from './hoc/ThemeContext'

const PREV_BUILD = '11-01-2019';

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
  state = {
    theme: initTheme
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
        <HeaderBar store={ChartStore} />
        <div className="component-container">
           <BrowserContainer
              store={ChartStore}
              initBrowserAction={BAT.INIT_BROWSER_DYNAMIC}
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
     </ThemeContext.Provider>
   );
  }
}

export default AppErc
