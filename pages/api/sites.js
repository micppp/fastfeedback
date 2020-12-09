import db from '@/lib/firebase-admin';

export default async (_, res) => {
  const sitesRef = db.collection('sites');
  const snapshot = await sitesRef.get();

  if (snapshot.empty) {
    console.log('No matching documents.');
    return;
  }

  const sites = [];

  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });

  res.status(200).json({ sites });
};
