import Reflux from 'reflux-core';

import { bindTo } from '../storeApi';
import { showModalDialog } from '../stores/compStore';

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

export const CAT_SHOW_DIALOG = 'showDialog'
export const CAT_CLOSE_DIALOG = 'closeDialog'
export const CAT_SHOW_OPTION_DIALOG = 'showOptionDialog'

export const CAT_CLOSE_CHART_CONTAINER = 'closeChartContainer'
export const CAT_CLOSE_CHART_CONTAINER_2 = 'closeChartContainer2'
export const CAT_SET_ACTIVE_CONTAINER = 'setActiveContainer'

const CA = Reflux.createActions({
  [CAT_SHOW_DIALOG]: {},
  [CAT_CLOSE_DIALOG]: {},
  [CAT_SHOW_OPTION_DIALOG]: {},
  [CAT_CLOSE_CHART_CONTAINER]: {},
  [CAT_CLOSE_CHART_CONTAINER_2]: {},
  [CAT_SET_ACTIVE_CONTAINER]: {}
});

Object.assign(CA, {
  showDescription: bindTo(showModalDialog, MDT_DESCRIPTION),
  showSettings: bindTo(showModalDialog, MDT_SETTINGS),
  showPasteTo: bindTo(showModalDialog, MDT_PASTE_TO),
  zoom: bindTo(showModalDialog, MDT_ZOOM),
  showReload: bindTo(showModalDialog, MDT_RELOAD),
  showAlert: bindTo(showModalDialog, MDT_ALERT),
  showAsk: bindTo(showModalDialog, MDT_ASK),
  showCustomizeExport: bindTo(showModalDialog, MDT_CUSTOMIZE_EXPORT),
  showAddToWatch: bindTo(showModalDialog, MDT_ADD_TO_WATCH)
})

const _showOd = CA.showOptionDialog;
CA.showConfigChart = _showOd.bind(null, 'ChartConfigDialog')

export const ComponentActions = CA
