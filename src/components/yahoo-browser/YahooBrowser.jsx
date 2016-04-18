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
          showAction={ComponentActionTypes.SHOW_BROWSER}
          browserType={BrowserType.QUANDL_YAHOO}
          store={store}
       >
       </MenuBrowser>
    )
  }
});

export default YahooBrowser;
