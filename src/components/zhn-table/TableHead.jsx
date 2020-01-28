import React, { Component } from 'react'

import SvgMore from '../zhn/SvgMore'
import ModalMenu from './ModalMenu'

import S from './Style'
import FN from './tableFn'

const C = {
  UP: 'UP',
  DOWN: 'DOWN',

  ASC: 'ascending',
  DESC: 'descending'
};

class TableHead extends Component {

  /*
  static propTypes = {
    gridId: PropTypes.string,
    thMoreStyle: PropTypes.object,
    headers: PropTypes.arrayOf(
       PropTypes.shape({
        name: PropTypes.string,
        pn: PropTypes.string,
        isR: PropTypes.bool,
        isF: PropTypes.bool,
        isHref: PropTypes.bool,
        style: PropTypes.object
      })
    ),
    isGridLine: PropTypes.bool
    onCheckGridLine: PropTypes.func,
    onUnCheckGridLine: PropTypes.func
    sortBy: PropTypes.string,
    sortTo: PropTypes.string,
    onSort: PropTypes.func
  }
  */


  state = {
    isMenuMore: false
  }

  _hToggleMenuMore = (evt) => {
    evt.stopPropagation()
    this.setState(prevState => ({
      isMenuMore: !prevState.isMenuMore
    }))
  }

  _hThKeyPressed = (pn, evt) => {
    evt.preventDefault()
    const { which } = evt;
    if ( which === 13 || which === 32) {
      this.props.onSort(pn)
    }
  }

  _renderHeader = () => {
    const {
      gridId, thMoreStyle, headers,
      sortBy, sortTo, onSort
    } = this.props;
    return headers.map((h, hIndex) => {
      const { name, pn } = h
      , {
          style,
          ariaSort, ariaLabel
        } = FN.crAppearance({
              S, C, pn, name, sortBy, sortTo
            })
      , _elMore = hIndex === 0
            ? (
               <SvgMore
                 style={S.BT_SVG_MORE}
                 svgStyle={S.SVG_MORE}
                 onClick={this._hToggleMenuMore}
               />
              )
            : null
      , _thStyle = hIndex === 0
            ? thMoreStyle
            : null;

      return (
        <th
          key={h.name}
          style={{...S.TH, ..._thStyle, ...style }}
          rowSpan="1"
          colSpan="1"
          tabIndex="0"
          arial-controls={gridId}
          aria-label={ariaLabel}
          aria-sort={ariaSort}
          onClick={onSort.bind(null, pn)}
          onKeyPress={this._hThKeyPressed.bind(null, pn)}
        >
          {_elMore}
          {name}
        </th>
      );
    });
  }

  render(){
    const {
      isGridLine,
      onCheckGridLine,
      onUnCheckGridLine
    } = this.props
    , { isMenuMore } = this.state;
    return (
      <thead style={S.THEAD}>
         <tr>
           {this._renderHeader()}
         </tr>
         <ModalMenu
           isShow={isMenuMore}
           style={S.STYLE_MORE}
           onClose={this._hToggleMenuMore}
           isGridLine={isGridLine}
           onCheck={onCheckGridLine}
           onUnCheck={onUnCheckGridLine}
         />
      </thead>
    );
  }
}

export default TableHead
