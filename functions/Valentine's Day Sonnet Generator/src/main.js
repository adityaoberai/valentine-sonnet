import { ID } from 'node-appwrite';
import { OpenAI } from 'openai';
import { setupAppwriteDatabases, throwIfMissing } from './utils.js';

export default async ({ req, res, log, error }) => {
	if (req.method === 'OPTIONS') {
		return res.send(null, 204, {
			'Access-Control-Allow-Origin': process.env.CORS_ORIGIN,
			'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type'
		});
	} else if (req.method === 'GET') {
		if (req.path === '/') {
			return res.redirect('https://lovesonnet.online', 302);
		} else {
			const slug = req.path.replace('/', '');
			const appwriteDatabases = setupAppwriteDatabases(req);
			try {
				throwIfMissing(process.env, ['APPWRITE_DB_ID', 'APPWRITE_COLL_ID', 'CORS_ORIGIN']);
				const message = await appwriteDatabases.getDocument(
					process.env.APPWRITE_DB_ID,
					process.env.APPWRITE_COLL_ID,
					slug
				);
				return res.json({ ok: true, message }, 200, {
					'Access-Control-Allow-Origin': process.env.CORS_ORIGIN
				});
			} catch (err) {
				error(err.message);
				return res.json({ ok: false, error: err.message }, 404, {
					'Access-Control-Allow-Origin': process.env.CORS_ORIGIN
				});
			}
		}
	} else if (req.method === 'POST') {
		if (req.path === '/') {
			try {
				throwIfMissing(req.bodyJson, ['name']);
				throwIfMissing(process.env, ['OPENAI_API_KEY', 'CORS_ORIGIN']);
			} catch (err) {
				error(err.message);
				return res.json({ ok: false, error: err.message }, 400, {
					'Access-Control-Allow-Origin': process.env.CORS_ORIGIN
				});
			}

			const openai = new OpenAI({
				apiKey: process.env.OPENAI_API_KEY
			});

			try {
				const response = await openai.chat.completions.create({
					model: 'gpt-4o',
					max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS ?? '512'),
					messages: [
						{
							role: 'user',
							content: `Write a romantic Valentine\'s Day sonnet dedicated to ${req.bodyJson.name}`
						}
					]
				});
				const completion = response.choices[0].message?.content;
				log(completion);
				return res.json({ ok: true, completion }, 200, {
					'Access-Control-Allow-Origin': process.env.CORS_ORIGIN
				});
			} catch (err) {
				error(err.message);
				return res.json({ ok: false, error: err.message }, 500, {
					'Access-Control-Allow-Origin': process.env.CORS_ORIGIN
				});
			}
		} else if (req.path === '/messages') {
			try {
				throwIfMissing(req.bodyJson, [
					'senderName',
					'senderEmail',
					'receiverName',
					'receiverEmail',
					'sonnet'
				]);
				throwIfMissing(process.env, ['APPWRITE_DB_ID', 'APPWRITE_COLL_ID', 'CORS_ORIGIN']);

				const appwriteDatabases = setupAppwriteDatabases(req);

				const { senderName, senderEmail, receiverName, receiverEmail, sonnet } = req.bodyJson;

				const savedMessage = await appwriteDatabases.createDocument(
					process.env.APPWRITE_DB_ID,
					process.env.APPWRITE_COLL_ID,
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

				return res.json({ ok: true, messageId: savedMessage.$id }, 200, {
					'Access-Control-Allow-Origin': process.env.CORS_ORIGIN
				});
			} catch (err) {
				error(err.message);
				return res.json({ ok: false, error: err.message }, 400, {
					'Access-Control-Allow-Origin': process.env.CORS_ORIGIN
				});
			}
		}
	}
};
