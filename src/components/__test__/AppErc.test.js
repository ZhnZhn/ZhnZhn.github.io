import React from 'react'
import ReactDOM from 'react-dom'
import AppErc from '../AppErc'

describe('AppErc', ()=>{
  test.skip('should render without crashing', ()=>{
    const divNode = document.createElement('div');
    ReactDOM.render(<AppErc />, divNode)
    ReactDOM.unmountComponentAtNode(divNode)
  })
})
