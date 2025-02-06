<script>
    import { PUBLIC_APPWRITE_FUNCTION_URL } from '$env/static/public';

    let name = '';
    let sonnet = '';
    let loading = false;

    let senderName = '';
    let senderEmail = '';
    let receiverName = '';
    let receiverEmail = '';
    let sendingMessage = 'Send Sonnet';
    let sending = false;
  
    async function generateSonnet() {
        if (!name) return;
        loading = true;
        sonnet = '';
        try {
            const response = await fetch(`${PUBLIC_APPWRITE_FUNCTION_URL}/`, {
            method: 'POST',
            body: JSON.stringify({ name }),
            headers: {
                'Content-Type': 'application/json',
            },
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

    async function  saveMessage() {
        sending = true;
        sendingMessage = 'Sending...';

        try {
            const response = await fetch(`${PUBLIC_APPWRITE_FUNCTION_URL}/messages`, {
                method: 'POST',
                body: JSON.stringify({ senderName, senderEmail, receiverName, receiverEmail, sonnet }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const json = await response.json();
            if (!json.ok || json.error) {
                throw new Error(json.error);
            } else {
                sendingMessage = 'Sent!';
            }
        } catch (err) {
            console.error(err.message);
        } finally {
            sending = false;
            setTimeout(() => {
                sendingMessage = 'Send Sonnet';
            }, 2000);
        }
    }
</script>

<main class="main-content">
    <div class="top-cover u-padding-block-end-56">
        <div class="container">
        <div class="u-flex u-gap-16 u-flex-justify-center u-margin-block-start-16">
            <h1 class="heading-level-1">Valentine's Day Sonnet Generator ❤️</h1>
        </div>
        <p class="body-text-1 u-normal u-margin-block-start-8 body-text-container">
            Enter your partner's name and receive a sonnet dedicated to them, courtesy of Appwrite, OpenAI, and Resend
        </p>
        </div>
    </div>

    <div class="container u-margin-block-start-negative-56">
        <div class="card u-flex u-gap-24 u-flex-vertical">
            <form on:submit={generateSonnet} class="u-flex u-cross-center u-gap-8">
                <div class="input-text-wrapper is-with-end-button u-width-full-line">
                    <input bind:value={name} type="search" placeholder="Enter name of your beloved" maxlength="70" />
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
                    
                    <h3 class="eyebrow-heading-3">Your Details</h3>
                    <div class="u-flex u-gap-8 u-flex-wrap u-width-full-line">
                        <input class="u-width-fit-content" bind:value={senderName} type="text" placeholder="Your Name" required/>
                        <input class="u-width-fit-content" bind:value={senderEmail} type="email" placeholder="Your Email" required/>
                    </div>

                    <h3 class="eyebrow-heading-3">Receiver's Details</h3>
                    <div class="u-flex u-gap-8 u-width-full-line">
                        <input class="u-width-fit-content" bind:value={receiverName} type="text" placeholder="Receiver's Name" required/>
                        <input class="u-width-fit-content" bind:value={receiverEmail} type="email" placeholder="Receiver's Email" required/>
                    </div>
                    
                    <button class="button">{sendingMessage}</button>

                    <p class="u-color-text-gray">ℹ️ All sonnets will be emailed on Feb 14th</p>
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