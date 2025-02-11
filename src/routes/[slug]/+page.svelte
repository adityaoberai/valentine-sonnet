<script>
    const { data } = $props();
    const { receiverName, sonnet } = data.message.message;

	const title = `Happy Valentine's Day, ${receiverName}! ❤️`
</script>

<svelte:head>
    <title>{title}</title>
	<meta property="og:title" content={title} />
	<meta property="twitter:title" content={title} />
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Cormorant+Garamond:ital@1&display=swap" rel="stylesheet">
</svelte:head>

<div class="container">
    <div class="heart-decoration"></div>
    <h1>Happy Valentine's Day, {receiverName}! ❤️</h1>
    <p>Celebrate love and cherish the moments that make life beautiful.</p>
    <div class="sonnet">
        <p>{sonnet}</p>
    </div>
    <a href="https://lovesonnet.online" target="_blank" class="button">Send your beloved a Valentine's Day sonnet</a>
</div>