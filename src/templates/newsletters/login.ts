export default function html({ url }: Record<"url", string>) {
    return `
  <body style="background: #ffffff; padding-top: 60px; padding-bottom: 60px;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center" style="font-family: Arial, Helvetica, sans-serif; font-size: 32px; color: #171717; font-weight: 700; padding-bottom: 40px;">
                Sols Estate
            </td>
        </tr>
        <tr>
            <td align="center" style="font-family: Arial, Helvetica, sans-serif; font-size: 20px; color: #171717; font-weight: 500; padding-bottom: 12px;">
                Hello
            </td>
        </tr>
        <tr>
            <td align="center" style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #666666; font-weight: 400; line-height: 19px; padding-bottom: 24px;">
                You can use the link below to log in to your<br>Sols Estate account 
            </td>
        </tr>
        <tr>
            <td align="center" style="padding-bottom: 12px;">
                <a href="${url}" style="font-family: Arial, Helvetica, sans-serif; font-weight: 500; font-size: 16px; width: 220px; padding-top: 10px; padding-bottom: 10px; color: #ffffff; background-color: #4C1CD5; border-radius: 6px; border: none; text-decoration: none; display: inline-block;">Log in to your account</a>
            </td>
        </tr>
        <tr>
            <td align="center" style="font-family: Arial, Helvetica, sans-serif; font-size: 10px; color: #AEAEAE; font-weight: 400; padding-bottom: 12px;">
                Don't share this email with anyone. The link<br>will expire in 24 hours.
            </td>
        </tr>
    </table>
  </body>
  `
}