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

export const CAT_SHOW_ABOUT = 'showAbout'

export const CAT_SHOW_DIALOG = 'showDialog'
export const CAT_CLOSE_DIALOG = 'closeDialog'
export const CAT_SHOW_OPTION_DIALOG = 'showOptionDialog'

export const CAT_CLOSE_CHART_CONTAINER = 'closeChartContainer'
export const CAT_CLOSE_CHART_CONTAINER_2 = 'closeChartContainer2'
export const CAT_SET_ACTIVE_CONTAINER = 'setActiveContainer'
export const CAT_SET_ACTIVE_CHECKBOX = 'setActiveCheckbox'

export const CAT_SHOW_MODAL_DIALOG = 'showModalDialog'

const CA = Reflux.createActions({
  [CAT_SHOW_ABOUT]: {},

  [CAT_SHOW_DIALOG]: {},
  [CAT_CLOSE_DIALOG]: {},
  [CAT_SHOW_OPTION_DIALOG]: {},
  [CAT_CLOSE_CHART_CONTAINER]: {},
  [CAT_CLOSE_CHART_CONTAINER_2]: {},
  [CAT_SET_ACTIVE_CONTAINER]: {},
  [CAT_SET_ACTIVE_CHECKBOX]: {},

  [CAT_SHOW_MODAL_DIALOG]: {}
});

const _showMd = CA.showModalDialog;
Object.assign(CA, {
  showDescription: _showMd.bind(null, MDT_DESCRIPTION),
  showSettings: _showMd.bind(null, MDT_SETTINGS),
  showPasteTo: _showMd.bind(null, MDT_PASTE_TO),
  zoom: _showMd.bind(null, MDT_ZOOM),
  showReload: _showMd.bind(null, MDT_RELOAD),
  showAlert: _showMd.bind(null, MDT_ALERT),
  showAsk: _showMd.bind(null, MDT_ASK),
  showCustomizeExport: _showMd.bind(null, MDT_CUSTOMIZE_EXPORT),
  showAddToWatch: _showMd.bind(null, MDT_ADD_TO_WATCH)
})

const _showOd = CA.showOptionDialog;
CA.showConfigChart = _showOd.bind(null, 'ChartConfigDialog')

export const ComponentActions = CA
