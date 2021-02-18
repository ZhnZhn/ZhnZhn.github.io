import fCategoryCalc from './fCategoryCalc'
import roc from './roc'

const _calc = (p1, p2) => roc((p2 || {}).y, p1.y)
, categoryRoc = fCategoryCalc(_calc);

export default categoryRoc
