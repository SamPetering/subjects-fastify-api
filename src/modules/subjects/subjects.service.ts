import { SubjectNode, SubjectsTaxonomy } from './subjects.schema';

export const taxonomy: SubjectsTaxonomy = {
  Science: {
    current: 'Science',
    parent: undefined,
    children: ['Biology'],
  },
  Biology: {
    current: 'Biology',
    parent: 'Science',
    children: ['Anatomy', 'Biochemistry'],
  },
  Anatomy: {
    current: 'Anatomy',
    parent: 'Biology',
    children: undefined,
  },
  Biochemistry: {
    current: 'Biochemistry',
    parent: 'Biology',
    children: undefined,
  },
  Math: {
    current: 'Math',
    parent: undefined,
    children: ['Algebra', 'Geometry'],
  },
  Algebra: {
    current: 'Algebra',
    parent: 'Math',
    children: [],
  },
  Geometry: {
    current: 'Geometry',
    parent: 'Math',
    children: [],
  },
};

export async function getSubjects(locale?: string) {
  return taxonomy;
}

export async function getSubject(
  node: string,
  locale?: string
): Promise<SubjectNode | null> {
  const found = taxonomy[node];
  return found ?? null;
}

export async function addSubject(node: SubjectNode): Promise<boolean> {
  console.log('creating node: ', node);
  return true;
}
