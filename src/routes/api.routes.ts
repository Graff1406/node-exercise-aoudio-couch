import { Request, Response, Router } from 'express';

import * as googleTTS from 'google-tts-api';
import fs from 'fs';
import https from 'https';

const router = Router();

router.get('/tts', async (req: Request, res: Response) => {
  const text = req.query.text as string;

  try {
    const base64 = await googleTTS.getAudioBase64(text, {
      lang: 'ru',
      slow: false,
      host: 'https://translate.google.com',
      timeout: 10000,
    });
    res.json({ base64 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}); // api/tts

export { router };
