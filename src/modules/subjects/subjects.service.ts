import { SubjectNode, SubjectsTaxonomy } from './subjects.schema';
import subjects from './subjects';

export async function getSubjects(locale?: string) {
  return subjects.taxonomy;
}

export async function getSubject(
  node: string,
  locale?: string
): Promise<SubjectNode | null> {
  const taxonomy = subjects.taxonomy as SubjectsTaxonomy;
  const key = `/${node}`;
  const found = taxonomy[key];
  return found ?? null;
}

export async function addSubject(node: SubjectNode): Promise<boolean> {
  console.log('creating node: ', node);
  return true;
}
