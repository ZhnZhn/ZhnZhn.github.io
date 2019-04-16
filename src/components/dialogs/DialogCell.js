
import Rows from './rows/Rows'

import DraggableDialog from '../zhn-moleculs/DraggableDialog'
import ShowHide from '../zhn/ShowHide';
import ValidationMessages from '../zhn/ValidationMessages'

import ToolbarButtonCircle from './ToolbarButtonCircle'
import Toolbar from './Toolbar'
import RowInputText from './RowInputText'
import RowInputColor from './RowInputColor'
import SelectWithLoad from './SelectWithLoad'
import SelectParentChild from './SelectParentChild'
import Button from './Button'

const DialogCell = {
  DraggableDialog,
  ShowHide,
  ValidationMessages,

  ToolbarButtonCircle,
  Toolbar,
  RowInputText,
  RowInputColor,
  SelectWithLoad,
  SelectParentChild,
  Button,
  ...Rows
};

export default DialogCell
