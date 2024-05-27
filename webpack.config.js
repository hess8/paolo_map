const path = require('path');

module.exports = {
  mode: 'production',
  entry: './assets/scripts/map.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'paolo_map/static/'),
  },
};