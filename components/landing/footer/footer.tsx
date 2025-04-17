'use client';

import Link from "next/link"
import { motion } from "framer-motion"
import { HeartHandshake, Mail, MapPin, Phone, Twitter, Instagram } from "lucide-react"

const navigation = {
  main: [
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    // { name: "Portfolio", href: "/portfolio" },
    // { name: "Testimonials", href: "/testimonials" },
    // { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
  services: [
    { name: "Full Planning", href: "#" },
    { name: "Partial Planning", href: "#" },
    { name: "Day-of Coordination", href: "#" },
    { name: "Destination Weddings", href: "#" },
  ],
  social: [
    {
      name: "Instagram",
      href: "https://www.instagram.com/bloomknot2025?igsh=c3F4Z3UwcmR6Mmkx",
      icon: () => (
        <Instagram />
      ),
    },
    {
      name: "X",
      href: "https://x.com/Bloomknot_ltd",
      icon: () => (
        <Twitter />
      ),
    },
  ],
}

function Footer() {
  return (
    <footer className="border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        {/* Top section */}
        <div className="grid grid-cols-1 gap-10 pb-12 md:grid-cols-2 lg:grid-cols-4 border-b border-gray-100">
          {/* Company information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <HeartHandshake className="text-gold h-6 w-6" />
              <span className="font-bold text-2xl">BloomKnot</span>
            </div>
            <p className="text-gray-600 text-sm mt-4 leading-relaxed">
              Let us create the perfect celebration of your love story. From intimate gatherings to grand celebrations, we make your dream wedding a reality.
            </p>
            <div className="mt-8 flex space-x-2">
              {navigation.social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="bg-cream p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-gold"
                >
                  {item.icon()}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:ml-8"
          >
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-gold transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-lg mb-4">Our Services</h3>
            <ul className="space-y-2">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-gold transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-lg mb-4">Get In Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <span className="text-gray-600 text-sm">
                  Jaipur, Rajasthan 
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gold shrink-0" />
                <span className="text-gray-600 text-sm">+91 8306919764</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gold shrink-0" />
                <span className="text-gray-600 text-sm">mohatosh@bloomknot.in</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Brand and copyright */}
        <div className="mt-12 flex flex-col lg:flex-row items-center justify-between">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 lg:mt-0 text-sm text-gray-500 text-center lg:text-right"
          >
            &copy; {new Date().getFullYear()} BloomKnot Wedding Planning. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
