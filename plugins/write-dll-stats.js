
const fs = require('fs')

function WriteDllStats(option={}) {
   const {
           filePath='./dll/stats.json',
           dllName='lib'
         } = option;
  this.filePath = filePath
  this.dllName = dllName
}

WriteDllStats.prototype.apply = function(compile){
  const self = this;
  compile.plugin('emit', function(compile, cb){
    //console.log(stats.assetsByChunkName.lib)
    try {
     const stats = compile.getStats().toJson();
     const dllName = self.dllName;
     fs.writeFileSync(
        self.filePath,
        JSON.stringify({
          [dllName]: stats.assetsByChunkName[dllName]
        }, null, 4)
      )
    } catch(err){
      console.log(err.message)
    } finally {
      cb();
    }
  })

}

module.exports = WriteDllStats
