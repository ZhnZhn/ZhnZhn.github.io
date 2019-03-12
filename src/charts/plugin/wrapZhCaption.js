
const S = {
  TEXT: {
    color: 'black',
    'font-size': '16px',
    'font-weight': 800
  },
  INLINE: {
    display: 'inline'
  },
  NONE: {
    display: 'none'
  }
};

const C = {
  HIDE: {
    chart: {
      spacingTop: 0,
      marginTop: 18
    },
    exporting: { enabled: false },
    subtitle: { style: { display: 'none'}},
    title: { style: { display: 'none'}}
  },
  SHOW: {
    chart: {
      spacingTop: 25,
      marginTop: 70
    },
    exporting: { enabled: true },
    subtitle: { style: { display: 'inline-block'}},
    title: { style: { display: 'inline-block'}}
  }
};

const PN = {
  TITLE: 'zhElTitle',
  SUBTITLE: 'zhElSubtitle'
};

const _renderTextTo = (chart, objText, x, y, propName) => {
  const _el = chart[propName];
  if (_el && _el.css) {
    _el.css({...S.INLINE})
    return;
  }
  const { text } = objText || {};
  if (text) {
    chart[propName] = chart.renderer.text(text, x, y)
      .css({...S.TEXT})
      .add()
  }
};
const _hideEl = (chart, propName) => {
  const _el = chart[propName];
  if (_el && _el.css) {
    _el.css({...S.NONE})
  }
};

const wrapZhCaption = (wrap, Chart) => {
  wrap(Chart.prototype, 'zhHideCaption', function(){
    try{
      const _height = this.chartHeight - 40;
      this.update(C.HIDE, false)
      this.setSize(null, _height, true)

      const _ = this.options
      _renderTextTo(this, _.title, 40, 70, PN.TITLE)
      _renderTextTo(this, _.subtitle, 40, 90, PN.SUBTITLE)
    }catch(err) {
      console.log(err.msg)
    }
  })

  wrap(Chart.prototype, 'zhShowCaption', function(){
    try{
      const _height = this.chartHeight + 40;
      this.update(C.SHOW, false)
      this.setSize(null, _height, true)

      _hideEl(this, PN.TITLE)
      _hideEl(this, PN.SUBTITLE)
    }catch(err){
      console.log(err.msg)
    }
  })
};

export default wrapZhCaption
