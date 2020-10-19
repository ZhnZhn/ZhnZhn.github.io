import { Component } from 'react'
//import PropTypes from "prop-types";

import ModalMenu from './ModalMenu'
import TableHead from './TableHead'
import TableBody from './TableBody'

import F from './compFactory'
import S from './Style'

const C = {
  UP: 'UP',
  DOWN: 'DOWN',

  ASC: 'ascending',
  DESC: 'descending'
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
        isHide: PropTypes.bool,
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
      headers: props.headers,
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

  _hToogleGridLine = () => {
    this.setState(prevState => ({
      isGridLine: !prevState.isGridLine
    }))
  }

  _hToggleColumn = (index) => {
    this.setState(({ headers }) => {
      const _index = index + 1;
      headers[_index].isHide = !headers[_index].isHide
      return { headers: [...headers] };
    })
  }

 _hSort = (pn) => {
   this.setState(prevState => {
     const { rows, sortBy, sortTo } = prevState
         , _compBy = F.compBy(S.TOKEN_NAN, pn)
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

  render(){
    const {
      gridId,
      thMoreStyle,
      className,
      tableFn
    } = this.props
    , {
      isGridLine,
      isMenuMore,
      sortBy,
      sortTo,
      headers,
      rows
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
          onToggleGrid={this._hToogleGridLine}
          headers={headers}
          onToggle={this._hToggleColumn}
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
          <TableBody
            headers={headers}
            rows={rows}
            tableFn={tableFn}
          />
        </table>
      </div>
    );
  }
}


export default Table
