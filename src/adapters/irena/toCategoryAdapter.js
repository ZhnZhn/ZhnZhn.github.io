import crAdapterCategory from '../crAdapterCategory';

const _crData = (
  json
) => json.data.map(arrP => ({
  y: arrP[1],
  name: arrP[0],
  c: arrP[0]
}))
, toCategoryAdapter = crAdapterCategory(_crData)

export default toCategoryAdapter
