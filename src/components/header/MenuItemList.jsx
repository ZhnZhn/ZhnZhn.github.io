import React, { Component, Fragment } from 'react'

import MenuSubItem from './MenuSubItem'
import MenuItem from './MenuItem'

class MenuItemList extends Component {

  _refFirst = n => this._firstNode = n

  _renderItems = () => {
    const {
           pageNumber,
           model=[],
           CL,
           onClickDynamic, onClickQuandl,
           onClickNext,
           onReg
         } = this.props;
    return model.map((item, index) => {
      const { type, id, title } = item
          , _onReg = index === 0
              ? onReg
              : void 0;
      if (type === 'sub' ) {
        return (
          <MenuSubItem
            key={id}
            CL={CL}
            item={item}
            onClick={onClickNext.bind(null, id, title, pageNumber)}
            onReg={_onReg}
          />
        );
      }
      return (
        <MenuItem
           key={id}
           CL={CL}
           item={item}
           onClickDynamic={onClickDynamic}
           onClickQuandl={onClickQuandl}
        />
      );
    })
  }

  render(){
    return (
      <Fragment>
        {this._renderItems()}
      </Fragment>
    );
  }

}

export default MenuItemList
