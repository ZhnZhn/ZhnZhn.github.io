import C from '../constants/Color';

const _crItem = (
  index,
  color,
  name,
  is=false
) => ({
  index,
  color,
  name,
  isVisible: is
});

export const legendItem = _crItem

export const stockSeriesLegend = () => [
  _crItem(0, C.S_STOCK_CLOSE, 'Close', true),
  _crItem(1, C.S_HIGH, 'High'),
  _crItem(2, C.S_LOW, 'Low'),
  _crItem(3, C.S_OPEN, 'Open')
]
