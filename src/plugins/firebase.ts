import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

async function firebase(fastify: FastifyInstance, _: unknown) {
  const firebaseApp = initializeApp({
    apiKey: fastify.config.FIREBASE_API_KEY,
    authDomain: 'fastify-service-poc.firebaseapp.com',
    projectId: 'fastify-service-poc',
    storageBucket: 'fastify-service-poc.appspot.com',
    messagingSenderId: '661776822961',
    appId: '1:661776822961:web:df6cbc429b101a9a526890',
    measurementId: 'G-L0Q3ERCNKT',
  });
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
