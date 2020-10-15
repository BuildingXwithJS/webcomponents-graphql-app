const corsPlugin = require('./graffiti-plugin-cors');

module.exports = {
  mongoUrl: 'mongodb://localhost/wc-gql-app',
  plugins: [corsPlugin()],
};
