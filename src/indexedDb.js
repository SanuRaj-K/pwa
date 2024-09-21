import { openDB } from 'idb';

const dbPromise = openDB('post-requests', 1, {
  upgrade(db) {
    db.createObjectStore('requests', { keyPath: 'id', autoIncrement: true });
  },
});

export async function savePostRequest(data) {
  const db = await dbPromise;
  await db.add('requests', { data });
}

export async function getAllPostRequests() {
  const db = await dbPromise;
  return await db.getAll('requests');
}

export async function clearPostRequests() {
  const db = await dbPromise;
  await db.clear('requests');
}
