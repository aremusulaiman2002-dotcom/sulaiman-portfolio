// src/utils/packageEmailService.ts
import emailjs from 'emailjs-com';

const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_7mduaza',
  PACKAGE_TEMPLATE_ID: 'template_xk2lhrw', // ← Replace with your new template ID
  CONTACT_TEMPLATE_ID: 'template_4k8l2ji', // Keep the existing contact template
  PUBLIC_KEY: 'lFnpe0Ko4s_TW4Ims'
};

export const sendPackageInquiry = async (data: any) => {
  try {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    
    const templateParams = {
      to_email: 'aremusulaiman2002@gmail.com',
      from_name: data.contactInfo?.name || 'Unknown Client',
      from_email: data.contactInfo?.email || 'No email provided',
      client_name: data.contactInfo?.name || 'Not provided',
      client_email: data.contactInfo?.email || 'Not provided',
      client_phone: data.contactInfo?.phone || 'Not provided',
      client_company: data.contactInfo?.company || 'Not provided',
      package_name: data.package?.name || 'No package selected',
      package_price: data.package?.price || '$0',
      total_price: data.totalPrice || '$0',
      addons: data.addons?.join(', ') || 'None',
      timeline: data.timeline || 'standard',
      support_level: data.supportLevel || 'basic',
      project_details: data.projectDetails || 'No details provided',
      meeting_description: data.meetingDescription || 'No description provided',
      subject: `Package Inquiry: ${data.package?.name || 'Unknown Package'} - ${data.contactInfo?.name || 'Unknown Client'}`,
      reply_to: data.contactInfo?.email || 'aremusulaiman2002@gmail.com'
    };

    console.log('Sending package inquiry email...');
    
    const result = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.PACKAGE_TEMPLATE_ID, // Use the new package template
      templateParams
    );
    
    console.log('Package inquiry email sent successfully!');
    return { success: true, result };
  } catch (error) {
    console.error('Package email sending failed:', error);
    return { success: false, error };
  }
};

// Keep the existing contact function if needed
export const sendContactInquiry = async (data: any) => {
  try {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    
    const result = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.CONTACT_TEMPLATE_ID, // Use the contact template
      {
        to_email: 'aremusulaiman2002@gmail.com',
        from_name: data.name,
        from_email: data.email,
        message: data.message,
        subject: `Contact Form: ${data.name}`,
        reply_to: data.email
      }
    );
    
    return { success: true, result };
  } catch (error) {
    console.error('Contact email sending failed:', error);
    return { success: false, error };
  }
};