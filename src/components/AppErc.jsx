
import React, { Component } from 'react';

import LocationSearch from '../flux/logic/LocationSearch';
import ChartStore from '../flux/stores/ChartStore';
import HeaderBar from './header/HeaderBar';

import BrowserContainer from './browser-container/BrowserContainer';
import About from './about/About';
import ComponentHrzContainer from './chart-container/ComponentHrzContainer';
import DialogContainer from './dialogs/DialogContainer';

import ConsentCookiePopup from './zhn/ConsentCookiePopup';

import { ComponentActionTypes } from '../flux/actions/ComponentActions';
import BrowserActions, { BrowserActionTypes } from '../flux/actions/BrowserActions';
import AnalyticActions from '../flux/actions/AnalyticActions';
import ChartActions from '../flux/actions/ChartActions';

class AppErc extends Component {

  componentDidMount(){
      LocationSearch.load(BrowserActions, ChartActions);
  }

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
       <ConsentCookiePopup
          onAnswerYes={AnalyticActions.answerYes}
          onAnswerNo={AnalyticActions.answerNo}
          onNoAnswer={AnalyticActions.noAnswer}
       />
     </div>
    )}
}

export default AppErc
