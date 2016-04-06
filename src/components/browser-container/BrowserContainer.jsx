
import React from 'react';

import QuandlBrowser from '../quandl-browser/QuandlBrowser';
import YahooBrowser from '../yahoo-browser/YahooBrowser';
import GoogleBrowser from '../google-browser/GoogleBrowser';

import DialogContainer3 from '../zhn/DialogContainer3';
import {ComponentActionTypes} from '../../flux/actions/ComponentActions';


const BrowserContainer = React.createClass({
  render(){
    const {store} = this.props;
    return (
      <div className="hrz-container">
           <QuandlBrowser store={store} />
           <YahooBrowser store={store} />
           <GoogleBrowser store={store} />

           <DialogContainer3
              maxDialog={3}
              store={store}
              initAction={ComponentActionTypes.INIT_AND_SHOW_DIALOG}
              showAction={ComponentActionTypes.SHOW_DIALOG}
           />
      </div>
    );
  }
});
/*
<div class="chart-container">
  <QuandlBrowser store={store} />
</div>
<div class="chart-container">
   <YahooBrowser store={store} />
</div>
<div class="chart-container">
   <GoogleBrowser store={store} />
</div>
*/

export default BrowserContainer
