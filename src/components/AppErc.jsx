import {
  bindTo,
  useEffect
} from './uiApi';

import LocationSearch from '../flux/logic/LocationSearch';
import ChartStore from '../flux/stores/ChartStore';
import { exportSettingFn } from '../flux/stores/settingStore';

import {
  ComponentActions
} from '../flux/actions/ComponentActions';
import {
  useMsInitBrowser
} from '../flux/stores/browserStore'
import {
  CHAT_INIT_AND_SHOW
} from '../flux/actions/ChartActions';

import useHotKeysHandler from './hotkeys/useHotKeysHandler';

import HeaderBar from './header/HeaderBar';
import BrowserContainer from './browser-container/BrowserContainer';
import About from './about/About';
import CompContainer from './zhn-containers/CompContainer';
import DialogContainer from './dialogs/DialogContainer';

import checkBuild from './checkBuild';

const BUILD_DATE = '30-11-2023'
, CL_COMP_CONTAINER = "component-container";

const showSettings = bindTo(
  ComponentActions.showSettings,
  exportSettingFn()
);

const AppErc = () => {

  useEffect(() => {
    LocationSearch.load();
    checkBuild(BUILD_DATE, ComponentActions.showReload)
  }, [])

  useHotKeysHandler()

  return (
     <>
      <HeaderBar showSettings={showSettings} />
      <div className={CL_COMP_CONTAINER}>
         <BrowserContainer useMsInitBrowser={useMsInitBrowser} />
         <About />
         <CompContainer addAction={CHAT_INIT_AND_SHOW} />
       </div>
       <DialogContainer store={ChartStore} />
    </>
  );
};

export default AppErc
