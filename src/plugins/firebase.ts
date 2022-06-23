import { FIREBASE_CONFIG } from 'config';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore/lite';

async function firebase(fastify: FastifyInstance, _: unknown) {
  const firebaseApp = initializeApp(FIREBASE_CONFIG);
  const db = getFirestore(firebaseApp);
  fastify.decorate('firebase', firebaseApp);
  fastify.decorate('firestore', db);
}

export default fp(async (fastify, opts) => {
  fastify.register(firebase);
});

declare module 'fastify' {
  export interface FastifyInstance {
    firebase(): FirebaseApp;
    firestore(): Firestore;
  }
}
