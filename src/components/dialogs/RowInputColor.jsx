import React, { useRef, useState, useCallback, useMemo, useEffect } from 'react';
//import PropTypes from "prop-types";

import Model from '../../constants/Model'
import InputText from '../zhn/InputText'
import CellColor from '../zhn-moleculs/CellColor'
import ModalPalette from '../zhn-moleculs/ModalPalette'

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
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  },
  COLOR: {
    position: 'relative',
    display: 'inline-block',
    height: 32,
    width: 32,
    borderRadius: 2,
    verticalAlign: 'bottom',
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  }
}

const _onEnter = () => {};

const RowInputColor = ({
  styleRoot,
  styleCaption,
  styleInput,
  caption='Color:',
  initValue='#90ed7d',
  onEnter=_onEnter
}) => {
  const _refCellColor = useRef()
  , [value, setValue] = useState(initValue)
  , [isShowPallete, setIsShowPallette] = useState(false)
  , _hEnter = useCallback((value) => {
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
   }, [])



  useEffect(()=>setValue(initValue), [initValue])

  const _caption = caption.indexOf(':') !== -1
    ? caption
    : `${caption}:`
  , _cellColorStyle = useMemo(
        () => ({
           ...S.COLOR,
           backgroundColor: value
        }),
        [value]
    );

  return (
    <div style={{...S.ROOT, ...styleRoot}}>
      <label>
        <span style={{...S.CAPTION, ...styleCaption}}>
          {_caption}
        </span>
        <InputText
           style={{...S.INPUT_TEXT, ...styleInput}}
           initValue={value}
           maxLength={20}
           onEnter={_hEnter}
        />
      </label>
      <CellColor
        ref={_refCellColor}
        style={_cellColorStyle}
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
  styleRoot: PropTypes.object,
  styleCaption: PropTypes.object,
  styleInput: PropTypes.object,
  caption: PropTypes.string,
  initValue: PropTypes.string,
  onEnter: PropTypes.func
}
*/

export default RowInputColor
