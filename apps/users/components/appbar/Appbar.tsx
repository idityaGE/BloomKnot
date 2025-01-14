import React, { useState } from 'react';
import { NavLink, Link } from 'react-router';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/contact' },
  { name: 'About', path: '/about' },
];

const Appbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-cream text-gold p-4 px-10 absolute inset-x-0 top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to='/' className="flex items-center">
          <img src="/logo.png" alt="BloomKnot" className="h-10 mr-4 object-cover" />
          <span className="text-2xl font-bold">BloomKnot</span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-4 md:space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `hover:text-opacity-75 ${isActive ? 'font-bold' : ''}`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <button className="bg-gold text-cream px-4 py-2 rounded hover:bg-opacity-90 transition-colors">
            Book Now
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gold"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden mt-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `block py-2 px-4 hover:bg-gold hover:text-cream ${isActive ? 'font-bold' : ''
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
          <button
            className="block w-full text-left bg-gold text-cream px-4 py-2 mt-2 rounded hover:bg-opacity-90 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Book Now
          </button>
        </div>
      )}
    </nav>
  );
};

export default Appbar;