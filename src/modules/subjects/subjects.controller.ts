import { FastifyReply, FastifyRequest } from 'fastify';
import { SubjectsRequest } from './subjects.schema';
import { getSubjects, getSubject, addSubject } from './subjects.service';

export async function getSubjectsHandler(
  request: FastifyRequest<SubjectsRequest>,
  reply: FastifyReply
) {
  const fb = request.server.firebase;
  const locale = request.query.locale;
  const subjects = await getSubjects(fb, locale);
  return reply.code(200).send(subjects);
}

export async function getSubjectHandler(
  request: FastifyRequest<SubjectsRequest>,
  reply: FastifyReply
) {
  const fb = request.server.firebase;
  const locale = request.query.locale;
  const { l1, l2, l3 } = request.params;
  const subject = await getSubject(fb, { l1, l2, l3 }, locale);
  if (subject === null) return reply.code(404).send('subject not found');

  return reply.code(200).send(subject);
}

export async function addSubjectHandler(
  request: FastifyRequest<SubjectsRequest>,
  reply: FastifyReply
) {
  const fb = request.server.firebase;
  const body = request.body;
  const success = await addSubject(fb, body);
  if (success) return reply.code(201).send('subject added');
  return reply.code(500).send();
}
