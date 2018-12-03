import React, { Component } from 'react'

import MenuTitle from './MenuTitle'
import MenuItemList from './MenuItemList'

class MenuPage extends Component {
  /*
  static propTypes = {
    title: PropTypes.string,
    pageNumber: PropTypes.number,
    items: PropTypes.arrayOf(
       PropTypes.shapeOf({
          name: PropTypes.string,
          type: PropTypes.string,
          id: PropTypes.string,
          onClick: PropTypes.func
       })
    ),
    onNextPage: PropTypes.func,
    onPrevPage: PropTypes.func,
    onClose: PropTypes.func
  }
  */

  static defaultProps = {
    items: []
  }

  componentDidMount(){
    this._focus()
  }

  _onRegTitle = (n) => this._titleNode = n
  _onRegFirst = (n) => this._firstNode = n

  render(){
    const {
       style,
       title,
       items,
       baseTitleCl, itemCl,
       pageNumber,
       onNextPage, onPrevPage,
       onClose,
       children
     } = this.props;
    return(
      <div style={style}>
        <MenuTitle
          baseTitleCl={baseTitleCl}
          title={title}
          pageNumber={pageNumber}
          onPrevPage={onPrevPage}
          onReg={this._onRegTitle}
        />
        <MenuItemList
          items={items}
          itemCl={itemCl || baseTitleCl}
          pageNumber={pageNumber}
          onNextPage={onNextPage}
          onReg={this._onRegFirst}
          onClose={onClose}
        />
        {children}
      </div>
    );
  }

  _focusTitle = () => this._titleNode.focus()
  _focusFirst = () => this._firstNode.focus()

  _focus = () => {
    const { pageCurrent, pageNumber } = this.props;
    if (pageCurrent === pageNumber){
      if (this._titleNode) {
         setTimeout(this._focusTitle, 1000)
      } else if (this._firstNode) {
         setTimeout(this._focusFirst, 1000)
      }
    }
 }

  componentDidUpdate(prevProps){
    if (this.props !== prevProps) {
      this._focus()
    }
  }
}

export default MenuPage
