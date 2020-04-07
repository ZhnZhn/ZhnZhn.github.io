import React, { Component } from 'react'

import isKeyEnter from '../zhn/isKeyEnter'
import SvgMore from '../zhn/SvgMore'

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
        isHide: PropTypes.bool,
        name: PropTypes.string,
        pn: PropTypes.string,
        isR: PropTypes.bool,
        isF: PropTypes.bool,
        isHref: PropTypes.bool,
        style: PropTypes.object
      })
    ),
    sortBy: PropTypes.string,
    sortTo: PropTypes.string,
    onSort: PropTypes.func,
    onMenuMore: PropTypes.func
  }
  */

  _hThKeyPressed = (pn, evt) => {
    evt.preventDefault()
    if (isKeyEnter(evt)) {
      this.props.onSort(pn)
    }
  }

  _renderHeader = () => {
    const {
      gridId, thMoreStyle, headers,
      sortBy, sortTo, onSort, onMenuMore
    } = this.props;
    return headers.map((h, hIndex) => {
      if (h.isHide) {
        return null;
      }
      const { name, pn } = h
      , {
          style,
          ariaSort, ariaLabel
        } = FN.crAppearance({
              S, C, pn, name, sortBy, sortTo
            })
      , _elMore = hIndex === 0
           ? (<SvgMore
                style={S.BT_SVG_MORE}
                svgStyle={S.SVG_MORE}
                onClick={onMenuMore}
             />)
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
    }).filter(Boolean);
  }

  render(){
    return (
      <thead style={S.THEAD}>
         <tr>
           {this._renderHeader()}
         </tr>
      </thead>
    );
  }
}

export default TableHead
