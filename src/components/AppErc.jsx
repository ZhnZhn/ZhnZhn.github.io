
import { useEffect } from 'react';

import LocationSearch from '../flux/logic/LocationSearch';
import ChartStore from '../flux/stores/ChartStore';

import CA, { ComponentActionTypes as CAT } from '../flux/actions/ComponentActions';
import { BAT_INIT_BROWSER_DYNAMIC } from '../flux/actions/BrowserActions';
import { CHAT_INIT_AND_SHOW } from '../flux/actions/ChartActions';

import HeaderBar from './header/HeaderBar';
import BrowserContainer from './browser-container/BrowserContainer';
import About from './about/About';
import CompContainer from './zhn-containers/CompContainer';
import DialogContainer from './dialogs/DialogContainer';

import has from './has'
import HotKeysProvider from './hotkeys/HotKeysProvider';
import ThemeProvider from './styles/ThemeProvider';

import checkBuild from './checkBuild'

const BUILD_DATE = '30-12-2021'
, CL = "component-container"
, ENABLE_HOT_KEYS = !has.touch;

const showSettings = CA.showSettings
 .bind(null, ChartStore.exportSettingFn())

const AppErc = () => {

  useEffect(()=>{
    LocationSearch.load();
    checkBuild(BUILD_DATE, CA.showReload)
  }, [])

  return (
    <HotKeysProvider is={ENABLE_HOT_KEYS}>
      <ThemeProvider
         store={ChartStore}
         actionChangeTheme={CAT.CHANGE_THEME}
      >
        <HeaderBar store={ChartStore} showSettings={showSettings} />
        <div className={CL}>
           <BrowserContainer
              store={ChartStore}
              initBrowserAction={BAT_INIT_BROWSER_DYNAMIC}
              showDialogAction={CAT.SHOW_DIALOG}
              onCloseDialog={CA.closeDialog}
           />
           <About store={ChartStore} isInitShow={true} />
           <CompContainer
             store={ChartStore}
             addAction={CHAT_INIT_AND_SHOW}
           />
       </div>
       <DialogContainer store={ChartStore} />
     </ThemeProvider>
   </HotKeysProvider>
  );
};

export default AppErc
