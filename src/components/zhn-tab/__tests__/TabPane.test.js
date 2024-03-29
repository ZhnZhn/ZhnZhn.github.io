/**
 * @jest-environment jsdom
 */
"use strict";
import '@testing-library/jest-dom';
import zhnUtils from '../../_test-utils/zhn-test-utils';
import TabPane from '../TabPane';
import Tab from '../Tab';

import {
  CL_TAB,
  CL_TAB_SELECTED
} from '../tabPaneFn';

const {
  screen,
  setupUserEvent
} = zhnUtils;

const SELECTED_STYLE = "font-weight: bold";

const Comp = ({
  text,
  isVisible
}) => {
  const style = isVisible
    ? { fontWeight: 'bold '}
    : void 0;
  return (
    <div style={style}>{text}</div>
  );
};


const _getTabs = (screen) => [
  screen.getByText("Tab1"),
  screen.getByText("Tab2")
];

const _getComps = (screen) => [
  screen.getByText("Comp1"),
  screen.getByText("Comp2")
];


describe('TabPane', ()=>{
  test('should render TabPane and show-hide Comps by clicking on Tabs', async ()=>{
    const { user } = setupUserEvent((
      <TabPane>
        <Tab title="Tab1">
          <Comp text="Comp1" />
        </Tab>
        <Tab title="Tab2">
          <Comp text="Comp2" />
        </Tab>
      </TabPane>
    ))
    let tab1, tab2, comp1, comp2;

    [tab1, tab2] = _getTabs(screen);
    [comp1, comp2] = _getComps(screen)
    expect(tab1).toHaveClass(CL_TAB_SELECTED)
    expect(comp1).toBeVisible()
    expect(comp1).toHaveStyle(SELECTED_STYLE)
    expect(tab2).toHaveClass(CL_TAB)
    expect(comp2).not.toBeVisible()
    expect(comp2).not.toHaveStyle(SELECTED_STYLE)


    //fireClick(screen.getByText("Tab2"));
    await user.click(screen.getByText("Tab2"));
    [tab1, tab2] = _getTabs(screen);
    [comp1, comp2] = _getComps(screen);
    expect(tab1).toHaveClass(CL_TAB)
    expect(comp1).not.toBeVisible()
    expect(comp1).not.toHaveStyle(SELECTED_STYLE)
    expect(tab2).toHaveClass(CL_TAB_SELECTED)
    expect(comp2).toBeVisible()
    expect(comp2).toHaveStyle(SELECTED_STYLE)

    //fireClick(screen.getByText("Tab1"));
    await user.click(screen.getByText("Tab1"));
    [tab1, tab2] = _getTabs(screen);
    [comp1, comp2] = _getComps(screen)
    expect(tab1).toHaveClass(CL_TAB_SELECTED)
    expect(comp1).toBeVisible()
    expect(comp1).toHaveStyle(SELECTED_STYLE)
    expect(tab2).toHaveClass(CL_TAB)
    expect(comp2).not.toBeVisible()
    expect(comp2).not.toHaveStyle(SELECTED_STYLE)
  })
})
