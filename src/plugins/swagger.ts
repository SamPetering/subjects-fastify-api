import fp from 'fastify-plugin';
import fastifySwagger from '@fastify/swagger';

export default fp(async (fastify, _opts) => {
  fastify.register(fastifySwagger, {
    exposeRoute: true,
    routePrefix: '/docs',
    swagger: {
      info: {
        title: 'IA-Service',
        version: '0.0.1',
      },
    },
  });
});
