import { SubjectNode } from './subjects.schema';
import subjects from './subjects';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { FirebaseApp } from 'firebase/app';

export async function getSubjects(fb: FirebaseApp, locale?: string) {
  return subjects.taxonomy;
}

export async function getSubject(
  fb: FirebaseApp,
  classifications: { l1: string; l2?: string; l3?: string },
  locale?: string
): Promise<SubjectNode | null> {
  const docId = `\\${Object.values(classifications)
    .filter((x) => !!x)
    .join('\\')}`;
  const db = getFirestore(fb);
  const docRef = doc(db, 'subjects', docId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) return docSnap.data() as SubjectNode;
  return null;
}

export async function addSubject(
  fb: FirebaseApp,
  node: SubjectNode
): Promise<boolean> {
  console.log('creating node: ', node);
  return true;
}
