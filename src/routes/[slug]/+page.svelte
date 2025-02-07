<script>
	const { data } = $props();
	const { receiverName, senderName, sonnet } = data.message.message;
</script>

<svelte:head>
	<title>Happy Valentine's Day, {receiverName}! ❤️</title>
</svelte:head>

<div class="container">
	<h1>Happy Valentine's Day, {receiverName}! ❤️</h1>
	<p>Celebrate love and cherish the moments that make life beautiful.</p>
	<div class="sonnet">
		<p>{sonnet}</p>
	</div>
	<a href="https://lovesonnet.online" target="_blank" class="cta-button"
		>Send {senderName} a Valentine's Day sonnet</a
	>
</div>

<style>
	.container {
		max-width: 800px;
		width: 100%;
		background: #fff;
		padding: 40px;
		border-radius: 10px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		margin: auto;
	}
	h1 {
		color: #d63384;
		font-size: 36px;
		margin-bottom: 20px;
	}
	p {
		font-size: 18px;
		color: #333;
		line-height: 1.8;
		margin: 15px 0;
	}
	.sonnet {
		font-style: italic;
		color: #555;
		font-size: 18px;
		margin: 30px auto;
		white-space: pre-line;
	}
	.cta-button {
		display: inline-block;
		text-decoration: none;
		margin: 30px auto;
		padding: 15px 20px;
		background-color: #ff4081;
		color: #ffffff;
		font-size: 20px;
		border-radius: 5px;
	}
</style>
