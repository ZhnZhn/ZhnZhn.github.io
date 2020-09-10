import crConfigType1 from '../../charts/crConfigType1'
import fnAdapter from './fnAdapter'

const { Builder } = crConfigType1
, {
  crTitle,
  crData,
  crConfigOption
} = fnAdapter
, _assign = Object.assign;

const _setCaptionTo = option => {
  const { title } = option;
  _assign(option, {
    itemCaption: title,
    title: crTitle(option),
    subtitle: title
  })
}

const BlsAdapter = {
  toConfig(json, option){
    _setCaptionTo(option)

    const data = crData(json)
    , confOption = crConfigOption(option);

    return {
      config: crConfigType1({
        option, data, confOption
      })
     };
  },

  toSeries(json, option){
     return Builder.crSeria({
       adapter: BlsAdapter,
       json, option
     });
  }
}

export default BlsAdapter
