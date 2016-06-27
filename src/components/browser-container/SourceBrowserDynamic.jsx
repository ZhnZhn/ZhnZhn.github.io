import React from 'react';

import MenuBrowserDynamic from '../zhn/MenuBrowserDynamic';
import BrowserActions, {BrowserActionTypes} from '../../flux/actions/BrowserActions';


const SourceBrowserDynamic = React.createClass({
  render(){
    const props = this.props;
    return (
       <MenuBrowserDynamic
          caption="Source Browser"
          showAction={BrowserActionTypes.SHOW_BROWSER_DYNAMIC}
          loadCompletedAction={BrowserActionTypes.LOAD_BROWSER_DYNAMIC_COMPLETED}
          updateAction={BrowserActionTypes.UPDATE_BROWSER_MENU}
          onLoadMenu={BrowserActions.loadBrowserDynamic}
          {...props}
       />
    )
  }
});

export default SourceBrowserDynamic;
