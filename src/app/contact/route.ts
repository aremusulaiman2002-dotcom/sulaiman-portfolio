// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields - FIXED THE SYNTAX ERROR
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: email,
      to: process.env.CONTACT_EMAIL,
      subject: `New Contact Form: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #06b6d4, #3b82f6); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 15px; }
            .field-label { font-weight: bold; color: #06b6d4; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact Form Submission</h1>
              <p>From your portfolio website</p>
            </div>
            <div class="content">
              <div class="field">
                <span class="field-label">Name:</span> ${name}
              </div>
              <div class="field">
                <span class="field-label">Email:</span> ${email}
              </div>
              <div class="field">
                <span class="field-label">Subject:</span> ${subject}
              </div>
              <div class="field">
                <span class="field-label">Message:</span>
                <p>${message.replace(/\n/g, '<br>')}</p>
              </div>
              <div class="field">
                <span class="field-label">Timestamp:</span> ${new Date().toLocaleString()}
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { message: 'Error sending email. Please try again later.' },
      { status: 500 }
    );
  }
}