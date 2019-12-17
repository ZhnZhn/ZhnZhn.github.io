
const fs = require('fs');

class WriteDllStatsPlugin {
  constructor({
    filePath='./dll/stats.json',
    dllName='lib'
   }={}) {
    this.filePath = filePath
    this.dllName = dllName
  }

  apply(compile){
    compile.hooks.emit.tap('WriteDllStats', compile => {
      try {
       const stats = compile.getStats().toJson();
       fs.writeFileSync(
          this.filePath,
          JSON.stringify({
            [this.dllName]: stats.assetsByChunkName[this.dllName]
          }, null, 4)
        )
      } catch(err){
        console.log(err.message)
      }
    })
  }
}

module.exports = WriteDllStatsPlugin
