import {useRef, useCallback, useMemo} from 'react';

import D from '../dialogs/DialogCell';
import useToggle2 from './useToggle2';

const useModalOptions = () => {
  const _refDialogOptions = useRef({})
  , [isOptions, _toggleOptions, _hideOptions] = useToggle2(false)
  , _toggleDialogOption = useCallback(propName => {
      _refDialogOptions.current[propName] = !_refDialogOptions.current[propName]
  }, [])
  return [
    /*eslint-disable react-hooks/exhaustive-deps */
    useMemo(() => (
      <D.ModalOptions
        isShow={isOptions}
        toggleOption={_toggleDialogOption}
        onClose={_hideOptions}
      />
    ), [isOptions])
    //_toggleDialogOption, _hideOptions
    /*eslint-enable react-hooks/exhaustive-deps */
    , _refDialogOptions
    , _toggleOptions
  ];
};

export default useModalOptions
