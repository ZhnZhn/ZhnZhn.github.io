import { CL_HRZ_CONTAINER } from '../styleFn';
import useStoreState from '../hooks/useStoreState';

import DialogContainer from '../zhn-containers/DialogContainer';

const updateElementBrowsers = (
  msInitBrowser,
  setState
) => {
  const { elBrowser } = msInitBrowser || {};
  if (elBrowser) {
    setState(arrEl => [elBrowser, ...arrEl])
  }
};

const BrowserContainer = ({
  useMsInitBrowser
}) => {
  const elBrowsers = useStoreState(
    [], useMsInitBrowser, updateElementBrowsers
  )[0];

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
