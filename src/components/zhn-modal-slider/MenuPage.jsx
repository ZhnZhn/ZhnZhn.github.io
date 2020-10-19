import { Component, createRef } from 'react'

import MenuTitle from './MenuTitle'
import MenuItemList from './MenuItemList'

const _fFocus = ref => () => {
  if (ref && ref.current) {
    ref.current.focus()
  }
}

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

  _refTitle = createRef()
  _refFirst = createRef()

  componentDidMount(){
    this._focus()
  }

  _hClickTitle = () => {
    const {pageNumber, onPrevPage } = this.props
    onPrevPage(pageNumber)
  }

  render(){
    const {
       style,
       title,
       items,
       titleCl, itemCl,
       pageNumber,
       onNextPage,
       onClose,
       children
     } = this.props;
    return(
      <div style={style}>
        <MenuTitle
          ref={this._refTitle}
          titleCl={titleCl}
          title={title}
          onClick={this._hClickTitle}
        />
        <MenuItemList
          ref={this._refFirst}
          items={items}
          itemCl={itemCl || titleCl}
          pageNumber={pageNumber}
          onNextPage={onNextPage}
          onClose={onClose}
        />
        {children}
      </div>
    );
  }

  _focus = () => {
    const { pageCurrent, pageNumber } = this.props;
    if (pageCurrent === pageNumber){
      if (this._refTitle.current) {
         setTimeout(_fFocus(this._refTitle), 1000)
      } else if (this._refFirst.current) {
         setTimeout(_fFocus(this._refFirst), 1000)
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
