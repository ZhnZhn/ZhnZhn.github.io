module.exports = {  
  presets: [
    ['@babel/preset-env', { 
       loose: true,
       useBuiltIns: "entry",
       corejs: "3",
       //debug: true,      
       targets: {
         browsers: [
            ">0.25%", 
            /* support arrow-functions */
            "not ie 11", 
            "not op_mini all", 
            "not android 4.4.3-4.4.4", 
            "not dead"
         ] 
       },
       exclude: []      
    }],
    ['@babel/preset-react', { runtime: "automatic" }]
  ],
  plugins: [
    ['@babel/plugin-transform-runtime'],    
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }]
  ]
};