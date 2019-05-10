import Reflux from 'reflux';

import { ModalDialog as MD } from '../../constants/Type'

export const ComponentActionTypes = {
  SHOW_ABOUT: 'showAbout',

  SHOW_DIALOG: 'showDialog',
  CLOSE_DIALOG: 'closeDialog',
  SHOW_OPTION_DIALOG: 'showOptionDialog',

  CLOSE_CHART_CONTAINER: 'closeChartContainer',
  CLOSE_CHART_CONTAINER_2: 'closeChartContainer2',
  SET_ACTIVE_CONTAINER: 'setActiveContainer',
  SET_ACTIVE_CHECKBOX: 'setActiveCheckbox',

  SHOW_MODAL_DIALOG: 'showModalDialog',

  CHANGE_THEME: 'changeTheme'
};
const A = ComponentActionTypes;

const CA = Reflux.createActions({
  [A.SHOW_ABOUT]: {},

  [A.SHOW_DIALOG]: {},
  [A.CLOSE_DIALOG]: {},
  [A.SHOW_OPTION_DIALOG]: {},
  [A.CLOSE_CHART_CONTAINER]: {},
  [A.CLOSE_CHART_CONTAINER_2]: {},
  [A.SET_ACTIVE_CONTAINER]: {},
  [A.SET_ACTIVE_CHECKBOX]: {},

  [A.SHOW_MODAL_DIALOG]: {},

  [A.CHANGE_THEME]: {}
});

const _showMd = CA.showModalDialog;
CA.showDescription = _showMd.bind(null, MD.DESCRIPTION)
CA.showSettings = _showMd.bind(null, MD.SETTINGS)
CA.showPasteTo = _showMd.bind(null, MD.PASTE_TO)
CA.zoom = _showMd.bind(null, MD.ZOOM)
CA.showReload = _showMd.bind(null, MD.RELOAD)
CA.showAlert = _showMd.bind(null, MD.ALERT)
CA.showAsk = _showMd.bind(null, MD.ASK)
CA.showCustomizeExport = _showMd.bind(null, MD.CUSTOMIZE_EXPORT)
CA.showAddToWatch = _showMd.bind(null, MD.ADD_TO_WATCH)

const _showOd = CA.showOptionDialog;
CA.showConfigChart = _showOd.bind(null, 'ChartConfigDialog')

export default CA
