import { useMemo } from '../uiApi';
import FlatButton from '../zhn-m/FlatButton';

/*eslint-disable react-hooks/exhaustive-deps */
const useCommandButtons = (
  getConfigs,
  deps
) => useMemo(() => getConfigs()
  .map(config => (<FlatButton
    key={config[0]}
    caption={config[0]}
    onClick={config[1]}
  />)),
  deps || []
);
// getConfigs
/*eslint-enable react-hooks/exhaustive-deps */

export default useCommandButtons
