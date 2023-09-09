const fs = require('fs')
const path = require('path')
const withLess = require('next-plugin-antd-less')
const lessToJS = require('less-vars-to-js')
const withPlugins = require('next-compose-plugins')

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './assets/variables.less'), 'utf8')
)
if (typeof require !== 'undefined') {
  require.extensions['.less'] = (file) => file
}

const plugins = []

module.exports = withPlugins([...plugins], {
  ...withLess({
    // optional theme Variables
    modifyVars: themeVariables,
    // optional theme path
    lessVarsFilePath: './assets/ant-custom.less',
    // optional
    lessVarsFilePathAppendToEndOfContent: false,
    // optional https://github.com/webpack-contrib/css-loader#object
    cssLoaderOptions: {},

    // Other Config Here...

    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      })
      return config
    },

    future: { webpack5: false },
  }),
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
})
