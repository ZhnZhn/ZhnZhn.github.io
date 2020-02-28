
import React, { Component } from 'react';

import LocationSearch from '../flux/logic/LocationSearch';
import ChartStore from '../flux/stores/ChartStore';

import CA, { ComponentActionTypes as CAT } from '../flux/actions/ComponentActions';
import { BrowserActionTypes as BAT } from '../flux/actions/BrowserActions';
import { ChartActionTypes as CHAT } from '../flux/actions/ChartActions';

import HeaderBar from './header/HeaderBar';
import BrowserContainer from './browser-container/BrowserContainer';
import About from './about/About';
import CompContainer from './zhn-containers/CompContainer';
import DialogContainer from './dialogs/DialogContainer';

import initTheme from './styles/theme'
import ThemeContext from './hoc/ThemeContext'

import checkBuild from './checkBuild'

const BUILD_DATE = '28-02-2020';
const CL = "component-container"

class AppErc extends Component {
  state = {
    theme: initTheme
  }

  componentDidMount(){
    this.unsubsribe = ChartStore.listen(this._onStore)
    LocationSearch.load();
    checkBuild(BUILD_DATE, CA.showReload)
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
        <div className={CL}>
           <BrowserContainer
              store={ChartStore}
              initBrowserAction={BAT.INIT_BROWSER_DYNAMIC}
              showDialogAction={CAT.SHOW_DIALOG}
              onCloseDialog={CA.closeDialog}
           />
           <About store={ChartStore} isShow={true} />
           <CompContainer
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
