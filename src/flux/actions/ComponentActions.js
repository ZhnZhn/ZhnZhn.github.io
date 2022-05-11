import Reflux from 'reflux-core';

import {
  MDT_DESCRIPTION,
  MDT_SETTINGS,
  MDT_PASTE_TO,
  MDT_ZOOM,
  MDT_RELOAD,
  MDT_ALERT,
  MDT_ASK,
  MDT_CUSTOMIZE_EXPORT,
  MDT_ADD_TO_WATCH
} from '../../constants/ModalDialogType';

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
CA.showDescription = _showMd.bind(null, MDT_DESCRIPTION)
CA.showSettings = _showMd.bind(null, MDT_SETTINGS)
CA.showPasteTo = _showMd.bind(null, MDT_PASTE_TO)
CA.zoom = _showMd.bind(null, MDT_ZOOM)
CA.showReload = _showMd.bind(null, MDT_RELOAD)
CA.showAlert = _showMd.bind(null, MDT_ALERT)
CA.showAsk = _showMd.bind(null, MDT_ASK)
CA.showCustomizeExport = _showMd.bind(null, MDT_CUSTOMIZE_EXPORT)
CA.showAddToWatch = _showMd.bind(null, MDT_ADD_TO_WATCH)

const _showOd = CA.showOptionDialog;
CA.showConfigChart = _showOd.bind(null, 'ChartConfigDialog')

export default CA
