import {
  bindTo,
  useEffect
} from './uiApi';

import { showAskDialogIf } from '../flux/logic/LocationSearch';
import { exportSettingFn } from '../flux/stores/settingStore';

import {
  ComponentActions
} from '../flux/actions/ComponentActions';
import {
  useMsInitBrowser
} from '../flux/stores/browserStore';
import {
  useMsInit
} from '../flux/stores/itemStore';

import useHotKeysHandler from './hotkeys/useHotKeysHandler';

import HeaderBar from './header/HeaderBar';
import BrowserContainer from './browser-container/BrowserContainer';
import About from './about/About';
import CompContainer from './zhn-containers/CompContainer';
import DialogContainer from './dialogs/DialogContainer';

import checkBuild from './checkBuild';

const BUILD_DATE = '28-05-2024'
, CL_COMP_CONTAINER = "component-container";

const showSettings = bindTo(
  ComponentActions.showSettings,
  exportSettingFn()
);

const AppErc = () => {

  useEffect(() => {
    showAskDialogIf()
    checkBuild(BUILD_DATE, ComponentActions.showReload)
  }, [])

  useHotKeysHandler()

  return (
     <>
      <HeaderBar showSettings={showSettings} />
      <div className={CL_COMP_CONTAINER}>
         <BrowserContainer
            useMsInitBrowser={useMsInitBrowser}
         />
         <About />
         <CompContainer
            useMsInit={useMsInit}
         />
       </div>
       <DialogContainer />
    </>
  );
};

export default AppErc
