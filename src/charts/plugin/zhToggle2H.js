const PN_ID = 'zhIs2H';

const zhToggle2H = function(){
  try {
    const _height = this[PN_ID]
      ? this.chartHeight/2
      : this.chartHeight*2;
    this.setSize(undefined, _height, this.zhIsAnimation())
    this[PN_ID] = !this[PN_ID]
  } catch(err){
    console.log(err.message)
  }
};

export default zhToggle2H
