import {
  COLOR_S_STOCK_CLOSE,
  COLOR_S_HIGH,
  COLOR_S_LOW,
  COLOR_S_OPEN
} from '../constants/Color';

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
  _crItem(0, COLOR_S_STOCK_CLOSE, 'Close', true),
  _crItem(1, COLOR_S_HIGH, 'High'),
  _crItem(2, COLOR_S_LOW, 'Low'),
  _crItem(3, COLOR_S_OPEN, 'Open')
]
