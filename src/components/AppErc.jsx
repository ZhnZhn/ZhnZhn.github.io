import { useEffect } from './uiApi';

import LocationSearch from '../flux/logic/LocationSearch';
import ChartStore from '../flux/stores/ChartStore';

import {
  CAT_SHOW_DIALOG,
  ComponentActions
} from '../flux/actions/ComponentActions';
import {
  BAT_INIT_BROWSER_DYNAMIC
} from '../flux/actions/BrowserActions';
import {
  CHAT_INIT_AND_SHOW
} from '../flux/actions/ChartActions';

import useHotKeysHandler from './hotkeys/useHotKeysHandler';

import AppProvider from './AppProvider';
import HeaderBar from './header/HeaderBar';
import BrowserContainer from './browser-container/BrowserContainer';
import About from './about/About';
import CompContainer from './zhn-containers/CompContainer';
import DialogContainer from './dialogs/DialogContainer';

import checkBuild from './checkBuild';

const BUILD_DATE = '25-04-2023'
, CL_COMP_CONTAINER = "component-container";

const showSettings = ComponentActions.showSettings
 .bind(null, ChartStore.exportSettingFn())

const AppErc = () => {

  useEffect(()=>{
    LocationSearch.load();
    checkBuild(BUILD_DATE, ComponentActions.showReload)
  }, [])

  useHotKeysHandler()

  return (
    <AppProvider>
      <HeaderBar showSettings={showSettings} />
      <div className={CL_COMP_CONTAINER}>
         <BrowserContainer
            initBrowserAction={BAT_INIT_BROWSER_DYNAMIC}
            showDialogAction={CAT_SHOW_DIALOG}
            onCloseDialog={ComponentActions.closeDialog}
         />
         <About />
         <CompContainer addAction={CHAT_INIT_AND_SHOW} />
       </div>
       <DialogContainer />
    </AppProvider>
  );
};

export default AppErc
