import fastify from 'fastify';
import AutoLoad from '@fastify/autoload';
import { join } from 'path';
import subjectsRoutes from './modules/subjects/subjects.routes';
import dotenv from './plugins/dotenv';

async function main() {
  const env = process.env.NODE_ENV ?? 'development';

  // create server
  const server = fastify({
    logger: env === 'development',
    ajv: {
      customOptions: {
        strict: 'log',
        keywords: ['kind', 'modifier'],
      },
    },
  });

  // load environment
  await server.register(dotenv, { isProd: env === 'production' });
  const { PORT, HOST } = server.config;

  // expose health route
  server.get('/health', async function () {
    return {
      status: 'ok',
    };
  });

  // register everything in plugins directory
  server.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    ignorePattern: /dotenv/,
  });

  // register all the subjects routes
  server.register(subjectsRoutes);

  // listen
  server.listen({ port: PORT, host: HOST }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });

  // start swagger once server is ready
  server.ready(async () => {
    console.log('Starting swagger at /docs');
    server.swagger();
  });
}

main();
