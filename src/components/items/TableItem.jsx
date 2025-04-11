import { useToggle } from "../hooks/useToggle";

import ShowHide from "../zhn/ShowHide";
import Table from "../zhn-table/Table";
import ItemHeader from "./ItemHeader";

const S_ROOT = { paddingBottom: 8 }
, S_HEADER = {
  position: "sticky",
  top: -1,
  zIndex: 1,
  willChange: "transform"
}
, S_CAPTION = { width: "100%" }
, S_SHOW_HIDE = { padding: "8px 0" }
, S_DATA_SOURCE = {
  padding: "2px 0 0 12px",
  color: "#909090",
  fontSize: "11px"
};

export const TableItem = ({
  isInitialClose,
  thMoreStyle,
  config,
  onCloseItem
}) => {
  const [
    isOpen,
    toggleIsOpen
  ] = useToggle(!isInitialClose)
  , {
      id,
      title,
      headers,
      flatHeaders,
      rows,
      tableFn,
      dataSource,
      dsStyle
    } = config
  , _gridId = `tb_${id}`;
  return (
    <div style={S_ROOT}>
      <ItemHeader
        isOpen={isOpen}
        style={S_HEADER}
        caption={title}
        captionStyle={S_CAPTION}
        onClick={toggleIsOpen}
        onClose={onCloseItem}
      />
      <ShowHide
        isShow={isOpen}
        style={S_SHOW_HIDE}
      >
        <Table
          gridId={_gridId}
          thMoreStyle={thMoreStyle}
          headers={headers}
          flatHeaders={flatHeaders}
          rows={rows}
          tableFn={tableFn}
        />
        {dataSource && <div
           style={{...S_DATA_SOURCE, ...dsStyle}}>{dataSource}
         </div>}
      </ShowHide>
    </div>
  );
}
