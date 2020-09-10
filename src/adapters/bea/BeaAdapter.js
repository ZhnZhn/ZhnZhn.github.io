import crConfigType1 from '../../charts/crConfigType1';
import fnAdapter from './fnAdapter';

const { Builder } = crConfigType1
, {
  crData,
  crConfigOption
} = fnAdapter
, _assign = Object.assign;

const _setCaptionTo = option => {
  const { title, dfTitle } = option;
  _assign(option, {
    itemCaption: title,
    title: dfTitle,
    subtitle: title
  })
};

const BeaAdapter = {
  toConfig(json, option){
    _setCaptionTo(option)
    const Results = json.BEAAPI.Results
    , data = crData(Results, option)
    , confOption = crConfigOption(Results, option);

    return {
      config: crConfigType1({
        option, data, confOption
      })
    };
  },

  toSeries(json, option){
     return Builder.crSeria({
       adapter: BeaAdapter,
       json, option
     })
  }

}

export default BeaAdapter
