import React, { Component } from 'react'

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

class TableItem extends Component {
  state = {
    isOpen: true
  }

  _hToggle = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }))
  }

  render() {
    const { thMoreStyle, config, onCloseItem } = this.props
    , {
        id, title, headers, rows, tableFn,
        dataSource, dsStyle
      } = config
    , _gridId = `tb_${id}`
    , { isOpen } = this.state;
    return (
      <div style={S.ROOT}>
        <ItemHeader
          isOpen={isOpen}
          rootStyle={S.ROOT_HEADER}
          caption={title}
          captionStyle={S.CAPTION}
          onClick={this._hToggle}
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
             style={{...S.DATA_SOURCE, ...dsStyle }}>{dataSource}
           </div>}
        </ShowHide>
      </div>
    );
  }

}

export default TableItem
