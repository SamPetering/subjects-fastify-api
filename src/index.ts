import fastify from 'fastify';
import AutoLoad from '@fastify/autoload';
import { join } from 'path';
import subjectsRoutes from './modules/subjects/subjects.routes';

const server = fastify({
  logger: true,
  ajv: {
    customOptions: {
      strict: 'log',
      keywords: ['kind', 'modifier'],
    },
  },
});

server.get('/health', async function () {
  return {
    status: 'ok',
  };
});

server.register(AutoLoad, {
  dir: join(__dirname, 'plugins'),
});

server.register(subjectsRoutes);

server.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

server.ready(async () => {
  console.log('Starting swagger at /docs');
  server.swagger();
});
