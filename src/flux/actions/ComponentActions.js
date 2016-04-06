import Reflux from 'reflux';

export const ComponentActionTypes = {
  SHOW_ABOUT : 'showAbout',
  SHOW_BROWSER : 'showBrowser',
  INIT_AND_SHOW_DIALOG : 'initAndShowDialog',
  SHOW_DIALOG : 'showDialog'
}

const ComponentActions = Reflux.createActions({
  [ComponentActionTypes.SHOW_ABOUT] : {},
  [ComponentActionTypes.SHOW_BROWSER] : {},
  [ComponentActionTypes.INIT_AND_SHOW_DIALOG] : {},
  [ComponentActionTypes.SHOW_DIALOG] : {}
});

export default ComponentActions
