/**
 * @jest-environment jsdom
 */
"use strict";
import renderer from 'react-test-renderer'
import FlatButton from '../FlatButton'

const _crDfProps = (option) => ({
  isPrimary: true,
  caption: "Load",
  title: "Click to load",
  hotKey: "l",
  onClick: jest.fn(),
  ...option
});

describe('FlatButton Snap', () => {
  test('should renders correctly with isPrimary true', () => {
    const tree = renderer
      .create((
        <FlatButton
          {..._crDfProps({ isPrimary: true })}
        />
      ))
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('should renders correctly with isPrimary false', () => {
    const tree = renderer
      .create((
        <FlatButton
          {..._crDfProps({ isPrimary: false })}
        />
      ))
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

});
