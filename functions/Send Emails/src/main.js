import { Client, Databases, Query } from 'node-appwrite';
import { Resend } from 'resend';
import { generateValentineEmail } from './sonnet.js';

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key']);

  const databases = new Databases(client);

  const test = process.env.TEST === 'true';

  const messagesToSend = await databases.listDocuments(
    process.env.APPWRITE_DB_ID,
    process.env.APPWRITE_COLLECTION_ID,
    [
      Query.limit(10000),
      Query.equal('sent', false),
      Query.equal('test', test),
      Query.select([
        '$id',
        'senderName',
        'senderEmail',
        'receiverName',
        'receiverEmail',
        'sonnet',
      ]),
    ]
  );

  for (const message of messagesToSend.documents) {
    try {
      log(message);
      const { $id, senderName, senderEmail, receiverName, receiverEmail, sonnet } =
        message;
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { data, error } = await resend.emails.send({
        from: `Valentine's Day <valentine@mail.lovesonnet.online>`,
        to: `${receiverName} <${receiverEmail}>`,
        replyTo: `${senderEmail}`,
        subject: `${senderName} has sent you a Valentine's Day Sonnet!`,
        html: generateValentineEmail($id, sonnet.trim(), senderName, receiverName),
      });

      if (error) {
        throw new Error(error);
      }

      log(data);

      await databases.updateDocument(
        process.env.APPWRITE_DB_ID,
        process.env.APPWRITE_COLLECTION_ID,
        message.$id,
        {
          sent: true,
        }
      );
    } catch (err) {
      error(err.message);
    }
  }

  return res.empty();
};
