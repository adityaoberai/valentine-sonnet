# ✉️ Send Emails

Send emails every minute on Feb 14th

## 🧰 Usage

Runs on a CRON schedule

Returns an empty response

## ⚙️ Configuration

| Setting           | Value          |
| ----------------- | -------------- |
| Runtime           | Node (18.0)    |
| Entrypoint        | `src/main.js`  |
| Build Commands    | `npm install`  |
| Permissions       | `any`          |
| Timeout (Seconds) | 59             |
| Schedule          | `*/1 * 14 2 *` |

## 🔒 Environment Variables

- `RESEND_API_KEY`: API key to send emails using Resend
- `APPWRITE_DB_ID`: ID of your Appwrite Database
- `APPWRITE_COLL_ID`: ID of your Appwrite Collection
