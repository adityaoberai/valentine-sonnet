import { Client, Databases } from 'node-appwrite';

export function setupAppwriteDatabases(req) {
	const appwriteClient = new Client()
		.setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
		.setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
		.setKey(req.headers['x-appwrite-key']);

	return new Databases(appwriteClient);
}

/**
 * Throws an error if any of the keys are missing from the object
 * @param {*} obj
 * @param {string[]} keys
 * @throws {Error}
 */
export function throwIfMissing(obj, keys) {
	const missing = [];
	for (let key of keys) {
		if (!(key in obj) || !obj[key]) {
			missing.push(key);
		}
	}
	if (missing.length > 0) {
		throw new Error(`Missing required fields: ${missing.join(', ')}`);
	}
}
