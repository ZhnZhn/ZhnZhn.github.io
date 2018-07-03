import React, { Component } from 'react';

import DialogContainer from '../zhn-containers/DialogContainer';

const CL_ROOT = "hrz-container";

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
            store,
            showDialogAction,
            onCloseDialog
          } = this.props
        , {
            elBrowsers
          } = this.state;

    return (
      <div className={CL_ROOT}>
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
