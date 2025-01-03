import React from 'react';
import { ChevronRight, Calendar, MapPin, Utensils, Camera, Music, Gift, Heart, Users, Star } from 'lucide-react';
import FAQ from './FAQ';
import { Link } from 'react-router';

const LandingPage: React.FC = () => {
  return (
    <div className="bg-cream text-gold">
      {/* Hero Section */}
      <section className="relative py-44 flex items-center justify-center" style={{ backgroundImage: "url('/main_bg.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Plan Your Perfect Wedding</h1>
          <p className="text-xl md:text-2xl mb-8">All-in-one platform for your dream wedding</p>
          <Link to='/auth/signup' className="bg-gold text-cream px-6 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-colors">
            Start Planning
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">Plan Every Detail</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div className="space-y-8">
            {[
              { icon: <MapPin size={32} />, title: "Venue Selection", description: "Choose from mountains, beaches, palaces, and more" },
              { icon: <Utensils size={32} />, title: "Cuisine Combos", description: "Select from curated meal plans for your guests" },
              { icon: <Calendar size={32} />, title: "Wedding Type", description: "Luxury, Minimal, Traditional, and more options" },
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md flex items-start">
                <div className="text-gold mr-4 mt-1">{feature.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-8">
            {[
              { icon: <Camera size={32} />, title: "Photography", description: "Capture your special moments professionally" },
              { icon: <Music size={32} />, title: "Entertainment", description: "From magic shows to live performances" },
              { icon: <Gift size={32} />, title: "Add-Ons", description: "Customized cakes, live painters, and more" },
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md flex items-start">
                <div className="text-gold mr-4 mt-1">{feature.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gold text-cream py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Sign up and create your account",
              "Select your wedding type and preferences",
              "Choose venues, cuisine, and entertainment",
              "Add pre and post-wedding events",
              "Manage your guest list with our tools",
              "Finalize details with our expert planners",
            ].map((step, index) => (
              <div key={index} className="bg-cream text-gold p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="bg-gold text-cream rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold">{step}</h3>
                </div>
                <p className="text-gray-700">Our intuitive platform guides you through each step, ensuring a smooth planning process.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">What Our Couples Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Sarah & John", quote: "Planning our wedding was a breeze with this platform. Everything we needed was in one place!" },
              { name: "Emily & Michael", quote: "The variety of options for venues and vendors was impressive. We found exactly what we were looking for." },
              { name: "Jessica & David", quote: "The AI recommendations were spot-on! It felt like having a personal wedding planner at our fingertips." },
            ].map((testimonial, index) => (
              <div key={index} className="bg-cream p-6 rounded-lg shadow-md">
                <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
                <p className="font-semibold text-gold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-gold text-cream py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Our Success in Numbers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Heart size={48} />, stat: "10,000+", label: "Happy Couples" },
              { icon: <MapPin size={48} />, stat: "500+", label: "Venues" },
              { icon: <Users size={48} />, stat: "1,000+", label: "Vendors" },
              { icon: <Star size={48} />, stat: "4.9/5", label: "Average Rating" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 flex justify-center">{item.icon}</div>
                <h3 className="text-3xl font-bold mb-2">{item.stat}</h3>
                <p className="text-xl">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <FAQ />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gold text-cream py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between">
          <div className="text-center lg:text-left mb-8 lg:mb-0">
            <h2 className="text-4xl font-bold mb-4">Ready to Start Planning?</h2>
            <p className="text-xl">Join thousands of happy couples who planned their perfect wedding with us</p>
          </div>
          <button className="bg-cream text-gold px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-colors inline-flex items-center">
            Get Started <ChevronRight size={20} className="ml-2" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
