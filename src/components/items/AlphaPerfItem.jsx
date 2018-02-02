import React, { Component, Fragment } from 'react'

import TableItem from './TableItem'

const S = {
  TH_MORE: {
    textAlign: 'left',
    paddingLeft: '12px'
  }
};

class AlphaPerfItem extends Component {
  render(){
    const { config, onCloseItem } = this.props;
    return (
      <Fragment>
        <TableItem
          thMoreStyle={S.TH_MORE}
          config={config.m}
          onCloseItem={onCloseItem}
        />
        <TableItem
          thMoreStyle={S.TH_MORE}
          config={config.y}
          onCloseItem={onCloseItem}
        />
      </Fragment>
    );
  }
}

export default AlphaPerfItem
