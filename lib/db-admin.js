import { compareAsc, parseISO } from 'date-fns';
import { db } from './firebase-admin';

export async function getAllFeedback(siteId) {
  try {
    const snapshot = await db
      .collection('feedback')
      .where('siteId', '==', siteId)
      .get();
    const feedback = [];

    snapshot.forEach((doc) => {
      feedback.push({ id: doc.id, ...doc.data() });
    });

    feedback.sort((a, b) =>
      compareAsc(parseISO(a.createdAt), parseISO(b.createdAt))
    );

    return { feedback };
  } catch (error) {
    return { error };
  }
}

export async function getAllSites(_, res) {
  try {
    const sitesRef = db.collection('sites');
    const snapshot = await sitesRef.get();

    if (snapshot.empty) {
      return {
        sites: [],
      };
    }

    const sites = [];

    snapshot.forEach((doc) => {
      sites.push({ id: doc.id, ...doc.data() });
    });

    return { sites };
  } catch (error) {
    return { error };
  }
}

export async function getUserSites(userId) {
  const sitesRef = db.collection('sites').where('author', '==', userId);
  const snapshot = await sitesRef.get();

  if (snapshot.empty) {
    return {
      sites: [],
    };
  }

  const sites = [];

  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });

  return { sites };
}

export async function getUserFeedback(uid) {
  const feedbackRef = db.collection('feedback').where('authorId', '==', uid);
  const snapshot = await feedbackRef.get();

  const feedback = [];

  snapshot.forEach((doc) => {
    feedback.push({ id: doc.id, ...doc.data() });
  });

  return { feedback };
}
