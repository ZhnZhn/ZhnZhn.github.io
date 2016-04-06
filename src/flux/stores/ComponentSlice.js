
import {ComponentActionTypes} from '../actions/ComponentActions';
import Factory from '../logic/Factory';

const ComponentSlice = {
  dialogInit : {},
  onShowAbout(){
    this.trigger(ComponentActionTypes.SHOW_ABOUT);
  },
  onShowBrowser(browserType){
    this.trigger(ComponentActionTypes.SHOW_BROWSER, browserType);
  },
  onShowDialog(dialogType){
    if (this.dialogInit[dialogType]) {
      this.trigger(ComponentActionTypes.SHOW_DIALOG, dialogType);
    } else {
      this.dialogInit[dialogType] = true;
      const dialogComp = Factory.createDialog(dialogType);
      this.trigger(ComponentActionTypes.INIT_AND_SHOW_DIALOG,
                         {dialogType, dialogComp});
    }
  }
}

export default ComponentSlice
