import { useState } from '../uiApi';
import useListen from '../hooks/useListen';

import DialogContainer from '../zhn-containers/DialogContainer';

const CL_HRZ_CONTAINER = "hrz-container";

const BrowserContainer = ({
  initBrowserAction,
  showDialogAction,
  onCloseDialog
}) => {
  const [
    elBrowsers,
    setElBrowsers
  ] = useState([]);

  useListen((actionType, elBrowser) => {
    if (actionType === initBrowserAction){
      setElBrowsers(arrEl => [elBrowser, ...arrEl])
    }
  })
  return (
    <div className={CL_HRZ_CONTAINER}>
       {elBrowsers}
       <DialogContainer
          maxDialog={3}
          showAction={showDialogAction}
          onCloseDialog={onCloseDialog}
       />
    </div>
  );
}

export default BrowserContainer
