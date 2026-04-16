import { FaFacebook, FaWhatsapp, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-900 via-green-800 to-green-900 text-yellow-100 mt-auto border-t border-yellow-500 shadow-lg">
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* About Section */}
        <div>
          <h3 className="text-lg font-bold mb-3">🌱Krishi Mitras
          </h3>
          <p className="text-sm leading-relaxed">
            Empowering farmers with modern tools, real-time mandi prices,
            weather updates, and training to grow smarter and earn better.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-yellow-300">Dashboard</a></li>
            <li><a href="/training" className="hover:text-yellow-300">Training</a></li>
            <li><a href="/weather" className="hover:text-yellow-300">Weather</a></li>
            <li><a href="/mandi-prices" className="hover:text-yellow-300">Mandi Prices</a></li>
            <li><a href="/profile" className="hover:text-yellow-300">Profile</a></li>
          </ul>
        </div>

        {/* Contact + Social */}
        <div>
          <h3 className="text-lg font-bold mb-3">Contact Us</h3>
          <p className="text-sm">📍 NIT Jalandhar, Punjab, India</p>
          <p className="text-sm">📧 support@kishanmitra.com</p>
          <p className="text-sm mb-4">📞 +91 98765 43210</p>

          <div className="flex justify-center md:justify-start gap-5 text-xl">
            <a href="#" className="hover:text-yellow-300"><FaWhatsapp /></a>
            <a href="#" className="hover:text-yellow-300"><FaFacebook /></a>
            <a href="#" className="hover:text-yellow-300"><FaYoutube /></a>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="bg-green-950 text-center py-3 text-xs border-t border-yellow-700">
        &copy; {new Date().getFullYear()} <span className="font-semibold">Kishan Mitra</span>. All Rights Reserved.  
        <span className="ml-2 italic">"Technology for better farming"</span>
      </div>
    </footer>
  );
};

export default Footer;
