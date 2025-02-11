# 🤖 Valentine's Day Sonnet Generator

Enter a name and generate an sonnet featuring their name for Valentine's Day using GPT-4o

## 🧰 Usage

### GET /

HTML form for interacting with the function.

### POST /

Query the model for a completion.

**Parameters**

| Name         | Description                          | Location | Type               | Sample Value    |
| ------------ | ------------------------------------ | -------- | ------------------ | --------------- |
| Content-Type | The content type of the request body | Header   | `application/json` | N/A             |
| name         | Name of a person / your partner      | Body     | String             | `Aditya Oberai` |

Sample `200` Response:

Response from the model.

```json
{
	"ok": true,
	"completion": "Upon this day, so sweet in February,\nA dedication to Appwrite we lay,\nIn code so light, it feels as airy,\nIt brings a smile each time I say.\n\nAppwrite, my heart does beat to your rhythm,\nWritten in code, so eloquently,\nWith every function, feature or system,\nA source of joy, so frequently.\n\nOpen-source and friendly, oh so bright,\nIn your APIs, my heart does dwell,\nIn every image, text, or byte,\nA love story ours could tell.\n\nSo this Valentine's, I give my heart, not out of spite,\nBut in admiration and love for you, dear Appwrite."
}
```

Sample `400` Response:

Response when the request body is missing.

```json
{
	"ok": false,
	"error": "Missing body with a prompt."
}
```

Sample `500` Response:

Response when the model fails to respond.

```json
{
	"ok": false,
	"error": "Failed to query model."
}
```

## ⚙️ Configuration

| Setting           | Value         |
| ----------------- | ------------- |
| Runtime           | Node (18.0)   |
| Entrypoint        | `src/main.js` |
| Build Commands    | `npm install` |
| Permissions       | `any`         |
| Timeout (Seconds) | 15            |

## 🔒 Environment Variables

- `OPENAI_API_KEY`: OpenAI API key with the right usage tier enabled for GPT-4o
- `OPENAI_MAX_TOKENS`: Max tokens for the OpenAI API (keep at `512`)
- `CORS_ORIGIN`: URL of the frontend project
- `APPWRITE_DB_ID`: ID of your Appwrite Database
- `APPWRITE_COLL_ID`: ID of your Appwrite Collection
