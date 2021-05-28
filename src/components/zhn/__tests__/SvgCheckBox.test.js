import '@testing-library/jest-dom';
import { render, screen, act } from '@testing-library/react';

import SvgCheckBox from '../SvgCheckBox';
import fireEventHelpers from './_fireEventHelpers';

const {
  fireClick,
  fireKeyDownEnter
} = fireEventHelpers;

const _crTestArtifacts = (onCheck, onUnCheck) => {
  const chb = screen.getByRole('checkbox')
  , _testStyledFalseTimes = (times=0) => {
      expect(chb).toHaveAttribute('aria-checked', "false")
      expect(onUnCheck).toHaveBeenCalledTimes(times)
  }
  , _testStyledTrueTimes = (times=0) => {
      expect(chb).toHaveAttribute('aria-checked', "true")
      expect(onCheck).toHaveBeenCalledTimes(times)
  };

  return { chb, _testStyledFalseTimes, _testStyledTrueTimes };
};

describe('SvgCheckBox',()=>{
  test('should render SvgCheckBox with initialValue and handlers',()=>{
    const initialValue = false
    , checkedColor = '#222222'
    , onCheck = jest.fn()
    , onUnCheck = jest.fn()
    , props = { initialValue, checkedColor, onCheck, onUnCheck }
    , { rerender } = render(<SvgCheckBox {...props} />)
    , {
        chb, _testStyledFalseTimes, _testStyledTrueTimes
      } = _crTestArtifacts(onCheck, onUnCheck);

    //1 Test initialValue
    _testStyledFalseTimes(0)

    //2 Click on checkbox
    //2.1 From false
    fireClick(chb)
    _testStyledTrueTimes(1)
    //2.2 From true
    fireClick(chb)
    _testStyledFalseTimes(1)

    //3 KeyDown on checkbox
    //3.1 keyDown Enter from false
    fireKeyDownEnter(chb)
    _testStyledTrueTimes(2)
    //3.2 keyDown Enter from true
    fireKeyDownEnter(chb)
    _testStyledFalseTimes(2)

    //4 Handler args component interface
    //4.1 Same componet interface object
    expect(onCheck.mock.calls[0][0])
      .toBe(onUnCheck.mock.calls[1][0])
    expect(onCheck.mock.calls[1][0])
      .toBe(onUnCheck.mock.calls[1][0])
    //4.2 Handler setUnchecked
    fireClick(chb)
    _testStyledTrueTimes(3)
    act(() => {
      onCheck.mock.calls[2][0].setUnchecked()
    })
    _testStyledFalseTimes(2)

    //5 Rerender with new initialValue
    rerender(<SvgCheckBox {...props} initialValue={true} />)
    _testStyledFalseTimes(2)
  })

  test('should use property booolean value and handlers', ()=>{
    const value = false
    , initValue = true
    , checkedColor = '#222222'
    , onCheck = jest.fn()
    , onUnCheck = jest.fn()
    , props = { value, initValue, checkedColor, onCheck, onUnCheck }
    , { rerender } = render(<SvgCheckBox {...props} />)
    , {
        chb, _testStyledFalseTimes, _testStyledTrueTimes
      } = _crTestArtifacts(onCheck, onUnCheck);

    //1 First render with value false
    _testStyledFalseTimes(0)
    //2 Rerender with value true
    rerender(<SvgCheckBox {...props} value={!value} />)
    _testStyledTrueTimes(0)

    //3 Click on checkbox
    //3.1 From true
    fireClick(chb)
    _testStyledTrueTimes(0)
    expect(onUnCheck).toHaveBeenCalledTimes(1)
    //3.2 From false
    rerender(<SvgCheckBox {...props} value={false}/>)
    fireClick(chb)
    _testStyledFalseTimes(1)
    expect(onCheck).toHaveBeenCalledTimes(1)

  })
  test('should call preventDefault on event handlers',()=>{
    render(<SvgCheckBox />)
    const chb = screen.getByRole('checkbox');

    //In case preventDefault called fireEvent return false
    expect(fireClick(chb)).toBe(false)
    expect(fireKeyDownEnter(chb)).toBe(false)
  })
})
