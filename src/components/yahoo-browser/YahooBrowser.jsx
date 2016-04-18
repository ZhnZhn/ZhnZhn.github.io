import React from 'react';

import MenuBrowser from '../zhn/MenuBrowser';
import {BrowserType} from '../../constants/Type';

import DialogContainer3 from '../zhn/DialogContainer3';
import {ComponentActionTypes} from '../../flux/actions/ComponentActions';

const YahooBrowser = React.createClass({
  render: function(){
    const {store} = this.props;
    return (
       <MenuBrowser
          caption="Quandl Yahoo Stocks"          
          browserType={BrowserType.QUANDL_YAHOO}
          store={store}
          showAction={ComponentActionTypes.SHOW_BROWSER}
          updateAction={ComponentActionTypes.UPDATE_BROWSER_MENU}
       >
       </MenuBrowser>
    )
  }
});

export default YahooBrowser;
