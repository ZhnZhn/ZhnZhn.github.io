import React, { Component } from 'react'
//import PropTypes from "prop-types";

import SvgMore from '../zhn/SvgMore'
import StylePopup from './StylePopup'

import F from './compFactory'
import FN from './tableFn'
import S from './Style'

const CL_LINK = "native-link";
const CL_GRID = "grid";
const TOKEN_NAN = '―';

const C = {
  UP: 'UP',
  DOWN: 'DOWN',

  ASC: 'ascending',
  DESC: 'descending'
};

const _crLinkEl = (id, title, fn) => {
  const _href = (typeof fn === 'function')
           ? fn(id)
           : undefined;
  return (
    <a
      className={CL_LINK}
      href={_href}
    >
      {title}
    </a>
  );
};


class Table extends Component {
  /*
  static propTypes = {
    gridId: PropTypes.string,
    thMoreStyle: PropTypes.object,
    rows: PropTypes.array,
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
    tableFn: PropTypes.shape({
       numberFormat: PropTypes.func,
       valueToHref: PropTypes.func
    })
  }
  */

  static defaultProps = {
    className: '',
    rows: [],
    headers: [],
    tableFn: {}
  }

  constructor(props){
    super()
    this.state = {
      isGridLine: true,
      rows: props.rows,
      sortBy: undefined,
      sortTo: undefined,
      isMoreStyle: false
    }
  }

 _hSort = (pn) => {
   this.setState(prevState => {
     const { rows, sortBy, sortTo } = prevState
         , _compBy = F.compBy(TOKEN_NAN, pn)
    let _rows, _sortTo;
    if (pn === sortBy && sortTo === C.UP) {
      _rows = rows.sort(F.opCompBy(pn, _compBy))
      _sortTo = C.DOWN
    } else {
      _rows = rows.sort(_compBy)
      _sortTo = C.UP
    }
    return {
       rows: _rows,
       sortBy: pn,
       sortTo: _sortTo
     };
   })
 }
 _hThKeyPressed = (pn, evt) => {
   evt.preventDefault()
   const { which } = evt;
   if ( which === 13 || which === 32) {
     this._hSort(pn)
   }
 }

 _hToggleMoreStyle = (evt) => {
   evt.stopPropagation()
   this.setState(prevState => {
     return {
       isMoreStyle: !prevState.isMoreStyle
     };
   })
 }

 _hCheckGridLine = () => {
   this.setState({ isGridLine: true })
 }
 _hUnCheckGridLine = () => {
   this.setState({ isGridLine: false })
 }


  _renderHeader = () => {
    const { gridId, thMoreStyle, headers } = this.props
        , { sortBy, sortTo } = this.state;
    return headers.map((h, hIndex) => {
      const { name, pn } = h
          , {
              style,
              ariaSort, ariaLabel
            } = FN.crAppearance({
                  S, C, pn, name, sortBy, sortTo
                })
          , _elMore1 = hIndex === 0
                ? <SvgMore svgStyle={S.SVG_MORE} onClick={this._hToggleMoreStyle}/>
                : null
          , _thStyle = hIndex === 0
                ? thMoreStyle
                : null;

      return (
        <th
          style={{...S.TH, ..._thStyle, ...style }}
          rowSpan="1"
          colSpan="1"
          tabIndex="0"
          arial-controls={gridId}
          aria-label={ariaLabel}
          aria-sort={ariaSort}
          onClick={this._hSort.bind(null, pn)}
          onKeyPress={this._hThKeyPressed.bind(null, pn)}
        >
          {_elMore1}
          {name}
        </th>
      );
    });
  }

  _renderRows = () => {
    const { headers, tableFn } = this.props
         , {
             numberFormat,
             valueToHref
           } = tableFn
         , { rows } = this.state;

    return rows.map((r, rIndex) => {
      const _elTd = headers.map(h => {
        const { pn, style, isR, isHref } = h
            , v = r[pn]
            , _v = FN.toFormatValue({ TOKEN_NAN, h, v, fn: numberFormat })
            , _tdStyle = FN.crTdStyle({ S, v, isR })
            , _elValueOrTitle = (isHref)
                  ? _crLinkEl(r.id, _v, valueToHref)
                  : _v;
        return (
          <td
            key={rIndex}
            style={{...S.TD, ...style, ..._tdStyle}}
          >
            {_elValueOrTitle}
          </td>
        );
      })
      return (
        <tr role="row">
          {_elTd}
        </tr>
      );
    });
  }

  render(){
    const { gridId, className } = this.props
        , { isGridLine, isMoreStyle } = this.state
        , _className = isGridLine
               ? CL_GRID
               : '';
    return (
      <table
        className={`${_className} ${className}`}
        id={gridId}
        style={S.ROOT}
        role="grid"
      >
        <thead style={S.THEAD}>
           <tr>
             {this._renderHeader()}
           </tr>
           <StylePopup
             isShow={isMoreStyle}
             style={S.STYLE_MORE}
             onClose={this._hToggleMoreStyle}
             isGridLine={isGridLine}
             onCheck={this._hCheckGridLine}
             onUnCheck={this._hUnCheckGridLine}
           />
        </thead>
        <tbody>
          {this._renderRows()}
        </tbody>
      </table>
    );
  }
}

export default Table
