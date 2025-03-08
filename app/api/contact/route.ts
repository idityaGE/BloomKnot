import { NextResponse } from "next/server";
import { sendMail } from "@/services/mail/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Input validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create HTML email content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #d4af37; border-bottom: 2px solid #f3f4f6; padding-bottom: 10px;">New Contact Message from BloomKnot Website</h2>
        
        <div style="margin: 20px 0;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
        </div>
        
        <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #4b5563;">Message:</h3>
          <p style="white-space: pre-line;">${message}</p>
        </div>
        
        <p style="font-size: 12px; color: #6b7280; margin-top: 30px; text-align: center;">
          This message was sent from the contact form on the BloomKnot website.
        </p>
      </div>
    `;

    const mailTo = process.env.MAIL_USER
    if (!mailTo) {
      return NextResponse.json(
        { error: "Failed to send email : mailTo to is not found" },
        { status: 402 }
      )
    }

    // Send email using your mail service
    const success = await sendMail({
      to: mailTo || "contact@bloomknot.com", // Change this to your desired recipient
      subject: `BloomKnot Contact: ${subject}`,
      html: htmlContent,
    });

    // Also send an auto-reply to the user
    const autoReplyHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #d4af37; text-align: center; padding-bottom: 10px;">Thank You for Contacting BloomKnot</h2>
        
        <p>Dear ${name},</p>
        
        <p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible, typically within 24 hours.</p>
        
        <p>Here's a summary of your inquiry:</p>
        
        <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong> ${message.substring(0, 100)}${message.length > 100 ? '...' : ''}</p>
        </div>
        
        <p>If you have any urgent matters, please don't hesitate to call us at +1 (555) 123-4567.</p>
        
        <p>Warm regards,<br>The BloomKnot Team</p>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <img src="https://your-site.com/logo.png" alt="BloomKnot Logo" style="max-width: 120px;">
          <p style="color: #6b7280; font-size: 12px;">
            123 Wedding Way, Celebration City, AB 12345<br>
            <a href="mailto:hello@bloomknot.com" style="color: #d4af37; text-decoration: none;">hello@bloomknot.com</a>
          </p>
        </div>
      </div>
    `;

    await sendMail({
      to: email,
      subject: "Thank You for Contacting BloomKnot",
      html: autoReplyHtml,
    });

    if (!success) {
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
