export function generateValentineEmail(sonnet, senderName, receiverName) {
  return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Valentine's Day Special</title>
        <style>
            body {
                display: block;
                font-family: Arial, sans-serif;
                background-color: #ffe6e6;
                margin: 0;
                padding: 0;
                width: 100%;
                text-align: center;
                min-height: 100vh;
            }
            .container {
                display: block;
                max-width: 90%;
                width: 600px;
                background: #fff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
            h1 {
                color: #d63384;
                font-size: clamp(20px, 4vw, 28px);
                margin-bottom: 10px;
            }
            p {
                font-size: clamp(14px, 3.5vw, 18px);
                color: #333;
                line-height: 1.6;
                margin: 10px 0;
                text-align: center;
            }
            .sonnet {
                font-style: italic;
                color: #555;
                font-size: clamp(14px, 3vw, 16px);
                margin: 20px auto;
                white-space: pre-line;
                text-align: center;
            }
            .cta-button {
                display: block;
                text-decoration: none;
                margin: 20px auto;
                padding: 12px;
                background-color: #ff4081;
                color: #ffffff;
                font-size: clamp(16px, 3.5vw, 20px);
                border-radius: 5px;
                width: 80%;
                max-width: 300px;
                text-align: center;
            }
            .footer {
                margin: 20px auto;
                font-size: clamp(12px, 2.5vw, 14px);
                color: #777;
                text-align: center;
            }
            .footer p {
                font-size: clamp(12px, 2.5vw, 14px);
            }
            .footer a {
                color: #d63384;
                text-decoration: none;
                font-size: clamp(12px, 2.5vw, 14px);
            }
            @media screen and (max-width: 600px) {
                .container {
                    padding: 15px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Happy Valentine's Day, ${receiverName}! ❤️</h1>
            <p>Celebrate love and cherish the moments that make life beautiful.</p>
            <div class="sonnet">
                <p>
                    ${sonnet.trim()}
                </p>
            </div>
            <a href="https://lovesonnet.online" class="cta-button">Send ${senderName} a Valentine's Day sonnet</a>
            <div class="footer">
                <p>Made with love by <a href="https://x.com/adityaoberai1">Aditya Oberai</a> ❤️</p>
            </div>
        </div>
    </body>
    </html>`;
}
