import OpenClose from '../zhn/OpenClose';
import { CL_OPEN_CLOSE_BLACK   } from '../styleFn';
import {
  S_OPEN_CLOSE,
  S_OC_STYLE
} from './Row.Style';

export const RowOpenClose = ({
  caption,
  CompAfter,
  children
}) => (
  <OpenClose
    caption={caption}
    className={CL_OPEN_CLOSE_BLACK}
    style={S_OPEN_CLOSE}
    ocStyle={S_OC_STYLE}
    CompAfter={CompAfter}
  >
    {children}
  </OpenClose>
);
