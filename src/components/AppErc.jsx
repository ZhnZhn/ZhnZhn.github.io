import {
  bindTo,
  useEffect
} from './uiApi';

import { crFlexRowCn } from './styleFn';

import { showAskDialogIf } from '../flux/logic/LocationSearch';
import { exportSettingFn } from '../flux/stores/settingStore';

import {
  showSettings,
  showReload
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

const BUILD_DATE = '05-12-2024'
, CL_COMP_CONTAINER = crFlexRowCn("app-container");

const _showSettings = bindTo(
  showSettings,
  exportSettingFn()
);

const AppErc = () => {

  useEffect(() => {
    showAskDialogIf()
    checkBuild(BUILD_DATE, showReload)
  }, [])

  useHotKeysHandler()

  return (
     <>
      <HeaderBar showSettings={_showSettings} />
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
