import React from 'react';

import MenuBrowser from '../zhn/MenuBrowser';
import DataBrowser from './DataBrowser';
import {BrowserType} from '../../constants/Type';

import DialogContainer3 from '../zhn/DialogContainer3';
import {ComponentActionTypes} from '../../flux/actions/ComponentActions';

const YahooBrowser = React.createClass({
  render: function(){
    const {store} = this.props;
    return (
       <MenuBrowser
          caption="Quandl Yahoo Stocks"
          menuItems={DataBrowser}
          showAction={ComponentActionTypes.SHOW_BROWSER}
          browserType={BrowserType.QUANDL_YAHOO}
          store={store}
       >         
       </MenuBrowser>
    )
  }
});
/*
<DialogContainer3
   id="QY"
   store={store}
   initAction={ComponentActionTypes.INIT_AND_SHOW_DIALOG}
   showAction={ComponentActionTypes.SHOW_DIALOG}
/>
*/

export default YahooBrowser;
