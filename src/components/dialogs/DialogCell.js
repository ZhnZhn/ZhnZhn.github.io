
import Modals from './modals/Modals'
import Rows from './rows/Rows'

import DraggableDialog from '../zhn-moleculs/DraggableDialog'
import ModalPopup from '../zhn-moleculs/ModalPopup'
import ShowHide from '../zhn/ShowHide';
import ValidationMessages from '../zhn/ValidationMessages'

import Toolbar from './Toolbar'
import RowInputText from './RowInputText'
import RowInputColor from './RowInputColor'
import SelectWithLoad from './SelectWithLoad'

const DialogCell = {
  DraggableDialog,
  ModalPopup,
  ShowHide,
  ValidationMessages,

  Toolbar,
  RowInputText,
  RowInputColor,
  SelectWithLoad,
  ...Rows,
  ...Modals
};

export default DialogCell
