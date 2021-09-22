/**
 * @jest-environment jsdom
 */
"use strict";
import '@testing-library/jest-dom';
import zhnUtils from '../../_test-utils/zhn-test-utils';
import TabPane from '../TabPane';
import Tab from '../Tab';

const {
  createRef,
  render,
  screen,
  fireClick,
} = zhnUtils;

const SELECTED_STYLE = "font-weight: bold";

const Comp = ({ text, isSelected }) => {
  const style = isSelected ? { fontWeight: 'bold '} : void 0
  return <div style={style}>{text}</div>;
};

const _getComps = (screen) => [
  screen.getByText("Comp1"),
  screen.getByText("Comp2")
];


describe('TabPane', ()=>{
  test('should render TabPane and show-hide Comps by clicking on Tabs', ()=>{
    const refTabPane = createRef()
    render(
      <TabPane ref={refTabPane}>
        <Tab title="Tab1">
          <Comp text="Comp1" />
        </Tab>
        <Tab title="Tab2">
          <Comp text="Comp2" />
        </Tab>
      </TabPane>
    )
    let comp1, comp2;

    [comp1, comp2] = _getComps(screen)
    expect(comp1).toBeVisible()
    expect(comp1).toHaveStyle(SELECTED_STYLE)
    expect(comp2).not.toBeVisible()
    expect(comp2).not.toHaveStyle(SELECTED_STYLE)
    expect(refTabPane.current.getSelectedTabIndex()).toBe(0)

    fireClick(screen.getByText("Tab2"));
    [comp1, comp2] = _getComps(screen)
    expect(comp1).not.toBeVisible()
    expect(comp1).not.toHaveStyle(SELECTED_STYLE)
    expect(comp2).toBeVisible()
    expect(comp2).toHaveStyle(SELECTED_STYLE)
    expect(refTabPane.current.getSelectedTabIndex()).toBe(1)

    fireClick(screen.getByText("Tab1"));
    [comp1, comp2] = _getComps(screen)
    expect(comp1).toBeVisible()
    expect(comp1).toHaveStyle(SELECTED_STYLE)
    expect(comp2).not.toBeVisible()
    expect(comp2).not.toHaveStyle(SELECTED_STYLE)
    expect(refTabPane.current.getSelectedTabIndex()).toBe(0)
  })
})
