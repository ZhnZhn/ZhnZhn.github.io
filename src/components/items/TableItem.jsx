import React from 'react'
import useToggle from '../hooks/useToggle'

import ShowHide from '../zhn/ShowHide';
import Table from '../zhn-table/Table'
import ItemHeader from './ItemHeader'

const S = {
  ROOT: {
    paddingBottom: 8
  },
  ROOT_HEADER: {
    position: 'sticky',
    top: -1,
    zIndex: 1,
    willChange: 'transform'
  },
  CAPTION: {
    width: '100%'
  },
  SHOW_HIDE: {
    paddingTop: 8,
    paddingBottom: 8
  },
  DATA_SOURCE: {
    paddingTop: 2,
    paddingLeft: 12,
    color: '#909090',
    fontSize: '11px'
  }
};

const TableItem = ({
  thMoreStyle,
  config,
  onCloseItem
}) => {
  const [isOpen, toggleIsOpen] = useToggle(true)
  , {
      id, title,
      headers, rows,
      tableFn,
      dataSource, dsStyle
    } = config
  , _gridId = `tb_${id}`;
  return (
    <div style={S.ROOT}>
      <ItemHeader
        isOpen={isOpen}
        rootStyle={S.ROOT_HEADER}
        caption={title}
        captionStyle={S.CAPTION}
        onClick={toggleIsOpen}
        onClose={onCloseItem}
      />
      <ShowHide
        isShow={isOpen}
        style={S.SHOW_HIDE}
      >
        <Table
          gridId={_gridId}
          thMoreStyle={thMoreStyle}
          headers={headers}
          rows={rows}
          tableFn={tableFn}
        />
        {dataSource && <div
           style={{...S.DATA_SOURCE, ...dsStyle}}>{dataSource}
         </div>}
      </ShowHide>
    </div>
  );
}

export default TableItem
