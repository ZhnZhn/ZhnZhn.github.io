import React, { Component } from 'react'

import ShowHide from '../zhn/ShowHide';
import Table from '../zhn-table/Table'
import ItemHeader from './ItemHeader'

const S = {
  ROOT: {
    paddingBottom: '8px'
  },
  SHOW_HIDE: {
    paddingTop: '8px',
    paddingBottom: '8px'
  }
};

class CoinCapItem extends Component {
  constructor(){
    super()
    this.state = {
      isOpen: true
    }
  }

  _hToggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const { config, onCloseItem } = this.props
        , { id, title, headers, rows, tableFn } = config
        , _gridId = `coins_${id}`
        , { isOpen } = this.state;    
    return (
      <div style={S.ROOT}>
        <ItemHeader
          isOpen={isOpen}
          caption={title}
          onClick={this._hToggle}
          onClose={onCloseItem}
        />
        <ShowHide
          isShow={isOpen}
          style={S.SHOW_HIDE}
        >
          <Table
            gridId={_gridId}
            headers={headers}
            rows={rows}
            tableFn={tableFn}
          />
        </ShowHide>
      </div>
    );
  }

}

export default CoinCapItem
