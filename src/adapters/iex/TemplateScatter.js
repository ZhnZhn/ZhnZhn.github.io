import pipe from '../../utils/pipe';
import {
  crAreaConfig,
  fAddCaption,
  fSetSeriaBy,
  fAdd,
  toConfig
} from '../../charts/configBuilderFn';

import fns from './toFns';

const TITLE = "Source: IEX Cloud";

const TemplateScatter = function(impl) {
  if (!(this instanceof TemplateScatter)) {
    return (new TemplateScatter(impl));
  }
  this.impl = impl
};

Object.assign(TemplateScatter.prototype, {
  crKey(option){
    option.key = option.value
    return option.value;
  },

  toConfig(json, option){
    const {
      crSubtitle,
      crSeria
    } = this.impl;
    return {
      config: pipe(
        crAreaConfig({ isCrosshair: false }),
        fAddCaption(TITLE, crSubtitle(option)),
        fSetSeriaBy(0, crSeria(json, option)),
        fAdd({ zhConfig: fns.crZhConfig(option) }),
        toConfig
      )
    };
  },

  toSeries(json, option, chart){
    const {
      caption,
      color,
      crSeria
    } = this.impl
    , seria = crSeria(json, option);
    return fns.crToSeria({
      chart,
      seria,
      caption,
      color,
      option
    });
  }
});

export default TemplateScatter
