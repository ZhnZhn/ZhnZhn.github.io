
const zhToggleSeria = function(index) {
  try {
    const seria = this.series[index];
    if (seria) {
      if (seria.visible){
        seria.hide()
      } else {
        seria.show()
      }
    }
  } catch(err) {
    console.log(err.message)
  }
};

export default zhToggleSeria
