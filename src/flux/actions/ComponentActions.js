import Reflux from 'reflux';

export const ComponentActionTypes = {
  SHOW_ABOUT : 'showAbout',
  SHOW_BROWSER : 'showBrowser',
  INIT_AND_SHOW_DIALOG : 'initAndShowDialog',
  SHOW_DIALOG : 'showDialog',
  CLOSE_CHART_CONTAINER : 'closeChartContainer',
  CLOSE_CHART_CONTAINER_2 : 'closeChartContainer2',
  UPDATE_BROWSER_MENU : 'updateBrowserMenu',

}

const ComponentActions = Reflux.createActions({
  [ComponentActionTypes.SHOW_ABOUT] : {},
  [ComponentActionTypes.SHOW_BROWSER] : {},
  [ComponentActionTypes.INIT_AND_SHOW_DIALOG] : {},
  [ComponentActionTypes.SHOW_DIALOG] : {},
  [ComponentActionTypes.CLOSE_CHART_CONTAINER] : {},
  [ComponentActionTypes.CLOSE_CHART_CONTAINER_2] : {},
  [ComponentActionTypes.UPDATE_BROWSER_MENU] : {}
});

export default ComponentActions
