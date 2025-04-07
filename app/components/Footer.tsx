// app/components/Footer.tsx
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 px-6 py-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo / About */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Travel Mate</h2>
          <p className="mt-2 text-sm text-gray-600">
            Explore the world, plan itineraries, personalized travel assistant all in one place.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-md font-medium text-gray-900 mb-2">Links</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/" className="hover:text-black">Home</a></li>
            <li><a href="/" className="hover:text-black">About</a></li>
            <li><a href="/listing" className="hover:text-black">Features</a></li>
            <li><a href="/" className="hover:text-black">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-md font-medium text-gray-900 mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="hover:text-black"><Facebook size={20} /></a>
            <a href="#" aria-label="Twitter" className="hover:text-black"><Twitter size={20} /></a>
            <a href="#" aria-label="Instagram" className="hover:text-black"><Instagram size={20} /></a>
            <a href="https://www.linkedin.com/in/lincy-thomas-518660252?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" aria-label="LinkedIn" className="hover:text-black"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-300 pt-4 text-center text-sm text-gray-500">
        © Designed by Lincy, 2025 Travel Mate. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
