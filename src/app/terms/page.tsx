// src/app/terms/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service - SulaimanDev',
  description: 'Terms and conditions governing the use of SulaimanDev portfolio website.',
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-900 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl border border-cyan-500/30 p-8 md:p-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6">
            Terms of Service
          </h1>
          <p className="text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-invert prose-slate max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-300">
                By accessing and using SulaimanDev ("the Website"), you accept and agree to be bound by 
                the terms and provision of this agreement. If you do not agree to abide by these terms, 
                please do not use this Website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">2. Intellectual Property Rights</h2>
              <p className="text-gray-300 mb-4">
                Unless otherwise indicated, the Website is our proprietary property and all source code, 
                databases, functionality, software, website designs, audio, video, text, photographs, and 
                graphics on the Website (collectively, the "Content") and the trademarks, service marks, 
                and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, 
                and are protected by copyright and trademark laws and various other intellectual property 
                rights and unfair competition laws.
              </p>
              <p className="text-gray-300">
                The Content and Marks are provided on the Website "AS IS" for your information and personal 
                use only. No part of the Website and no Content or Marks may be copied, reproduced, aggregated, 
                republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, 
                sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express 
                prior written permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">3. User Representations</h2>
              <p className="text-gray-300 mb-4">By using the Website, you represent and warrant that:</p>
              <ul className="text-gray-300 list-disc list-inside mb-4">
                <li>You have the legal capacity and you agree to comply with these Terms of Service</li>
                <li>You will not use the Website for any illegal or unauthorized purpose</li>
                <li>Your use of the Website will not violate any applicable law or regulation</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">4. Prohibited Activities</h2>
              <p className="text-gray-300 mb-4">
                You may not access or use the Website for any purpose other than that for which we make 
                the Website available. The Website may not be used in connection with any commercial 
                endeavors except those that are specifically endorsed or approved by us.
              </p>
              <p className="text-gray-300 mb-2">As a user of the Website, you agree not to:</p>
              <ul className="text-gray-300 list-disc list-inside mb-4">
                <li>Systematically retrieve data or other content from the Website to create or compile a collection</li>
                <li>Make any unauthorized use of the Website, including collecting usernames and/or email addresses</li>
                <li>Use the Website to advertise or offer to sell goods and services</li>
                <li>Circumvent, disable, or otherwise interfere with security-related features of the Website</li>
                <li>Engage in unauthorized framing of or linking to the Website</li>
                <li>Upload or transmit viruses, Trojan horses, or other material that interferes with any party's use of the Website</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">5. Website Management</h2>
              <p className="text-gray-300 mb-4">
                We reserve the right, but not the obligation, to:
              </p>
              <ul className="text-gray-300 list-disc list-inside mb-4">
                <li>Monitor the Website for violations of these Terms of Service</li>
                <li>Take appropriate legal action against anyone who violates the law or these Terms of Service</li>
                <li>Refuse, restrict access to, or disable any of your contributions</li>
                <li>Otherwise manage the Website in a manner designed to protect our rights and property</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">6. Privacy Policy</h2>
              <p className="text-gray-300">
                We care about data privacy and security. Please review our 
                <Link href="/privacy" className="text-cyan-400 hover:text-cyan-300 mx-1">
                  Privacy Policy
                </Link>
                . By using the Website, you agree to be bound by our Privacy Policy, which is incorporated 
                into these Terms of Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">7. Modifications and Interruptions</h2>
              <p className="text-gray-300 mb-4">
                We reserve the right to change, modify, or remove the contents of the Website at any time 
                or for any reason at our sole discretion without notice. However, we have no obligation to 
                update any information on our Website.
              </p>
              <p className="text-gray-300">
                We cannot guarantee the Website will be available at all times. We may experience hardware, 
                software, or other problems or need to perform maintenance related to the Website, resulting 
                in interruptions, delays, or errors.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">8. Governing Law</h2>
              <p className="text-gray-300">
                These Terms of Service and your use of the Website are governed by and construed in accordance 
                with the laws of Nigeria applicable to agreements made and to be entirely performed within Nigeria, 
                without regard to its conflict of law principles.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">9. Disclaimer</h2>
              <p className="text-gray-300 mb-4">
                THE WEBSITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE 
                WEBSITE WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL 
                WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE WEBSITE AND YOUR USE THEREOF.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">10. Contact Information</h2>
              <p className="text-gray-300 mb-4">
                If you have any questions or comments about these Terms of Service, please contact us at:
              </p>
              <ul className="text-gray-300 list-disc list-inside">
                <li>Email: aremusulaiman2002@gmail.com</li>
                <li>Phone: +234 707 350 4211</li>
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