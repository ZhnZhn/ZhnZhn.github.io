//import PropTypes from "prop-types";
import { crCn } from "../styleFn";

import useToggle from "../hooks/useToggle";
import {
  useMenu,
  useColumn,
  useSort
} from "./useTable";

import ModalMenu from "./ModalMenu";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

import {
  CL_GRID,
  S_TABLE,
  S_MENU_MORE,
  S_WRAPPER_DIV
} from "./Style";

const Table = ({
  className,
  gridId,
  thMoreStyle,
  rows,
  headers,
  flatHeaders,
  tableFn
}) => {
  const [isGridLine, toogleGridLine] = useToggle(true)
  , [isMenuMore, toggleMenuMore] = useMenu()
  , [_headers, toggleColumn] = useColumn(flatHeaders || headers)
  , [{_rows, sortBy, sortTo}, sortByPn] = useSort(rows)
  , _tableCn = crCn([isGridLine, CL_GRID], className);
  return (
    <div style={S_WRAPPER_DIV}>
      <ModalMenu
        style={S_MENU_MORE}
        isShow={isMenuMore}
        onClose={toggleMenuMore}
        isGridLine={isGridLine}
        onToggleGrid={toogleGridLine}
        headers={headers}
        onToggle={toggleColumn}
      />
      <table
        role="grid"
        id={gridId}
        className={_tableCn}
        style={S_TABLE}
      >
        <TableHead
          gridId={gridId}
          thMoreStyle={thMoreStyle}
          headers={_headers}
          sortBy={sortBy}
          sortTo={sortTo}
          onSort={sortByPn}
          onMenuMore={toggleMenuMore}
        />
        <TableBody
          headers={_headers}
          rows={_rows}
          tableFn={tableFn}
        />
      </table>
    </div>
  );
};

/*
Table.propTypes = {
  className: PropTypes.string,
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
      id: PropTypes.int
    })
  ),
  flatHeaders: PropTypes.arrayOf(),
  tableFn: PropTypes.shape({
     numberFormat: PropTypes.func,
     valueToHref: PropTypes.func
  })
}
*/

export default Table
