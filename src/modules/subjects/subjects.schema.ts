import { Static, Type } from '@sinclair/typebox';
import { RouteShorthandOptions } from 'fastify';

export const SubjectNodeSchema = Type.Object({
  current: Type.String(),
  parent: Type.Optional(Type.String()),
  children: Type.Optional(Type.Array(Type.String())),
});

export const SubjectsTaxonomySchema = Type.Record(
  Type.String(),
  SubjectNodeSchema
);

export type SubjectNode = Static<typeof SubjectNodeSchema>;

export type SubjectsTaxonomy = Static<typeof SubjectsTaxonomySchema>;

export const SubjectsRequestQuerySchema = Type.Object({
  locale: Type.Optional(Type.String()),
});

export const SubjectsRequestParamsSchema = Type.Object({
  node: Type.String(),
});

export const SubjectsRequestBodySchema = SubjectNodeSchema;

export const SubjectsRequestSchema = Type.Object({
  Querystring: SubjectsRequestQuerySchema,
  Params: SubjectsRequestParamsSchema,
  Body: SubjectsRequestBodySchema,
});

export type SubjectsRequest = Static<typeof SubjectsRequestSchema>;

export const GetSubjectsOpts: RouteShorthandOptions = {
  schema: {
    querystring: SubjectsRequestQuerySchema,
    response: {
      200: SubjectsTaxonomySchema,
    },
  },
};

export const GetSubjectOpts: RouteShorthandOptions = {
  schema: {
    querystring: SubjectsRequestQuerySchema,
    params: SubjectsRequestParamsSchema,
    response: {
      200: SubjectNodeSchema,
    },
  },
};

export const AddSubjectOpts: RouteShorthandOptions = {
  schema: {
    querystring: SubjectsRequestQuerySchema,
    body: SubjectNodeSchema,
  },
};
