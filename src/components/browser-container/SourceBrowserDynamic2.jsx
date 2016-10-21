import React from 'react';

import MenuBrowserDynamic2 from '../zhn/MenuBrowserDynamic2';
import BrowserActions, {BrowserActionTypes} from '../../flux/actions/BrowserActions';
import ComponentActions from '../../flux/actions/ComponentActions';

const SourceBrowserDynamic2 = React.createClass({
  shouldComponentUpdate(){
    return false;
  },

  render(){
    return (
       <MenuBrowserDynamic2
          caption="Source Browser"
          showAction={BrowserActionTypes.SHOW_BROWSER_DYNAMIC}
          loadCompletedAction={BrowserActionTypes.LOAD_BROWSER_DYNAMIC_COMPLETED}
          onLoadMenu={BrowserActions.loadBrowserDynamic}
          onShowLoadDialog={ComponentActions.showModalDialog}
          {...this.props}
       />
    )
  }
});

export default SourceBrowserDynamic2;
