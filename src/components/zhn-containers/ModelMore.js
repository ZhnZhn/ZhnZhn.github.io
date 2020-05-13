const CL_ROW = 'row__pane-topic not-selected';

const _crSubItem = (id, name) => ({
  type: 'sub',
  id, name
  //cn
});

const _crItem = (name, onClick, isClose=true) => ({
  name, onClick, isClose
  //cn
});

const P0 = [
  _crSubItem('p1', 'Items'),
  _crSubItem('p2', 'Sort By, ASC'),
  _crSubItem('p3', 'Resize')
];

const crModelMore = ({
  onMinWidth, onInitWidth,
  onPlusWidth, onMinusWidth,
  onFit,
  onShowCaptions,
  onRemoveAll,
  onSortBy,
  isAdminMode,
  onCompareTo
}) => {
  const p1 = [
    _crItem('Remove All', onRemoveAll),
    _crItem('Show Caption', onShowCaptions, false)
  ];
  if (isAdminMode) {
    p1.push(_crItem('CompareTo', onCompareTo))
  }
  return {
    baseTitleCl: CL_ROW,
    pageWidth: 180,
    maxPages: 2,
    p0: P0,
    p1: p1,
    p2: [
      _crItem('Value', onSortBy.bind(null, '_value')),
      _crItem('Percent', onSortBy.bind(null, '_percentAbs')),
      _crItem('Delta', onSortBy.bind(null, '_deltaAbs')),
      _crItem('Reverse', onSortBy)
    ],
    p3: [
      _crItem('to MinWidth', onMinWidth, false),
      _crItem('to InitialWidth', onInitWidth, false),
      _crItem('+10px to Width', onPlusWidth, false),
      _crItem('-10px to Width', onMinusWidth, false),
      _crItem('Fit Items to Width', onFit, false)
    ]
  };
}

export default crModelMore
