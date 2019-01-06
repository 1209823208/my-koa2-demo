const path = require('path');
function resolve(dir) {
    return path.join(__dirname, '.', dir)
}
const {
    injectBabelPlugin
} = require('react-app-rewired');
module.exports = function override(config, env) {
    config = injectBabelPlugin(['import', {
        libraryName: 'antd-mobile',
        style: 'css'
    }], config);
    config.resolve.alias = {
        '@': resolve('src'),
        '@components':resolve('src/components'),
        '@pages':resolve('src/pages'),
        '@service':resolve('src/service'),
        '@environments':resolve('src/environments'),
    }
    return config;
};