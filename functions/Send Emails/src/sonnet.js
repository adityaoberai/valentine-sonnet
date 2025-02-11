export function generateValentineEmail(id, sonnet, senderName, receiverName) {
return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Happy Valentine's Day!</title>
</head>
<body style="padding: 8px; background-color: #ffe6e6; font-family: Arial, sans-serif;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding: 40px 0;">
        <tr>
            <td align="center">
                <table border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; border: 2px solid #ffb3b3; box-shadow: 0 10px 30px rgba(214, 51, 132, 0.15);">
                    <tr>
                        <td style="padding: 40px 20px; text-align: center;">
                            <h1 style="color: #d63384; font-size: 24px; font-family: Georgia, serif; margin-bottom: 20px;">
                                Happy Valentine's Day, ${receiverName}! ❤️
                            </h1>

                            <p style="color: #666666; font-size: 14px; line-height: 1.5; margin-bottom: 20px;">
                                Celebrate love and cherish the moments that make life beautiful.
                            </p>

                            <div style="font-style: italic; color: #555555; font-family: Georgia, serif; font-size: 18px; line-height: 1.8; margin: 30px 0; padding: 0 20px;">
                                ${sonnet.split('\n').join('<br/>')}
                            </div>

                            <a href="https://lovesonnet.online" style="background-color: #d63384; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 4px; display: inline-block; margin-top: 20px; font-size: 16px;">
                                Send ${senderName} a Valentine's Day sonnet
                            </a>
                            <p style="margin-top: 20px;">
                                <a href="https://lovesonnet.online/${id}" style="color: #d63384; text-decoration: none; font-size: 14px;">
                                    View the sonnet in browser
                                </a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
}
