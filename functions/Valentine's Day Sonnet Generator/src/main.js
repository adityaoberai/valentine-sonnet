import { Client, Databases, ID } from 'node-appwrite';
import { OpenAI } from 'openai';
import { getStaticFile, throwIfMissing } from './utils.js';

export default async ({ req, res, log, error }) => {
  throwIfMissing(process.env, ['OPENAI_API_KEY', 'CORS_ORIGIN']);

  if(req.method === 'OPTIONS') {
    return res.send(null, 204, {
      'Access-Control-Allow-Origin': process.env.CORS_ORIGIN,
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
  }

  else if (req.method === 'GET') {
    return res.send(getStaticFile('index.html'), 200, {
      'Access-Control-Allow-Origin': process.env.CORS_ORIGIN,
      'Content-Type': 'text/html',
    });
  }

  else if (req.method === 'POST') {
    if(req.path === '/') {
      try {
        throwIfMissing(req.bodyJson, ['name']);
      } catch (err) {
        error(err.message);
        return res.json({ ok: false, error: err.message }, 400, {
          'Access-Control-Allow-Origin': process.env.CORS_ORIGIN,
        });
      }
    
      const openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });
    
      try {
        const response = await openai.chat.completions.create({
          model: 'gpt-4o',
          max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS ?? '512'),
          messages: [{ role: 'user', content: `Write a romantic Valentine\'s Day sonnet dedicated to ${req.bodyJson.name}` }],
        });
        const completion = response.choices[0].message?.content;
        log(completion);
        return res.json({ ok: true, completion }, 200, {
          'Access-Control-Allow-Origin': process.env.CORS_ORIGIN,
        });
      } catch (err) {
        error(err.message);
        return res.json({ ok: false, error: err.message }, 500, {
          'Access-Control-Allow-Origin': process.env.CORS_ORIGIN,
        });
      }
    }

    else if (req.path === '/messages') {
      try {
        throwIfMissing(req.bodyJson, ['senderName', 'senderEmail', 'receiverName', 'receiverEmail', 'sonnet']);
        throwIfMissing(process.env, ['APPWRITE_DB_ID', 'APPWRITE_COLLECTION_ID'])
        
        const appwriteClient = new Client()
          .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
          .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
          .setKey(req.headers['x-appwrite-key']);

        const appwriteDatabases = new Databases(appwriteClient);

        const { senderName, senderEmail, receiverName, receiverEmail, sonnet } = req.bodyJson;

        await appwriteDatabases.createDocument(
          process.env.APPWRITE_DB_ID,
          process.env.APPWRITE_COLLECTION_ID,
          ID.unique(),
          {
            senderName,
            senderEmail,
            receiverName,
            receiverEmail,
            sonnet: sonnet.trim(),
            test: req.bodyJson.test ?? false,
            sent: false
          }
        );

        return res.json({ ok: true }, 200, {
          'Access-Control-Allow-Origin': process.env.CORS_ORIGIN,
        });

      } catch (err) {
        error(err.message);
        return res.json({ ok: false, error: err.message }, 400, {
          'Access-Control-Allow-Origin': process.env.CORS_ORIGIN,
        });
      }
    }
  }
};
