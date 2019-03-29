const PN_ID = 'zhIs2H';

const zhToggle2H = (Chart) => {
  Chart.prototype.zhToggle2H = function(){
    try {
     const _height = this[PN_ID]
       ? this.chartHeight/2
       : this.chartHeight*2;      
     this.setSize(undefined, _height, true)
     this[PN_ID] = !this[PN_ID]
    } catch(err){
      console.log(err.message)
    }
  }
};

export default zhToggle2H
