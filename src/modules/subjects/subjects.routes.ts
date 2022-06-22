import { FastifyInstance } from 'fastify';
import {
  getSubjectsHandler,
  getSubjectHandler,
  addSubjectHandler,
} from './subjects.controller';
import {
  AddSubjectOpts,
  SubjectsRequest,
  GetSubjectOpts,
  GetSubjectsOpts,
} from './subjects.schema';

async function subjectsRoutes(server: FastifyInstance) {
  server.get<SubjectsRequest>('/subjects', GetSubjectsOpts, getSubjectsHandler);
  server.get<SubjectsRequest>(
    '/subjects/:l1',
    GetSubjectOpts,
    getSubjectHandler
  );
  server.get<SubjectsRequest>(
    '/subjects/:l1/:l2',
    GetSubjectOpts,
    getSubjectHandler
  );
  server.get<SubjectsRequest>(
    '/subjects/:l1/:l2/:l3',
    GetSubjectOpts,
    getSubjectHandler
  );
  server.post<SubjectsRequest>(
    '/subject/add',
    AddSubjectOpts,
    addSubjectHandler
  );
}

export default subjectsRoutes;
