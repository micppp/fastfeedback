import { auth } from '@/lib/firebase-admin';
import { getUserSites } from '@/lib/db-admin';
import { formatObjectKeys, logger } from '@/utils/logger';

export default async (req, res) => {
  try {
    const { token } = req.headers;
    const { uid } = await auth.verifyIdToken(token);
    const { sites } = await getUserSites(uid);

    res.status(200).json({ sites });
  } catch (error) {
    const headers = formatObjectKeys(req.headers);

    logger.error(
      {
        request: {
          headers,
          url: req.url,
          method: req.method,
        },
        response: {
          statusCode: res.statusCode,
        },
      },
      error.message
    );

    res.status(500).json({ error });
  }
};
