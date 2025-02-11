<script>
	import { PUBLIC_APPWRITE_FUNCTION_URL } from '$env/static/public';
	import { redirect } from '@sveltejs/kit';

	let name = '';
	let sonnet = '';
	let loading = false;

	let senderName = '';
	let senderEmail = '';
	let receiverName = '';
	let receiverEmail = '';
	let sendingMessage = 'Send Sonnet';
	let sending = false;

	let messageId = '';
	let shareLinkAvailable = false;

	function hideSonnetForm() {
		try {
			shareLinkAvailable = true;
		} catch (err) {
			console.error(err.message);
		}
	}

	function unhideSonnetForm() {
		try {
			shareLinkAvailable = false;
		} catch (err) {
			console.error(err.message);
		}
	}

	function addShareLink() {
		deleteShareLink();
		hideSonnetForm();

		const shareLinkButton = document.createElement('a');
		shareLinkButton.innerHTML = 'Share Link Of Sonnet';
		shareLinkButton.classList.add('button');
		shareLinkButton.target = '_blank';
		shareLinkButton.href = `./${messageId}`;
		document.getElementById('sonnetButtons').appendChild(shareLinkButton);
	}

	function deleteShareLink() {
		unhideSonnetForm();
		try {
			if (document.getElementById('sonnetButtons').children.length <= 1) return;

			document.getElementById('sonnetButtons').removeChild(document.getElementsByTagName('a')[0]);
		} catch (err) {
			console.error(err.message);
		}
	}

	async function generateSonnet() {
		if (!name) return;
		loading = true;
		sonnet = '';
		messageId = '';
		deleteShareLink();
		try {
			const response = await fetch(`${PUBLIC_APPWRITE_FUNCTION_URL}/`, {
				method: 'POST',
				body: JSON.stringify({ name }),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const json = await response.json();
			if (!json.ok || json.error) {
				alert(json.error);
			} else {
				sonnet = json.completion;
			}
		} catch (err) {
			console.error(err);
		} finally {
			loading = false;
		}
	}

	async function saveMessage() {
		sending = true;
		sendingMessage = 'Sending...';

		try {
			const response = await fetch(`${PUBLIC_APPWRITE_FUNCTION_URL}/messages`, {
				method: 'POST',
				body: JSON.stringify({ senderName, senderEmail, receiverName, receiverEmail, sonnet }),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const json = await response.json();
			if (!json.ok || json.error) {
				throw new Error(json.error);
			} else {
				sendingMessage = 'Sent!';
				messageId = json.messageId;
			}
		} catch (err) {
			console.error(err.message);
		} finally {
			sending = false;
			addShareLink();
			setTimeout(() => {
				sendingMessage = 'Send Sonnet';
				senderName = '';
				senderEmail = '';
				receiverName = '';
				receiverEmail = '';
			}, 3000);
		}
	}
</script>

<svelte:head>
	<title>Valentine's Day Sonnet Generator</title>
	<meta property="og:title" content="Valentine's Day Sonnet Generator" />
	<meta property="twitter:title" content="Valentine's Day Sonnet Generator" />
</svelte:head>

<main class="main-content">
	<div class="top-cover u-padding-block-end-56">
		<div class="container">
			<div class="u-flex u-gap-16 u-flex-justify-center u-margin-block-start-16">
				<h1 class="heading-level-1">Valentine's Day Sonnet Generator ❤️</h1>
			</div>
			<p class="body-text-1 u-normal u-margin-block-start-8 body-text-container">
				Enter your partner's name and send a sonnet dedicated to them on February 14th
			</p>
		</div>
	</div>

	<div class="container u-margin-block-start-negative-56">
		<div class="card u-flex u-gap-24 u-flex-vertical">
			<form on:submit={generateSonnet} class="u-flex u-cross-center u-gap-8">
				<div class="input-text-wrapper is-with-end-button u-width-full-line">
					<input
						bind:value={name}
						type="search"
						placeholder="Enter name of your beloved"
						maxlength="70"
					/>
					<div class="icon-heart" aria-hidden="true"></div>
				</div>

				<button class="button" type="submit" disabled={loading}>
					<span class="text">{loading ? 'Submitting...' : 'Submit'}</span>
				</button>
			</form>

			{#if sonnet}
				<div class="u-flex u-flex-vertical u-gap-12">
					<div class="u-flex u-flex-vertical u-gap-12 card">
						<div class="u-flex u-gap-12">
							<h2 class="eyebrow-heading-2">Cupid:</h2>
						</div>
						<div class="text-container">
							<p class="u-color-text-gray sonnet-text">{sonnet}</p>
						</div>
					</div>
				</div>

				<form on:submit={saveMessage} class="card u-flex u-flex-vertical u-gap-12">
					<h2 class="eyebrow-heading-2">Send the sonnet to your beloved:</h2>
					{#if !shareLinkAvailable}
						<div class="u-flex u-flex-vertical u-gap-8 u-width-full-line sonnetForm">
							<h3 class="eyebrow-heading-3">Your Details</h3>
							<div class="u-flex u-flex-wrap u-gap-8 u-width-full-line">
								<input
									class="u-width-fit-content"
									bind:value={senderName}
									type="text"
									placeholder="Your Name"
									required
								/>
								<input
									class="u-width-fit-content"
									bind:value={senderEmail}
									type="email"
									placeholder="Your Email"
									required
								/>
							</div>
						</div>

						<div class="u-flex u-flex-vertical u-gap-8 u-width-full-line sonnetForm">
							<h3 class="eyebrow-heading-3">Receiver's Details</h3>
							<div class="u-flex u-flex-wrap u-gap-8 u-width-full-line">
								<input
									class="u-width-fit-content"
									bind:value={receiverName}
									type="text"
									placeholder="Receiver's Name"
									required
								/>
								<input
									class="u-width-fit-content"
									bind:value={receiverEmail}
									type="email"
									placeholder="Receiver's Email"
									required
								/>
							</div>
						</div>
					{/if}
					<div id="sonnetButtons" class="u-flex u-flex-vertical u-gap-8 u-width-full-line">
						{#if !shareLinkAvailable}
							<button type="submit" class="button sonnetForm">{sendingMessage}</button>
						{/if}
					</div>
					<div class="u-width-min-content">
						<button class="tag tooltip">
							<span class="icon-info" aria-hidden="true"></span>
							<span class="text">Important Note</span>
							<span class="tooltip-popup" role="tooltip">
								All sonnets will be emailed on Feb 14th.
								<br/><br/>
								In case your partner doesn't see an email in their inbox, please ensure they check their spam folder.
							</span>
						</button>
					</div>
				</form>
			{/if}
		</div>
	</div>
</main>

<style>
	.body-text-container {
		max-width: 50rem;
	}

	.icon-heart {
		position: absolute;
		inset-inline-start: 1rem;
		inset-block-start: 0.5rem;
	}

	.text-container {
		overflow-x: hidden;
		line-break: auto;
	}

	.sonnet-text {
		white-space: pre-line;
	}
</style>
