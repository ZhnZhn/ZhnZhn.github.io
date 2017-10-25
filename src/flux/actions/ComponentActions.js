import Reflux from 'reflux';

export const ComponentActionTypes = {
  SHOW_ABOUT: 'showAbout',

  SHOW_DIALOG: 'showDialog',
  CLOSE_DIALOG: 'closeDialog',
  SHOW_OPTION_DIALOG: 'showOptionDialog',

  CLOSE_CHART_CONTAINER: 'closeChartContainer',
  CLOSE_CHART_CONTAINER_2: 'closeChartContainer2',
  SET_ACTIVE_CHECKBOX: 'setActiveCheckbox',

  SHOW_MODAL_DIALOG: 'showModalDialog'
};
const A = ComponentActionTypes;

const ComponentActions = Reflux.createActions({
  [A.SHOW_ABOUT] : {},

  [A.SHOW_DIALOG] : {},
  [A.CLOSE_DIALOG]: {},
  [A.SHOW_OPTION_DIALOG] : {},
  [A.CLOSE_CHART_CONTAINER] : {},
  [A.CLOSE_CHART_CONTAINER_2] : {},
  [A.SET_ACTIVE_CHECKBOX] : {},

  [A.SHOW_MODAL_DIALOG] : {}
});


export default ComponentActions
