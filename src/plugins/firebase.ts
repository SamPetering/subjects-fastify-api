import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

async function firebase(fastify: FastifyInstance, _: unknown) {
  const firebaseApp = initializeApp({});
  fastify.decorate('firebase', firebaseApp);
}

export default fp(async (fastify, opts) => {
  fastify.register(firebase);
});

declare module 'fastify' {
  export interface FastifyInstance {
    firebase: FirebaseApp;
  }
}
