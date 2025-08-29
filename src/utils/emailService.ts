// src/utils/emailService.ts
import emailjs from 'emailjs-com';

const SERVICE_ID = 'your_service_id';
const TEMPLATE_ID = 'your_template_id';
const PUBLIC_KEY = 'your_public_key';

export const sendEmail = async (formData: any): Promise<boolean> => {
  try {
    const result = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      formData,
      PUBLIC_KEY
    );
    return result.status === 200;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};