import {
  renderHook,
  act
} from '@testing-library/react';
import useSelectItem from '../useSelectItem';

const _getRefItems = result => result.current[0]
, _getSelectItem = result => result.current[1]
, _getTupleFilter = result => result.current[2];

describe("useSelectItem", ()=>{
  test("should return tuple with refItems, hSelect, tupleFilter", ()=>{
    const setChartConfigFromItem = jest.fn()
    , {
      result
    } = renderHook(() => useSelectItem(setChartConfigFromItem));

    const _refItems = _getRefItems(result)
    , _hSelect = _getSelectItem(result)
    , _tupleFilter = _getTupleFilter(result)
    expect(_refItems.current).toEqual([])
    expect(typeof _hSelect).toBe("function")
    expect(_tupleFilter).toEqual([])

    // set input1 to _items1
    const id1 = "id1"
    , _filters1 = ["A"]
    , _item1 = { c: "A", v: "a", not: _filters1 };
    act(() => _hSelect(id1, 0, _item1))
    expect(_getRefItems(result).current).toEqual([{..._item1, id: id1}])
    expect(_getTupleFilter(result)).toEqual([id1, _filters1])

    //clear input1
    act(() => _hSelect(id1, 0, void 0))
    expect(_getRefItems(result).current).toEqual([void 0])
    expect(_getTupleFilter(result)).toEqual([])

    // set input1 to _items2
    const _filters2 = ["B"]
    , _item2 = { c: "A", v: "a", not: _filters2 };
    act(() => _hSelect(id1, 0, _item2))
    expect(_getRefItems(result).current).toEqual([{..._item2, id: id1}])
    expect(_getTupleFilter(result)).toEqual([id1, _filters2])

    // set input1 to _item1
    act(() => _hSelect(id1, 0, _item1))
    expect(_getRefItems(result).current).toEqual([{..._item1, id: id1}])
    expect(_getTupleFilter(result)).toEqual([id1, _filters1])

    //clear input1
    act(() => _hSelect(id1, 0, void 0))
    expect(_getRefItems(result).current).toEqual([void 0])
    expect(_getTupleFilter(result)).toEqual([])

    //clear input1
    act(() => _hSelect(id1, 0, void 0))
    expect(_getRefItems(result).current).toEqual([void 0])
    expect(_getTupleFilter(result)).toEqual([])

    // set input2 to _itemTable
    const TABLE_ID = "table"
    , _itemTable = { c: "Table", v: "t"};
    act(() => _hSelect(TABLE_ID, 1, _itemTable))
    expect(_getRefItems(result).current).toEqual([void 0, {..._itemTable, id: TABLE_ID}])
    expect(_getTupleFilter(result)).toEqual([])

    expect(setChartConfigFromItem).toBeCalledTimes(1)
    expect(setChartConfigFromItem).toBeCalledWith({..._itemTable, id: TABLE_ID})

    //clear input2
    act(() => _hSelect(TABLE_ID, 1, void 0))
    expect(_getRefItems(result).current).toEqual([void 0, void 0])
    expect(_getTupleFilter(result)).toEqual([])

    expect(setChartConfigFromItem).toBeCalledTimes(1)
  })
})
