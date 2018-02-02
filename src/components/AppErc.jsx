
import React, { Component } from 'react';

import LocationSearch from '../flux/logic/LocationSearch';
import ChartStore from '../flux/stores/ChartStore';
import HeaderBar from './header/HeaderBar';

import BrowserContainer from './browser-container/BrowserContainer';
import About from './about/About';
import ComponentHrzContainer from './chart-container/ComponentHrzContainer';
import DialogContainer from './dialogs/DialogContainer';

import ConsentCookiePopup from './zhn/ConsentCookiePopup';

import ComponentActions, { ComponentActionTypes } from '../flux/actions/ComponentActions';
import { BrowserActionTypes } from '../flux/actions/BrowserActions';
import { ChartActionTypes } from '../flux/actions/ChartActions';
import AnalyticActions from '../flux/actions/AnalyticActions';

const PREV_BUILD = '02-02-2018';

class AppErc extends Component {

  componentDidMount(){
      LocationSearch.load(ComponentActions);
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
              //updateWatchAction={BrowserActionTypes.UPDATE_WATCH_BROWSER}
              showDialogAction={ComponentActionTypes.SHOW_DIALOG}
              onCloseDialog={ComponentActions.closeDialog}
           />
           <About store={ChartStore} isShow={true} />
           <ComponentHrzContainer
              store={ChartStore}
              addAction={ChartActionTypes.INIT_AND_SHOW_CHART}
           />
       </div>
       <DialogContainer store={ChartStore} />
       <ConsentCookiePopup
          onAnswerYes={AnalyticActions.answerYes}
          onAnswerNo={AnalyticActions.answerNo}
          onNoAnswer={AnalyticActions.noAnswer}
       />
     </div>
   );
  }
}

export default AppErc
