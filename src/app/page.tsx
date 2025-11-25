import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import AIChat from '@/components/Innovative/AIChat';
import Advanced3DScene from '@/components/Innovative/Advanced3DScene';
import VoiceCommandIndicator from '@/components/Innovative/VoiceCommandIndicator';
import ServicesSection from '@/components/Services/ServicesSection';
import ProjectsSection from '@/components/Projects/ProjectsSection';
import SkillsSection from '@/components/Skills/SkillsSection';
import AboutSection from '@/components/About/AboutSection';
import TestimonialsSection from '@/components/Testimonials/TestimonialsSection';
import BookingSection from '@/components/Booking/BookingSection';
import ContactSection from '@/components/Contacts/ContactSection';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      
      <section id="home">
        <Hero />
      </section>
      
      <AIChat />
      
      <section id="services">
        <ServicesSection />
      </section> 

      <section id="projects">
        <ProjectsSection />
      </section>

      <section id="skills">
        <SkillsSection />
      </section>

      <section id="about">
        <AboutSection />
      </section>

      <section id="testimonials">
        <TestimonialsSection />
      </section>

      <section id="booking">
        <BookingSection />
      </section>

       <section id="contact">
        <ContactSection />
      </section>

      <Footer />
    </main>
  );
}