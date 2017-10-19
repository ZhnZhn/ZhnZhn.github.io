import React, { Component } from 'react';

import { BrowserType } from '../../constants/Type';

import QuandlBrowser from '../quandl-browser/QuandlBrowser';
import WatchBrowser from '../watch-browser/WatchBrowser';
import DialogContainer from '../zhn-containers/DialogContainer';

class BrowserContainer extends Component {
  constructor(props){
    super()
    this.state = {
      elBrowsers : []
    }
  }

  componentDidMount(){
    const { store } = this.props;
    this.unsubscribe = store.listen(this._onStore)
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  _onStore = (actionType, data) => {
     if (actionType === this.props.initBrowserAction){
       this.setState(prevState => {
         prevState.elBrowsers.unshift(data)
         return prevState;
       })
     }
  }

  _renderBrowsers = (elBrowsers) => {
    return elBrowsers.map(Comp => React.cloneElement(Comp));
  }

  render(){
    const {
            store, showBrowserAction, updateBrowserAction,
            updateWatchAction,
            showDialogAction, onCloseDialog
          } = this.props
        , { elBrowsers } = this.state;

    return (
      <div className="hrz-container">
           <QuandlBrowser
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
           {/*elBrowsers*/}
           {this._renderBrowsers(elBrowsers)}

           <DialogContainer
              maxDialog={3}
              store={store}
              showAction={showDialogAction}
              onCloseDialog={onCloseDialog}
           />
      </div>
    );
  }
}

export default BrowserContainer
