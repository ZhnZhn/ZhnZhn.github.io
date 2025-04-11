import { useToggle } from '../../hooks/useToggle';
import { isWideWidth } from '../../has';

import useMenuMore from './useMenuMore';
import useToolbar from './useToolbar';
import useValidationMessages from './useValidationMessages';

const _isWideWidth = isWideWidth();

const useDialog = ({
  onAbout,
  onClose,
  ...toolbarHandlers
}) => {
  const [
    isShowLabels,
    toggleLabels
  ] = useToggle(_isWideWidth)
  , [
    isToolbar,
    menuMoreModel
  ] = useMenuMore(onAbout)
  , toolbarButtons = useToolbar({
    ...toolbarHandlers,
    toggleLabels,
    onAbout
  });
  return [
    isToolbar,
    isShowLabels,
    menuMoreModel,
    toolbarButtons,
    ...useValidationMessages(onClose)
  ];
}

export default useDialog
