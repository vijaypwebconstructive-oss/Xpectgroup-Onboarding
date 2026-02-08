import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send invitation email with onboarding link and OTP
 * @param {string} email - Recipient email
 * @param {string} employeeName - Employee name
 * @param {string} onboardingUrl - Onboarding URL with token
 * @param {string} otp - 6-digit OTP
 */
export const sendInvitationEmail = async (email, employeeName, onboardingUrl, otp) => {
  try {
    if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) {
      console.error('❌ Resend not configured. Please set RESEND_API_KEY and EMAIL_FROM in .env');
      throw new Error('Email service not configured');
    }

    const subject = 'Xpect Group – Employee Onboarding Invitation';
    const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Xpect Group Onboarding Invitation</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #f2f6f9; padding: 30px; border-radius: 10px;">
            <h2 style="color: #2e4150; margin-top: 0;">Welcome to Xpect Group, ${employeeName}!</h2>
            
            <p>You have been invited to join Xpect Group. Please complete your onboarding by following the link below:</p>
            
            <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2e4150;">
              <p style="margin: 0 0 10px 0; font-weight: bold; color: #2e4150;">Onboarding Link:</p>
              <a href="${onboardingUrl}" style="color: #135bec; text-decoration: none; word-break: break-all; font-size: 14px;">${onboardingUrl}</a>
            </div>
            
            <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
              <p style="margin: 0 0 10px 0; font-weight: bold; color: #92400e;">Your OTP Code:</p>
              <p style="font-size: 24px; font-weight: bold; color: #2e4150; margin: 10px 0; letter-spacing: 4px; font-family: monospace;">${otp}</p>
              <p style="margin: 10px 0 0 0; font-size: 12px; color: #92400e;">⚠️ This OTP will expire in 10 minutes.</p>
            </div>
            
            <p style="margin-top: 30px; font-size: 14px; color: #666;">
              <strong>Instructions:</strong><br>
              1. Click the onboarding link above<br>
              2. Enter the OTP code when prompted<br>
              3. Complete the onboarding form
            </p>
            
            <p style="margin-top: 30px; font-size: 12px; color: #999; border-top: 1px solid #e7ebf3; padding-top: 20px;">
              If you did not expect this invitation, please ignore this email.<br>
              This is an automated message from Xpect Group.
            </p>
          </div>
        </body>
        </html>
      `;
    const text = `
Xpect Group – Employee Onboarding Invitation

Welcome to Xpect Group, ${employeeName}!

You have been invited to join Xpect Group. Please complete your onboarding by following the link below:

Onboarding Link:
${onboardingUrl}

Your OTP Code: ${otp}

⚠️ This OTP will expire in 10 minutes.

Instructions:
1. Click the onboarding link above
2. Enter the OTP code when prompted
3. Complete the onboarding form

If you did not expect this invitation, please ignore this email.
This is an automated message from Xpect Group.
      `;

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: [email],
      subject,
      html,
      text
    });

    if (error) {
      console.error('❌ Resend error sending email:', error);
      throw new Error('Failed to send email');
    }

    console.log('✅ Email sent successfully:', {
      messageId: data?.id,
      to: email,
      subject
    });

    return {
      success: true,
      messageId: data?.id,
      to: email
    };
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

/**
 * Send OTP resend email
 * @param {string} email - Recipient email
 * @param {string} employeeName - Employee name
 * @param {string} onboardingUrl - Onboarding URL with token
 * @param {string} otp - New 6-digit OTP
 */
export const sendOTPResendEmail = async (email, employeeName, onboardingUrl, otp) => {
  try {
    if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) {
      console.error('❌ Resend not configured. Please set RESEND_API_KEY and EMAIL_FROM in .env');
      throw new Error('Email service not configured');
    }

    const subject = 'Xpect Group – Your Onboarding OTP';
    const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #f2f6f9; padding: 30px; border-radius: 10px;">
            <h2 style="color: #2e4150; margin-top: 0;">Your OTP Has Been Resent</h2>
            
            <p>Dear ${employeeName},</p>
            
            <p>Your OTP has been resent. Please use the code below to verify your identity:</p>
            
            <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
              <p style="margin: 0 0 10px 0; font-weight: bold; color: #92400e;">Your OTP Code:</p>
              <p style="font-size: 24px; font-weight: bold; color: #2e4150; margin: 10px 0; letter-spacing: 4px; font-family: monospace;">${otp}</p>
              <p style="margin: 10px 0 0 0; font-size: 12px; color: #92400e;">⚠️ This OTP will expire in 10 minutes.</p>
            </div>
            
            <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2e4150;">
              <p style="margin: 0 0 10px 0; font-weight: bold; color: #2e4150;">Onboarding Link:</p>
              <a href="${onboardingUrl}" style="color: #135bec; text-decoration: none; word-break: break-all; font-size: 14px;">${onboardingUrl}</a>
            </div>
            
            <p style="margin-top: 30px; font-size: 12px; color: #999; border-top: 1px solid #e7ebf3; padding-top: 20px;">
              This is an automated message from Xpect Group.
            </p>
          </div>
        </body>
        </html>
      `;
    const text = `
Xpect Group – Your Onboarding OTP

Dear ${employeeName},

Your OTP has been resent. Please use the code below to verify your identity:

Your OTP Code: ${otp}

⚠️ This OTP will expire in 10 minutes.

Onboarding Link:
${onboardingUrl}

This is an automated message from Xpect Group.
      `;

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: [email],
      subject,
      html,
      text
    });

    if (error) {
      console.error('❌ Resend error resending OTP email:', error);
      throw new Error('Failed to send email');
    }

    console.log('✅ OTP resend email sent:', {
      messageId: data?.id,
      to: email
    });

    return {
      success: true,
      messageId: data?.id,
      to: email
    };
  } catch (error) {
    console.error('❌ Error resending OTP email:', error);
    throw new Error('Failed to send email');
  }
};
