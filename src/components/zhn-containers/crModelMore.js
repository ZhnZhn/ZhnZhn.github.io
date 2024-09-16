import { bindTo } from '../uiApi';
import { CL_ROW_PANE_TOPIC } from '../styleFn';
import {
  crSubItem,
  crItem
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
    crItem('Show Caption', onShowCaptions, false)
  ];
  if (isAdminMode) {
    p1.push(crItem('CompareTo', onCompareTo))
  }
  return {
    titleCl: CL_ROW_PANE_TOPIC,
    pageWidth: 180,
    maxPages: 2,
    p0: P0,
    p1: p1,
    p2: [
      crItem('Value', bindTo(onSortBy, '_value')),
      crItem('Percent', bindTo(onSortBy, '_percentAbs')),
      crItem('Delta', bindTo(onSortBy, '_deltaAbs')),
      crItem('Reverse', onSortBy)
    ],
    p3: [
      crItem('to MinWidth', onMinWidth, false),
      crItem('to InitialWidth', onInitWidth, false),
      crItem('+10px to Width', onPlusWidth, false),
      crItem('-10px to Width', onMinusWidth, false),
      crItem('Fit Items to Width', onFit, false)
    ]
  };
};

export default crModelMore
