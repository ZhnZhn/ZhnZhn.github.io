import React, { useState } from 'react';
//import PropTypes from "prop-types";
import useListen from '../hooks/useListen'

import DialogContainer from '../zhn-containers/DialogContainer';

const CL_ROOT = "hrz-container";

const BrowserContainer = ({
  store,
  initBrowserAction,
  showDialogAction,
  onCloseDialog
}) => {
  const [elBrowsers, setElBrowsers] = useState([]);

  useListen(store, (actionType, elBrowser) => {
    if (actionType === initBrowserAction){
      setElBrowsers(arrEl => [elBrowser, ...arrEl])
    }
  })
  return (
    <div className={CL_ROOT}>
       {elBrowsers}
       <DialogContainer
          maxDialog={3}
          store={store}
          showAction={showDialogAction}
          onCloseDialog={onCloseDialog}
       />
    </div>
  );
}

/*
BrowserContainer.propTypes = {
  store: PropTypes.shape({
    listen: PropTypes.func
  }),
  initBrowserAction: PropTypes.string,
  showDialogAction: PropTypes.string,
  onCloseDialog: PropTypes.func
}
*/

export default BrowserContainer
