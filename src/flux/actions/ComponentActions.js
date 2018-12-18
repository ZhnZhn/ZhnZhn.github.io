import Reflux from 'reflux';

import { ModalDialog as MD } from '../../constants/Type'

export const ComponentActionTypes = {
  SHOW_ABOUT: 'showAbout',

  SHOW_DIALOG: 'showDialog',
  CLOSE_DIALOG: 'closeDialog',
  SHOW_OPTION_DIALOG: 'showOptionDialog',

  CLOSE_CHART_CONTAINER: 'closeChartContainer',
  CLOSE_CHART_CONTAINER_2: 'closeChartContainer2',
  SET_ACTIVE_CHECKBOX: 'setActiveCheckbox',

  SHOW_MODAL_DIALOG: 'showModalDialog',

  CHANGE_THEME: 'changeTheme'
};
const A = ComponentActionTypes;

const ComponentActions = Reflux.createActions({
  [A.SHOW_ABOUT]: {},

  [A.SHOW_DIALOG]: {},
  [A.CLOSE_DIALOG]: {},
  [A.SHOW_OPTION_DIALOG]: {},
  [A.CLOSE_CHART_CONTAINER]: {},
  [A.CLOSE_CHART_CONTAINER_2]: {},
  [A.SET_ACTIVE_CHECKBOX]: {},

  [A.SHOW_MODAL_DIALOG]: {},

  [A.CHANGE_THEME]: {}
});

ComponentActions.showDescription = ComponentActions
  .showModalDialog
  .bind(null, MD.DESCRIPTION)
ComponentActions.showSettings = ComponentActions
  .showModalDialog
  .bind(null, MD.SETTINGS)
ComponentActions.showPasteTo = ComponentActions
  .showModalDialog
  .bind(null, MD.PASTE_TO)
ComponentActions.showAddToWatch = ComponentActions
  .showModalDialog
  .bind(null, MD.ADD_TO_WATCH)

ComponentActions.showConfigChart = ComponentActions
  .showOptionDialog
  .bind(null, 'ChartConfigDialog')


export default ComponentActions
