import React from 'react';

import MenuBrowser from '../zhn/MenuBrowser';
import DataBrowser from './DataBrowser';
import {BrowserType} from '../../constants/Type';

import DialogContainer3 from '../zhn/DialogContainer3';
import {ComponentActionTypes} from '../../flux/actions/ComponentActions';

const GoogleBrowser = React.createClass({
  render: function(){
    const {store} = this.props;
    return (
       <MenuBrowser
          caption="Quandl Google Stocks"
          menuItems={DataBrowser}
          showAction={ComponentActionTypes.SHOW_BROWSER}
          browserType={BrowserType.QUANDL_GOOGLE}
          store={store}
       >                           
       </MenuBrowser>
    )
  }
});
/*
<DialogContainer3
   id="QG"
   store={store}
   initAction={ComponentActionTypes.INIT_AND_SHOW_DIALOG}
   showAction={ComponentActionTypes.SHOW_DIALOG}
/>
*/

export default GoogleBrowser;
