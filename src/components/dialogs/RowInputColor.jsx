import { useRef, useState, useCallback, useEffect } from 'react';
//import PropTypes from "prop-types";

import Model from '../../constants/Model'
import InputText from '../zhn/InputText'
import CellColor from '../zhn-moleculs/CellColor'
import ModalPalette from '../zhn-moleculs/ModalPalette'

const CL_INPUT_COLOR = 'p-r va-b';
const DF_COLOR = '#90ed7d';

const S = {
  ROOT: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingRight: 6
  },
  CAPTION: {
    display: 'inline-block',
    color: '#1b75bb',
    textAlign: 'right',
    width: 100,
    paddingRight: 5,
    fontSize: 16,
    fontWeight: 'bold'
  },
  INPUT_TEXT: {
    width: 80,
    marginRight: 8,
    marginBottom: 2,
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  }
};

const _onEnter = () => {};

const _crCaption = caption => caption && caption.indexOf(':') === -1
  ? `${caption}:`
  : caption;

const RowInputColor = ({
  style,
  captionStyle,
  inputStyle,
  caption,
  initValue=DF_COLOR,
  onEnter=_onEnter
}) => {
  const _refCellColor = useRef()
  , [value, setValue] = useState(initValue)
  , [isShowPallete, setIsShowPallette] = useState(false)
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

  useEffect(()=>setValue(initValue), [initValue])

  const _caption = _crCaption(caption);

  return (
    <div style={{...S.ROOT, ...style}}>
      <label>
        {_caption && <span style={{...S.CAPTION, ...captionStyle}}>
          {_caption}
        </span>}
        <InputText
           style={{...S.INPUT_TEXT, ...inputStyle}}
           initValue={value}
           maxLength={20}
           onEnter={_hEnter}
        />
      </label>
      <CellColor
        ref={_refCellColor}
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
