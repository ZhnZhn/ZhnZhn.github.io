/**
 * @jest-environment jsdom
 */
"use strict";
import renderer from 'react-test-renderer'
import FlatButton from '../FlatButton'

const _crProps = (option) => ({
  caption: "Load",
  title: "Click to load",
  hotKey: "l",
  onClick: jest.fn(),
  ...option
});

describe('FlatButton Snap', () => {
  test('should renders correctly', () => {
    const tree = renderer
      .create((
        <FlatButton
          {..._crProps()}
        />
      ))
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('should renders correctly without title', () => {
    const tree = renderer
      .create((
        <FlatButton
          {..._crProps({ title: void 0 })}
        />
      ))
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

});
