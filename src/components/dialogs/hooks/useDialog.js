import useToggle from '../../hooks/useToggle';
import has from '../../has';

import useMenuMore from './useMenuMore';
import useToolbar from './useToolbar';
import useValidationMessages from './useValidationMessages';

const _isWideWidth = has.wideWidth();

const useDialog = ({
  onClickInfo,
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
  ] = useMenuMore(onClickInfo)
  , toolbarButtons = useToolbar({
    ...toolbarHandlers,
    toggleLabels,
    onClickInfo
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
