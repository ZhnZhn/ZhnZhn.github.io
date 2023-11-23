import { setMenuItemClose } from './browserLogic';
import { uncheckActiveCheckbox } from './chartCheckBoxLogic';
import { uncheckActiveContCheckBox } from './contCheckBoxLogic';

const ComponentSlice = {
  onCloseChartContainer(chartType, browserType){
    uncheckActiveContCheckBox(chartType);
    uncheckActiveCheckbox(chartType);
    setMenuItemClose(chartType, browserType);
  }
}

export default ComponentSlice
