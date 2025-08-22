import { bindTo } from '../uiApi';
import {
  crSubItem,
  crItem,
  crSliderMenu
} from '../menuModelFn';

const P0 = [
  crSubItem('p1', 'Items'),
  crSubItem('p2', 'Sort By, ASC'),
  crSubItem('p3', 'Resize')
];

const crModelMore = (isAdminMode, {
  onMinWidth,
  onInitWidth,
  onPlusWidth,
  onMinusWidth,
  onFit,
  onShowCaptions,
  onRemoveAll,
  onSortBy,
  onCompareTo
}) => {
  const p1 = [
    crItem('Remove All', onRemoveAll),
    crItem('Show Caption', onShowCaptions, !1)
  ];
  if (isAdminMode) {
    p1.push(crItem('CompareTo', onCompareTo))
  }
  return crSliderMenu(
    170, {
      p0: P0,
      p1: p1,
      p2: [
        crItem('Value', bindTo(onSortBy, '_value')),
        crItem('Percent', bindTo(onSortBy, '_percentAbs')),
        crItem('Delta', bindTo(onSortBy, '_deltaAbs')),
        crItem('Reverse', onSortBy)
      ],
      p3: [
        crItem('to MinWidth', onMinWidth, !1),
        crItem('to InitialWidth', onInitWidth, !1),
        crItem('+10px to Width', onPlusWidth, !1),
        crItem('-10px to Width', onMinusWidth, !1),
        crItem('Fit Items to Width', onFit, !1)
      ]
    },
    2
  )
};

export default crModelMore
