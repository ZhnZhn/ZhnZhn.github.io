
import crDateConfig from './fns/crDateConfig'
import crMenuMore from './fns/crMenuMore'
import Modals from './modals/Modals'
import Rows from './rows/Rows'

import DraggableDialog from '../zhn-moleculs/DraggableDialog'
import ModalPopup from '../zhn-moleculs/ModalPopup'
import ShowHide from '../zhn/ShowHide';
import ValidationMessages from '../zhn/ValidationMessages'

import ToolbarButtonCircle from './ToolbarButtonCircle'
import Toolbar from './Toolbar'
import RowInputText from './RowInputText'
import RowInputColor from './RowInputColor'
import SelectWithLoad from './SelectWithLoad'
import Button from './Button'

const DialogCell = {
  DraggableDialog,
  ModalPopup,
  ShowHide,
  ValidationMessages,

  ToolbarButtonCircle,
  Toolbar,
  RowInputText,
  RowInputColor,
  SelectWithLoad,
  Button,
  ...Rows,
  ...Modals,
  crDateConfig,
  crMenuMore
};

export default DialogCell
