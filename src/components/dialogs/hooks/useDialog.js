import { useToggle } from '../../hooks/useToggle';
import { isWideWidth } from '../../has';

import useMenuMore from './useMenuMore';
import useToolbar from './useToolbar';
import useValidationMessages from './useValidationMessages';

const IS_WIDE_WIDTH = isWideWidth();

const useDialog = (
  props,
  toolbarHandlers
) => {
  const {
    onAbout
  } = props
  , [
    _isShowLabels,
    _toggleLabels
  ] = useToggle(IS_WIDE_WIDTH)
  , [
    _isToolbar,
    _menuMoreModel
  ] = useMenuMore(onAbout)
  , _toolbarButtons = useToolbar({
    ...toolbarHandlers,
    toggleLabels: _toggleLabels,
    onAbout
  });
  return [
    _isToolbar,
    _isShowLabels,
    _menuMoreModel,
    _toolbarButtons,
    ...useValidationMessages(props.onClose)
  ];
}

export default useDialog
