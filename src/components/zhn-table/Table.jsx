import React, { Component } from 'react'
//import PropTypes from "prop-types";

import TableHead from './TableHead'

import F from './compFactory'
import FN from './tableFn'
import S from './Style'

const TOKEN_NAN = '―';

const C = {
  UP: 'UP',
  DOWN: 'DOWN',

  ASC: 'ascending',
  DESC: 'descending'
};

const _isFn = fn => typeof fn === 'function';

const _crLinkEl = (id, title, fn) => {
  const _href = _isFn(fn) ? fn(id) : undefined;
  return (
    <a
      className={S.CL_LINK}
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
    super(props)
    this.state = {
      isGridLine: true,
      rows: props.rows,
      sortBy: void 0,
      sortTo: void 0
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

 _hCheckGridLine = () => {
   this.setState({ isGridLine: true })
 }
 _hUnCheckGridLine = () => {
   this.setState({ isGridLine: false })
 }

  _renderRows = () => {
    const {
      headers, tableFn
    } = this.props
    , {
        numberFormat,
        valueToHref
      } = tableFn
    , { rows } = this.state;

    return rows.map((r, rIndex) => {
      const _elTds = headers.map((h, hIndex) => {
        const { pn, style, isR, isHref } = h
            , _key = r.id+hIndex
            , v = r[pn]
            , _v = FN.toFormatValue({ TOKEN_NAN, h, v, fn: numberFormat })
            , _tdStyle = FN.crTdStyle({ S, v, isR })
            , _elValueOrTitle = isHref
                  ? _crLinkEl(r.id, _v, valueToHref)
                  : _v;
        return (
          <td
            key={_key}
            style={{...S.TD, ...style, ..._tdStyle}}
          >
            {_elValueOrTitle}
          </td>
        );
      })
      return (
        <tr key={r.id} role="row">
          {_elTds}
        </tr>
      );
    });
  }

  render(){
    const {
      gridId,
      thMoreStyle,
      headers,
      className
    } = this.props
    , {
      isGridLine,
      sortBy,
      sortTo
    } = this.state
    , _className = isGridLine
         ? S.CL_GRID
         : '';
    return (
      <table
        className={`${_className} ${className}`}
        id={gridId}
        style={S.ROOT}
        role="grid"
      >
        <TableHead
          gridId={gridId}
          thMoreStyle={thMoreStyle}
          headers={headers}
          isGridLine={isGridLine}
          onCheckGridLine={this._hCheckGridLine}
          onUnCheckGridLine={this._hUnCheckGridLine}
          sortBy={sortBy}
          sortTo={sortTo}
          onSort={this._hSort}
        />
        <tbody>
          {this._renderRows()}
        </tbody>
      </table>
    );
  }
}

export default Table
