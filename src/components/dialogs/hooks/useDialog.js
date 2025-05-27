import useMenuMore from './useMenuMore';
import {
  TITLE_TOGGLE,
  useToolbar
} from './useToolbar';
import useValidationMessages from './useValidationMessages';

const useDialog = (
  props,
  toolbarHandlers,
  toggleLabels
) => {
  const {
    onAbout
  } = props
  , [
    _isToolbar,
    _menuMoreModel
  ] = useMenuMore(onAbout)
  , _toolbarProps = toolbarHandlers.toggleInputs
    ? void 0
    : {
        tittleToggle: TITLE_TOGGLE,
        toggleInputs: toggleLabels
      }
  , _toolbarButtons = useToolbar({
    ...toolbarHandlers,
    ..._toolbarProps,
    onAbout
  });
  return [
    _isToolbar,
    _menuMoreModel,
    _toolbarButtons,
    ...useValidationMessages(props.onClose)
  ];
};

export default useDialog
