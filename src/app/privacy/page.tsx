// src/app/privacy/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy - SulaimanDev',
  description: 'Learn how SulaimanDev collects, uses, and protects your personal information.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-900 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl border border-cyan-500/30 p-8 md:p-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6">
            Privacy Policy
          </h1>
          <p className="text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-invert prose-slate max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">1. Introduction</h2>
              <p className="text-gray-300 mb-4">
                Welcome to SulaimanDev. This Privacy Policy explains how we collect, use, disclose, 
                and safeguard your information when you visit our portfolio website.
              </p>
              <p className="text-gray-300">
                By using our website, you consent to the data practices described in this Privacy Policy. 
                If you do not agree with the data practices described, you should not use our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-medium text-gray-300 mb-2">Personal Data</h3>
              <p className="text-gray-300 mb-4">
                We may collect personally identifiable information that you voluntarily provide to us when you:
              </p>
              <ul className="text-gray-300 list-disc list-inside mb-4">
                <li>Contact us through our contact form</li>
                <li>Subscribe to our newsletter</li>
                <li>Request information about our services</li>
              </ul>
              <p className="text-gray-300 mb-4">
                This information may include your name, email address, phone number, and any message content.
              </p>

              <h3 className="text-xl font-medium text-gray-300 mb-2">Usage Data</h3>
              <p className="text-gray-300">
                We automatically collect certain information about your device and how you interact with our website, including:
              </p>
              <ul className="text-gray-300 list-disc list-inside mb-4">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring websites</li>
                <li>Device information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-300 mb-2">We may use the information we collect for various purposes, including to:</p>
              <ul className="text-gray-300 list-disc list-inside mb-4">
                <li>Provide, operate, and maintain our website</li>
                <li>Respond to your inquiries and offer support</li>
                <li>Send you technical notices and updates</li>
                <li>Monitor and analyze usage patterns to improve our website</li>
                <li>Prevent fraudulent activities and enhance security</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">4. Cookies and Tracking Technologies</h2>
              <p className="text-gray-300 mb-4">
                We use cookies and similar tracking technologies to track activity on our website and store certain information. 
                Cookies are files with a small amount of data that may include an anonymous unique identifier.
              </p>
              <p className="text-gray-300">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, 
                if you do not accept cookies, you may not be able to use some portions of our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">5. Data Security</h2>
              <p className="text-gray-300">
                We implement appropriate technical and organizational measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission 
                over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">6. Your Data Protection Rights</h2>
              <p className="text-gray-300 mb-4">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="text-gray-300 list-disc list-inside mb-4">
                <li>The right to access, update, or delete your information</li>
                <li>The right of rectification if your information is inaccurate</li>
                <li>The right to object to our processing of your personal data</li>
                <li>The right to request that we restrict the processing of your personal information</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">7. Third-Party Services</h2>
              <p className="text-gray-300 mb-4">
                We may employ third-party companies and individuals to facilitate our website, provide services on our behalf, 
                or assist us in analyzing how our website is used. These third parties have access to your personal information 
                only to perform these tasks and are obligated not to disclose or use it for any other purpose.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">8. Changes to This Privacy Policy</h2>
              <p className="text-gray-300 mb-4">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
                the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
              <p className="text-gray-300">
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy 
                are effective when they are posted on this page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">9. Contact Us</h2>
              <p className="text-gray-300 mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <ul className="text-gray-300 list-disc list-inside">
                <li>By email: aremusulaiman2002@gmail.com</li>
                <li>By phone: +234 707 350 4211</li>
                <li>Through our website contact form</li>
              </ul>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-700">
            <Link 
              href="/"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}