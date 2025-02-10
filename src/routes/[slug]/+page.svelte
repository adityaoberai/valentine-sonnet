<script>
	const { data } = $props();
	const { receiverName, sonnet } = data.message.message;
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
	<a href="https://lovesonnet.online" target="_blank" class="button">Send your beloved a Valentine's Day sonnet</a>
</div>
