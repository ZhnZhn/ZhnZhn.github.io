import React, { Component } from 'react'
//import PropTypes from "prop-types";

import ModalMenu from './ModalMenu'
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
  const _href = _isFn(fn) ? fn(id) : void 0;
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
    rows: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string
      })
    ),
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
      isMenuMore: false,
      rows: props.rows,
      sortBy: void 0,
      sortTo: void 0
    }
  }

  _hToggleMenuMore = (evt) => {
    evt.stopPropagation()
    this.setState(prevState => ({
      isMenuMore: !prevState.isMenuMore
    }))
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
      const _id = r.id
      , _elTds = headers.map((h, hIndex) => {
        const { pn, style, isR, isHref } = h
        , _key = _id + hIndex
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
        <tr key={_id} role="row">
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
      isMenuMore,
      sortBy,
      sortTo
    } = this.state
    , _className = isGridLine
         ? S.CL_GRID
         : '';
    return (
      <div style={S.WRAPPER_DIV}>
        <ModalMenu
          isShow={isMenuMore}
          style={S.STYLE_MORE}
          onClose={this._hToggleMenuMore}
          isGridLine={isGridLine}
          onCheck={this._hCheckGridLine}
          onUnCheck={this._hUnCheckGridLine}
        />
        <table
          className={`${_className} ${className}`}
          id={gridId}
          style={S.TABLE}
          role="grid"
        >
          <TableHead
            gridId={gridId}
            thMoreStyle={thMoreStyle}
            headers={headers}
            sortBy={sortBy}
            sortTo={sortTo}
            onSort={this._hSort}
            onMenuMore={this._hToggleMenuMore}
          />
          <tbody>
            {this._renderRows()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table
