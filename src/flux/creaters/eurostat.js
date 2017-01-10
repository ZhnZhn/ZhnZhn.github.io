
const createLoadOptions = (props={}, options={}) => {
  const { loadId, group } = props
      , { one, two } = options
      , { value:oneValue, caption:oneCaption='' } = one
      , { value:twoValue, caption:twoCaption='' } = two
  return {
    geo : oneValue,
    group : group,
    metric : twoValue,
    loadId : loadId,
    itemCaption: oneCaption,
    title : oneCaption,
    subtitle : twoCaption,
    alertItemId : `${oneCaption}:${twoCaption}`,
    alertGeo : oneCaption,
    alertMetric : twoCaption
  }
}

export default createLoadOptions
