
import React from 'react';

import ChartStore from '../flux/stores/ChartStore';
import HeaderBar from './header/HeaderBar';

import BrowserContainer from './browser-container/BrowserContainer';
import About from './about/About';
import ComponentHrzContainer from './chart-container/ComponentHrzContainer';
import DialogContainer from './dialogs/DialogContainer';

import ConsentCookiePopup from './zhn/ConsentCookiePopup';

import { ComponentActionTypes } from '../flux/actions/ComponentActions';
import { BrowserActionTypes } from '../flux/actions/BrowserActions';

const AppErc = React.createClass({
  render(){
    return (
      <div>
        <HeaderBar store={ChartStore} />
        <div className="component-container">
           <BrowserContainer
              store={ChartStore}
              showBrowserAction={BrowserActionTypes.SHOW_BROWSER}
              initBrowserAction={BrowserActionTypes.INIT_BROWSER_DYNAMIC}
              updateBrowserAction={BrowserActionTypes.UPDATE_BROWSER_MENU}
              updateWatchAction={BrowserActionTypes.UPDATE_WATCH_BROWSER}
              initDialogAction={ComponentActionTypes.INIT_AND_SHOW_DIALOG}
              showDialogAction={ComponentActionTypes.SHOW_DIALOG}
           />
           <About store={ChartStore} isShow={true} />
           <ComponentHrzContainer />
       </div>
       <DialogContainer store={ChartStore} />
       <ConsentCookiePopup />
     </div>
    )
  }
});

export default AppErc
