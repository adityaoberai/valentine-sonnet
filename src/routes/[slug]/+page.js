import { PUBLIC_APPWRITE_FUNCTION_URL } from '$env/static/public';

export async function load({ params }) {
	const messageResponse = await fetch(`${PUBLIC_APPWRITE_FUNCTION_URL}/${params.slug}`);
	const message = await messageResponse.json();

	return {
		message
	};
}
