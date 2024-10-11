export const LT_Q = 'Q'

export const LT_AL = 'AL'
export const LT_FMP = 'FMP'
export const LT_TW = 'TW'
export const LT_DBN = 'DBN'

export const LT_EI = 'EI'
export const LT_EMB = 'EMB'
export const LT_IRE = 'IRE'
export const LT_EN = 'EN'

export const LT_EU_STAT = 'EU_STAT'
export const LT_FS = 'FS'
export const LT_UKS = 'UKS'
export const LT_NST = 'NST'
export const LT_NST_2 = 'NST_2'
export const LT_SWS = 'SWS'
export const LT_SFL = 'SFL'
export const LT_SDN = 'SDN'
export const LT_SIR = 'SIR'
export const LT_FSO = 'FSO'

export const LT_SNB = 'SNB'
export const LT_BOC = 'BOC'
export const LT_ECB = 'ECB'
export const LT_BIS = 'BIS'

export const LT_UN = 'UN'
export const LT_FAO = 'FAO'
export const LT_WB = 'WB'
export const LT_WT = 'WT'
export const LT_BEA = 'BEA'
export const LT_BLS = 'BLS'
export const LT_EIA = 'EIA'
export const LT_INTR = 'INTR'
export const LT_CRC = 'CRC'
export const LT_CG = 'CG'
export const LT_CM = 'CM'
export const LT_CP = 'CP'
export const LT_CL = 'CL'

export const LT_BN = 'BN'
export const LT_CB = 'CB'
export const LT_BF = 'BF'
export const LT_BT = 'BT'
export const LT_CR = 'CR'
export const LT_KR = 'KR'
export const LT_KC = 'KC'
export const LT_GT = 'GT'
export const LT_KX = 'KX'
export const LT_BB = 'BB'
export const LT_HT = 'HT'

export const LT_WL = 'WL'
export const LT_WATCH_LIST = 'WL_WATCH_LIST'

export const isEstat = loadId => loadId === LT_EU_STAT
export const isBis = loadId => loadId === LT_BIS
export const isMonthDelimeterDash = (
  loadId
) => isEstat(loadId)
 || loadId === LT_EMB
 || loadId === LT_EIA
 || loadId === LT_ECB
 || loadId === LT_BIS
