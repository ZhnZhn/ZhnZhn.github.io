
import React from 'react';

import {BrowserType} from '../../constants/Type';

import QuandlBrowser from '../quandl-browser/QuandlBrowser';
import WatchBrowser from '../watch-browser/WatchBrowser';
import DialogContainer3 from '../zhn/DialogContainer3';

const BrowserContainer = React.createClass({
  getInitialState(){
    return {
      elBrowsers : []
    }
  },

  componentWillMount(){
    const { store } = this.props;
    this.unsubscribe = store.listen(this._onStore);
  },
  componentWillUnmount(){
    this.unsubscribe();
  },
  _onStore(actionType, data){
     if (actionType === this.props.initBrowserAction){
       this.state.elBrowsers.unshift(data);
       this.setState(this.state);
     }
  },

  render(){
    const {
            store, showBrowserAction, updateBrowserAction,
            updateWatchAction,
            initDialogAction, showDialogAction, showOptionDialogAction
          } = this.props
        , { elBrowsers } = this.state;

    return (
      <div className="hrz-container">
           <QuandlBrowser
              //browserType={BrowserType.QUANDL}
              browserType={BrowserType.ECONOMIC}
              caption="Quandl Economic"
              store={store}
              showAction={showBrowserAction}
              updateAction={updateBrowserAction}
           />
           <WatchBrowser
              browserType={BrowserType.WATCH_LIST}
              caption="Watch List"
              store={store}
              showAction={showBrowserAction}
              updateAction={updateWatchAction}
            />
           {elBrowsers}
           <DialogContainer3
              maxDialog={3}
              store={store}
              initAction={initDialogAction}
              showAction={showDialogAction}
              showOptionAction={showOptionDialogAction}
           />
      </div>
    );
  }
});

export default BrowserContainer
