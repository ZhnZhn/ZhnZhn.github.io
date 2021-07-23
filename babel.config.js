module.exports = {
  presets: [
    ['@babel/preset-env', { 
       loose: true,
       useBuiltIns: "entry",
       corejs: "3",      
       targets: {
         browsers: [
            ">0.25%", 
            "not ie 11", 
            "not op_mini all", 
            "not dead"
         ] 
       } 
    }],
    ['@babel/preset-react', { runtime: "automatic" }]
  ],
  plugins: [
    ['@babel/plugin-transform-runtime'],    
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }]
  ]
};