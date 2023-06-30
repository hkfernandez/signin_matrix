{
  //use the default setting which is stage 4
  "presets": ["@babel/preset-env"],
  "plugins": [
      [
          //add support for classes
          "@babel/plugin-proposal-class-properties",
          {
              "loose": true
          }
      ],
      //add support for private methods
      ["@babel/plugin-proposal-private-methods", { "loose": true }]
  ]
}
