
import React from 'react';

import QuandlBrowser from '../quandl-browser/QuandlBrowser';
import YahooBrowser from '../yahoo-browser/YahooBrowser';
import GoogleBrowser from '../google-browser/GoogleBrowser';
import WatchBrowser from '../watch-browser/WatchBrowser';

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
           <WatchBrowser store={store}  />

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

export default BrowserContainer
