
export const crLegendItem = ({
  index,
  color,
  name='',
  is=false
}) => ({
  index,
  color,
  name,
  isVisible: is
});

export const addSeriesImpl = (
  to,
  series
) => {
  const _legend = [];
  series.forEach((seria, index) => {
    const {
      color,
      zhValueText,
      name,
      visible
    } = seria;
    to.push(seria)
    _legend.push(crLegendItem({      
       index,
       color,
       name: zhValueText || name,
       is: visible
     }))
  })
  return _legend;
}
