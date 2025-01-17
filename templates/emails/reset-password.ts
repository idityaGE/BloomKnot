

const getResetPasswordEmail = (email: string, resetUrl: string) => ({
  to: email,
  subject: 'Reset Your Password - BloomKnot',
  html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body, p, h1, h2, h3, h4, h5, h6 {
          margin: 0;
          padding: 0;
        }
        
        body {
          margin: 0;
          padding: 0;
          width: 100% !important;
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
          background-color: #f9f9f9;
        }
        
        .container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          padding: 40px 20px;
          box-sizing: border-box;
        }
        
        .email-body {
          background-color: #ffffff;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
        }
        
        * {
          font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
          color: #333333;
        }
        
        .header {
          text-align: center;
          margin-bottom: 32px;
        }
        
        .header h1 {
          color: #0073e6;
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 16px;
        }
        
        .content {
          line-height: 1.6;
          font-size: 16px;
        }
        
        .content p {
          margin-bottom: 16px;
        }

        .content b {
          font-weight: 600;
        }
        
        .button-container {
          text-align: center;
          margin: 32px 0;
        }
        
        .button {
          display: inline-block;
          padding: 14px 32px;
          background-color: #0073e6;
          color: #ffffff !important;
          text-decoration: none;
          border-radius: 6px;
          font-weight: bold;
          font-size: 16px;
          text-align: center;
          cursor: pointer;
          mso-padding-alt: 0;
          text-underline-color: #0073e6;
          background: #0073e6 !important;
        }
        
        .button:hover {
          background-color: #0066cc !important;
        }
        
        .footer {
          margin-top: 40px;
          text-align: center;
          color: #666666;
          font-size: 14px;
          line-height: 1.5;
        }
        
        .footer p {
          margin-bottom: 8px;
        }
        
        @media only screen and (max-width: 480px) {
          .container {
            padding: 20px 10px;
          }
          
          .email-body {
            padding: 24px;
          }
          
          .header h1 {
            font-size: 24px;
          }
          
          .content {
            font-size: 15px;
          }
          
          .button {
            width: 100%;
            box-sizing: border-box;
            padding: 12px 24px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="email-body">
          <div class="header">
            <h1>Reset Your PIN</h1>
          </div>
          <div class="content">
            <p>Hi there,</p>
            <p>We received a request to reset your PIN for your account on <b>BloomKnot</b>. Click the button below to reset your PIN. This link will expire in 30 minutes:</p>
            <div class="button-container">
              <a href="${resetUrl}" class="button">Reset Your PIN</a>
            </div>
            <p>If you didn't request this, you can safely ignore this email.</p>
          </div>
          <div class="footer">
            <p>BloomKnot</p>
            <p>Please do not reply to this email. If you need help, contact support at support@yourcollege.com</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `,
  text: `Hi there,

    We received a request to reset your PIN for your account on BloomKnot. Use the following link to reset your PIN. This link will expire in 30 minutes:

    ${resetUrl}

    If you didn't request this, you can safely ignore this email.

    BloomKnot
    Please do not reply to this email. If you need help, contact support at support@bloomknot.com
  `
});

export default getResetPasswordEmail;