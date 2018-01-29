import React, { Component } from 'react'
//import PropTypes from "prop-types";

const CL_LINK = "native-link";

const C = {
  UP: 'UP',
  DOWN: 'DOWN',

  ASC: 'ascending',
  DESC: 'descending'
};

const S = {
  ROOT: {
    width: '100%',
    borderCollapse: 'collapse',
    borderSpacing: 0
  },
  THEAD: {
    lineHeight: 1.8,
  },
  TH: {
    cursor: 'pointer',
    pointerEvents: 'auto',
    borderTop: '3px solid transparent',
    borderBottom: '3px solid transparent'
  },
  TH_UP: {
    borderTop: '3px solid yellow'
  },
  TH_DOWN: {
    borderBottom: '3px solid yellow'
  },
  TD: {
    padding: '6px',
    verticalAlign: 'middle',
    lineHeight: 1.4,
    whiteSpace: 'nowrap',
    borderTop: 0
  },
  UP: {
    color: '#4caf50',
    fontWeight: 'bold'
  },
  DOWN: {
    color: '#f44336',
    fontWeight: 'bold'
  }
};

const _crTdStyle = (v, isR) => {
  let style;
  if (isR) {
    style = v > 0 ? S.UP : S.DOWN;
  }
  return style;
}

const _fCompBy = pn => (a, b) => {
  if ( a[pn] < b[pn] ) return 1;
  if ( a[pn] > b[pn] ) return -1;
  return 0;
}

const _toFormatValue = (h, v, fn) => {
  if (h.isF && typeof fn === 'function') {
    return fn(v);
  }
  return v;
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
}

const _crThAriaLabel = (name, order) => {
  return `${name}: activate to sort column ${order}`;
}

const _crAppearance = ({ pn, name, sortBy, sortTo }) => {
  let style, ariaSort, ariaLabel;
  if (pn === sortBy) {
    if (sortTo === C.UP) {
     style = S.TH_UP
     ariaSort = C.DESC
     ariaLabel = _crThAriaLabel(name, C.ASC)
    } else {
      style = S.TH_DOWN
      ariaSort = C.ASC
      ariaLabel = _crThAriaLabel(name, C.DESC)
    }
  } else {
     ariaLabel = _crThAriaLabel(name, C.ASC)
  }
  return { style, ariaSort, ariaLabel };
};

class Table extends Component {
  /*
  static propTypes = {
    gridId: PropTypes.string,
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
    rows: [],
    headers: [],
    tableFn: {}
  }

  constructor(props){
    super()
    this.state = {
      rows: props.rows,
      sortBy: undefined,
      sortTo: undefined
    }
  }

 _hSort = (pn) => {
   this.setState(prevState => {
     const { rows, sortBy, sortTo } = prevState
         , _rows = (pn === sortBy)
                ? rows.reverse()
                : rows.sort(_fCompBy(pn))
         , _sortTo = (pn === sortBy)
                ? (sortTo === C.DOWN)
                    ? C.UP
                    : C.DOWN
                : C.UP;
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

  _renderHeader = () => {
    const { gridId, headers } = this.props
        , { sortBy, sortTo } = this.state;
    return headers.map(h => {
      const { name, pn } = h
          , {
              style,
              ariaSort, ariaLabel
            } = _crAppearance({
                  pn, name, sortBy, sortTo
                });

      return (
        <th
          style={{...S.TH, ...style }}
          rowSpan="1"
          colSpan="1"
          tabIndex="0"
          arial-controls={gridId}
          aria-label={ariaLabel}
          aria-sort={ariaSort}
          onClick={this._hSort.bind(null, pn)}
          onKeyPress={this._hThKeyPressed.bind(null, pn)}
        >
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
            , _v = _toFormatValue(h, v, numberFormat)
            , _tdStyle = _crTdStyle(v, isR)
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
    const { gridId } = this.props;
    return (
      <table
        id={gridId}
        style={S.ROOT}
        role="grid"
      >
        <thead style={S.THEAD}>
           <tr>
             {this._renderHeader()}
           </tr>
        </thead>
        <tbody>
          {this._renderRows()}
        </tbody>
      </table>
    );
  }
}

export default Table
