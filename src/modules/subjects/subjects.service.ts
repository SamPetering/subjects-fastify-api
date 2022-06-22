import { SubjectNode, SubjectsTaxonomy } from './subjects.schema';
import subjects from './subjects';

export async function getSubjects(locale?: string) {
  return subjects.taxonomy;
}

export async function getSubject(
  classifications: { l1: string; l2?: string; l3?: string },
  locale?: string
): Promise<SubjectNode | null> {
  const taxonomy = subjects.taxonomy as SubjectsTaxonomy;
  const key = `/${Object.values(classifications)
    .filter((x) => !!x)
    .join('/')}`;
  const found = taxonomy[key];
  return found ?? null;
}

export async function addSubject(node: SubjectNode): Promise<boolean> {
  console.log('creating node: ', node);
  return true;
}
