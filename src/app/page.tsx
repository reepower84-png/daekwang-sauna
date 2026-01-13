import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Benefits from '@/components/Benefits';
import Why from '@/components/Why';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import KakaoFloatingButton from '@/components/KakaoFloatingButton';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Benefits />
      <Why />
      <ContactForm />
      <Footer />
      <KakaoFloatingButton />
    </main>
  );
}
