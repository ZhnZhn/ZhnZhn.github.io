export const CHT_AREA = 'AREA'
, CHT_SPLINE = 'SPLINE'
, CHT_LINE = 'LINE'
, CHT_COLUMN = 'COLUMN'

const _crClusterType = chartType => `${chartType}_CLUSTER`
, _crSetType = chartType => `${chartType}_SET`;

export const CHT_BAR = "BAR"
, CHT_BAR_CLUSTER = _crClusterType(CHT_BAR)
, CHT_BAR_SET = _crSetType(CHT_BAR)
, CHT_BAR_WITH_LABELS = `${CHT_BAR}_WITH_LABELS`
, CHT_COLUMN_SET = _crSetType(CHT_COLUMN)
, CHT_COLUMN_CLUSTER = _crClusterType(CHT_COLUMN)
, CHT_TREE_MAP = "TREE_MAP"
, CHT_TREE_MAP_CLUSTER = _crClusterType(CHT_TREE_MAP)
, CHT_TREE_MAP_2 = `${CHT_TREE_MAP}_2`
, CHT_TREE_MAP_2_CLUSTER = _crClusterType(CHT_TREE_MAP_2)
, CHT_BAR_TREE_MAP = `BAR_${CHT_TREE_MAP}`

export const CHT_MAP = 'MAP'
, CHT_DOT_SET = 'DOT_SET'

export const CHT_YEARLY = 'YEARLY'
export const CHT_AREA_YEARLY = 'AREA_YEARLY'

export const CHT_SCATTER = 'SCATTER'
export const CHT_SCATTER_UP = 'SCATTER_UP'
export const CHT_SCATTER_DOWN = 'SCATTER_DOWN'
