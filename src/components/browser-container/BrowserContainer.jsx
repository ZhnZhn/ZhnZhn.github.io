import React, { Component } from 'react';
//import PropTypes from "prop-types";

import DialogContainer from '../zhn-containers/DialogContainer';

const CL_ROOT = "hrz-container";

class BrowserContainer extends Component {
  /*
  static propTypes = {
    store: PropTypes.shape({
      listen: PropTypes.func
    }),
    initBrowserAction: PropTypes.string,
    showDialogAction: PropTypes.string,
    onCloseDialog: PropTypes.func
  }
  */

  state = {
    elBrowsers: []
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
       this.setState(prevState => ({
         elBrowsers: [data, ...prevState.elBrowsers]
       }))
     }
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
         {elBrowsers.map(Comp => React.cloneElement(Comp))}
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
