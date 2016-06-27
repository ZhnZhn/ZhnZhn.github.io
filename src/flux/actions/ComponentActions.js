import Reflux from 'reflux';

export const ComponentActionTypes = {
  SHOW_ABOUT : 'showAbout',

  INIT_AND_SHOW_DIALOG : 'initAndShowDialog',
  SHOW_DIALOG : 'showDialog',
  CLOSE_CHART_CONTAINER : 'closeChartContainer',
  CLOSE_CHART_CONTAINER_2 : 'closeChartContainer2',
  SET_ACTIVE_CHECKBOX : 'setActiveCheckbox',

  SHOW_MODAL_DIALOG : 'showModalDialog'
}

const ComponentActions = Reflux.createActions({
  [ComponentActionTypes.SHOW_ABOUT] : {},

  [ComponentActionTypes.INIT_AND_SHOW_DIALOG] : {},
  [ComponentActionTypes.SHOW_DIALOG] : {},
  [ComponentActionTypes.CLOSE_CHART_CONTAINER] : {},
  [ComponentActionTypes.CLOSE_CHART_CONTAINER_2] : {},
  [ComponentActionTypes.SET_ACTIVE_CHECKBOX] : {},

  [ComponentActionTypes.SHOW_MODAL_DIALOG] : {}
});


export default ComponentActions
