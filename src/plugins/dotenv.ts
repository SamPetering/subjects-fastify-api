import fastifyEnv from '@fastify/env';
import fp from 'fastify-plugin';
import { join } from 'path';

const schema = {
  type: 'object',
  required: ['PORT'],
  properties: {
    PORT: {
      type: 'string',
      default: 3000,
    },
    HOST: {
      type: 'string',
      default: '0.0.0.0',
    },
    FIREBASE_API_KEY: {
      type: 'string',
      default: '',
    },
  },
};

export default fp<{ isProd: boolean }>(async (fastify, { isProd = false }) => {
  const dotenvFile = isProd ? '.dev.env' : '.env';

  fastify.register(fastifyEnv, {
    confKey: 'config', // optional, default: 'config'
    schema: schema,
    dotenv: {
      path: join(__dirname, dotenvFile),
    },
  });
});

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      PORT: number;
      HOST: string;
      FIREBASE_API_KEY: string;
    };
  }
}
