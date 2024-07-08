//import PropTypes from "prop-types";
import {
  useRef,
  useState,
  useCallback,
  useEffect
} from '../uiApi';

import Model from '../../constants/Model'
import InputText from '../zhn/InputText'
import CellColor from '../zhn-moleculs/CellColor'
import ModalPalette from '../zhn-moleculs/ModalPalette'

import crCaption from './fns/crCaption'
import { S_CAPTION } from './Dialog.Style'

const CL_INPUT_COLOR = 'p-r va-b'
, DF_COLOR = '#90ed7d'

, S_ROOT = {
  padding: '6px 6px 6px 0'
}
, S_INPUT_TEXT = {
  width: 80,
  margin: '0 8px 2px 5px'
}
, FN_NOOP = () => {};

const RowInputColor = ({
  style,
  captionStyle,
  inputStyle,
  caption,
  initValue=DF_COLOR,
  onEnter=FN_NOOP
}) => {
  const _refCellColor = useRef()
  , [
    value,
    setValue
  ] = useState(initValue)
  , [
    isShowPallete,
    setIsShowPallette
  ] = useState(false)
  , _hEnter = useCallback(value => {
      onEnter(value)
      setValue(value)
    }, [onEnter])
  , _hClickPallete = useCallback((color, event) => {
      if (event.target === _refCellColor.current) {
        setIsShowPallette(is => !is)
      }
    }, [])
  , _hClosePalette = useCallback(() => {
      setIsShowPallette(false)
   }, []);

  useEffect(
    () => setValue(initValue),
    [initValue]
  )

  const _caption = crCaption(caption);

  return (
    <div style={{...S_ROOT, ...style}}>
      <label>
        {_caption && <span style={{...S_CAPTION, ...captionStyle}}>
          {_caption}
        </span>}
        <InputText
           style={{...S_INPUT_TEXT, ...inputStyle}}
           initValue={value}
           maxLength={20}
           onEnter={_hEnter}
        />
      </label>
      <CellColor
        refEl={_refCellColor}
        className={CL_INPUT_COLOR}
        color={value}
        onClick={_hClickPallete}
      >
        <ModalPalette
           isShow={isShowPallete}
           model={Model.palette}
           onClickCell={_hEnter}
           onClose={_hClosePalette}
        />
      </CellColor>
    </div>
  );
}

/*
RowInputColor.propTypes = {
  style: PropTypes.object,
  captionStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  caption: PropTypes.string,
  initValue: PropTypes.string,
  onEnter: PropTypes.func
}
*/

export default RowInputColor
