import React, { Component } from 'react'

import MenuTitle from './MenuTitle'
import MenuItemList from './MenuItemList'

class MenuPage extends Component {

  componentDidMount(){
    this._focus()
  }

  _onRegTitle = (n) => this._titleNode = n
  _onRegFirst = (n) => this._firstNode = n

  render(){
    const {
           style, title, CL, pageNumber, onClickPrev,
           children,
           ...rest
           //model, onClickDynamic, onClickQuandl, onClickNext
         } = this.props
    , _onClick = onClickPrev
         ? onClickPrev.bind(null, pageNumber)
         : void 0;
    return (
      <div style={style}>
        <MenuTitle
          title={title}
          CL={CL}
          onClick={_onClick}
          onReg={this._onRegTitle}
        />
        <MenuItemList
          pageNumber={pageNumber}
          CL={CL}
          {...rest}

          //model={model}
          //onClickDynamic={onClickDynamic}
          //onClickQuandl={onClickQuandl}
          //onClickNext={onClickNext}

          onReg={this._onRegFirst}
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
