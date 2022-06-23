import { SubjectNode, SubjectsTaxonomy } from './subjects.schema';
import subjects from './subjects';
import { Firestore } from 'firebase/firestore/lite';

export async function getSubjects(db: Firestore, locale?: string) {
  return subjects.taxonomy;
}

export async function getSubject(
  db: Firestore,
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

export async function addSubject(
  db: Firestore,
  node: SubjectNode
): Promise<boolean> {
  console.log('creating node: ', node);
  return true;
}
