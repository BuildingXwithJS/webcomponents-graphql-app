const cors = require('fastify-cors');

module.exports = () => {
  return {
    setup: async ({ server }) => {
      await server.register(cors);
      return server;
    },
  };
};
