import React, { Component } from 'react';

import CellColor from './CellColor'
import ModalPopup from './ModalPopup';

const S = {
    SHOW_HIDE: {
      zIndex: 1010,
      position: 'absolute',
      top: 35,
      left: -10,
      backgroundColor: 'rgba(77, 77, 77, 1)',
      borderBottom: '4px solid green',
      borderRadius: 5,
      boxShadow: 'rgba(0, 0, 0, 0.2) 0 0 0 5px'
   },
   ROOT_PANE: {
     margin: 10
   },
   ROW: {
     width: 120
   },
   COLOR: {
     display: 'inline-block',
     height: 32,
     width: 32,
     margin: 4,
     borderRadius: 2,
     verticalAlign: 'bottom',
     boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
   }
};


class ModalPalette extends Component {

  _renderColors = (model, onClickCell) => {
     const { rows, cols, colors } = model
         , _elRows = [];

     let r=0, c=0
       , _color, _idPrefix;
     for(; r<rows; r++){
       let _elCells = [];
       _idPrefix = colors[r*cols]
       for(c=0; c<cols; c++){
         _color = colors[r*cols + c]
         _elCells.push((
           <CellColor
             key={_color}
             id={_color}
             style={S.COLOR}
             color={_color}
             onClick={onClickCell.bind(null, _color)}
           />
         ))
       }
       _elRows.push((
         <div
           key={_idPrefix + r}
           id={_idPrefix + r}
           style={S.ROW}
         >
           {_elCells}
         </div>
       ))
     }
     return _elRows;
  }

  render() {
    const { isShow, model, onClickCell, onClose } = this.props;
    return (
      <ModalPopup
        isShow={isShow}
        style={S.SHOW_HIDE}
        onClose={onClose}
      >
        <div style={S.ROOT_PANE}>
           {this._renderColors(model, onClickCell)}
        </div>
      </ModalPopup>
    );
  }
}

export default ModalPalette
