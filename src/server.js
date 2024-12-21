const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const PORT = 9000;

const init = async () => {
  const server = Hapi.server({
    port: PORT,
    host: 'localhost',
  });

  server.route(routes);

  await server.start();
  console.log(`server berjalan di ${server.info.uri}`);
};

init();