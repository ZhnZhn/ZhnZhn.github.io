import React from 'react';

import MenuBrowser from '../zhn/MenuBrowser';
import {BrowserType} from '../../constants/Type';

import DialogContainer3 from '../zhn/DialogContainer3';
import {ComponentActionTypes} from '../../flux/actions/ComponentActions';

const GoogleBrowser = React.createClass({
  render: function(){
    const {store} = this.props;
    return (
       <MenuBrowser
          caption="Quandl Google Stocks"
          showAction={ComponentActionTypes.SHOW_BROWSER}
          browserType={BrowserType.QUANDL_GOOGLE}
          store={store}
       >
       </MenuBrowser>
    )
  }
});

export default GoogleBrowser;
