import { useState } from '../uiApi';

import DialogContainer from '../zhn-containers/DialogContainer';

const CL_HRZ_CONTAINER = "hrz-container";

const BrowserContainer = ({
  useMsInitBrowser
}) => {
  const [
    elBrowsers,
    setElBrowsers
  ] = useState([]);

  useMsInitBrowser(msInitBrowser => {
    const { elBrowser } = msInitBrowser || {};
    if (elBrowser) {
      setElBrowsers(arrEl => [elBrowser, ...arrEl])
    }
  })

  return (
    <div className={CL_HRZ_CONTAINER}>
       {elBrowsers}
       <DialogContainer
          maxDialog={3}
       />
    </div>
  );
}

export default BrowserContainer
