import emailjs from 'emailjs-com';

const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_7mduaza',
  TEMPLATE_ID: 'template_4k8l2ji', 
  PUBLIC_KEY: 'lFnpe0Ko4s_TW4Ims'
};

export const sendEmail = async (formData: {
  name: string;        // Changed from from_name
  email: string;       // Changed from from_email
  message: string;
  subject?: string;    // Added subject
  to_email?: string;
}) => {
  try {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    
    const result = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      {
        name: formData.name,        // Make sure these match
        email: formData.email,      // your EmailJS template
        message: formData.message,
        subject: formData.subject || 'New message from portfolio',
        to_email: formData.to_email || 'aremusulaiman2002@gmail.com'
      }
    );
    
    return { success: true, result };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
};