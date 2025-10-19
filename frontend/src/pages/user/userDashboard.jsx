import React, { useState } from 'react';
// Note: This application is designed as a single file component.
// Tailwind CSS is assumed to be available globally in the environment.

// --- Icon Components (Inline SVG for modern look and single-file mandate) ---

const BrainIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a2 2 0 0 0-2 2v.5c0 .3-.1.5-.3.7l-1.4 1.5c-.2.2-.4.3-.6.3h-1c-.5 0-1 .4-1 .9v1c0 .5.4 1 .9 1h1c.2 0 .4.1.6.3l1.4 1.5c.2.2.3.4.3.7v.5a2 2 0 0 0 2 2 2 2 0 0 0 2-2v-.5c0-.3.1-.5.3-.7l1.4-1.5c.2-.2.4-.3.6-.3h1c.5 0 1-.4 1-.9v-1c0-.5-.4-1-.9-1h-1c-.2 0-.4-.1-.6-.3l-1.4-1.5c-.2-.2-.3-.4-.3-.7v-.5a2 2 0 0 0-2-2Z"/><path d="M8 12.5a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0-5 0Z"/><path d="M16 12.5a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0-5 0Z"/><path d="M12 7.5a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0-5 0Z"/><path d="M12 17.5a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0-5 0Z"/><path d="M7 17.5a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0-5 0Z"/></svg>
);

const ZapIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
);

const UserCheckIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
);


// --- Components for Sections ---

const HeroSection = () => (
  <div className="relative pt-20 pb-32 bg-gray-900 overflow-hidden">
    {/* Background Gradient Effect */}
    <div className="absolute inset-0 z-0 opacity-20">
      <div className="w-full h-full bg-gradient-to-br from-indigo-800 to-gray-900"></div>
    </div>
    
    <div className="relative container mx-auto px-4 z-10 text-center">
      <p className="text-sm font-semibold uppercase text-cyan-400 mb-3 tracking-widest">
        The 2024 Innovation Summit
      </p>
      <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
        Mastering the <span className="text-cyan-400">Generative Era</span>
      </h1>
      <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
        Unlock practical strategies to integrate AI into your workflow, boost productivity, and drive exponential growth in the next quarter.
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <a href="#register" className="w-full sm:w-auto px-10 py-4 bg-cyan-500 text-gray-900 font-bold text-lg rounded-xl shadow-lg hover:bg-cyan-400 transition duration-300 transform hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-cyan-500 focus:ring-opacity-50">
          Secure Your Spot Now
        </a>
        <p className="text-lg font-medium text-white/80">
          October 25, 2024 | 9:00 AM - 5:00 PM EST
        </p>
      </div>
    </div>
  </div>
);

const FeaturesSection = () => {
  const features = [
    { icon: BrainIcon, title: "AI-Driven Strategy", description: "Learn how market leaders are leveraging deep learning models for competitive advantage." },
    { icon: ZapIcon, title: "Productivity Boost", description: "Discover toolchains and methods to automate 70% of routine tasks using contemporary AI services." },
    { icon: UserCheckIcon, title: "Ethical Implementation", description: "A deep dive into governance, data privacy, and building responsible AI frameworks for your team." },
  ];

  return (
    <div className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-16">
          What You Will Master
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 border border-gray-100 transform hover:-translate-y-1"
            >
              <feature.icon className="w-10 h-10 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SpeakerSection = () => (
  <div className="py-24 bg-indigo-50">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-indigo-900 text-center mb-16">
        Meet Your Keynote Speaker
      </h2>
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-12 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12">
        
        {/* Speaker Image Placeholder */}
        <div className="flex-shrink-0 w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-cyan-500/50 shadow-md">
          {/* Using a placeholder image URL for the speaker */}
          <img 
            src="https://placehold.co/192x192/4338ca/ffffff?text=Ava+Chen" 
            alt="Keynote Speaker Ava Chen" 
            className="w-full h-full object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/192x192/4338ca/ffffff?text=Ava+Chen" }}
          />
        </div>
        
        {/* Speaker Info */}
        <div className="flex-grow text-center md:text-left">
          <h3 className="text-3xl font-extrabold text-gray-900 mb-2">Ava Chen, Ph.D.</h3>
          <p className="text-xl font-medium text-cyan-600 mb-4">Chief Innovation Officer, MetaFusion Labs</p>
          <p className="text-gray-700 leading-relaxed">
            Dr. Chen is a globally recognized authority on machine learning application in complex business environments. With two decades of experience leading breakthrough research, she currently guides MetaFusion's strategy on ethical and scalable AI adoption. She holds multiple patents and advises Fortune 500 companies on future-proofing their technology stacks.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const RegistrationSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would handle form submission here (API call, validation).
    setIsSubmitted(true);
    // Simulate clearing the form after a delay if needed, but for this demo, we show success immediately.
  };

  if (isSubmitted) {
    return (
      <div id="register" className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-6 rounded-lg shadow-xl text-center">
            <h3 className="text-2xl font-bold mb-2">Registration Complete! 🎉</h3>
            <p>Thank you for registering for the Generative Era Summit. A confirmation email has been sent to your inbox with event details.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="register" className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-6">
          Don't Miss Out
        </h2>
        <p className="text-xl text-gray-600 text-center mb-10">
          Register before the deadline to receive 50% off the standard price.
        </p>
        
        <div className="bg-indigo-700 p-8 md:p-12 rounded-3xl shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <p className="text-2xl font-bold text-white">Full Access Pass</p>
            <p className="text-3xl font-extrabold text-cyan-400">
              <span className="line-through text-indigo-300 mr-2 text-xl">$999</span>
              $499
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-white/90 mb-1">Full Name</label>
              <input
                type="text"
                id="name"
                required
                className="w-full p-3 border border-indigo-400 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 text-gray-900 shadow-sm"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-white/90 mb-1">Work Email</label>
              <input
                type="email"
                id="email"
                required
                className="w-full p-3 border border-indigo-400 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 text-gray-900 shadow-sm"
                placeholder="you@company.com"
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-4 bg-cyan-400 text-gray-900 font-bold text-xl rounded-xl shadow-lg hover:bg-cyan-300 transition duration-300 transform hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-cyan-500 focus:ring-opacity-50"
            >
              Register & Pay $499
            </button>
          </form>
          <p className="text-center text-sm text-indigo-200 mt-4">
            *Limited seats available at this reduced rate.
          </p>
        </div>
      </div>
    </div>
  );
};


const Footer = () => (
  <footer className="bg-gray-900 text-white/70 py-10">
    <div className="container mx-auto px-4 text-center text-sm">
      <p className="mb-2">
        &copy; 2024 Innovation Summit. All rights reserved.
      </p>
      <div className="space-x-4">
        <a href="#" className="hover:text-cyan-400 transition duration-150">Privacy Policy</a>
        <span className="text-white/50">|</span>
        <a href="#" className="hover:text-cyan-400 transition duration-150">Terms of Service</a>
        <span className="text-white/50">|</span>
        <a href="mailto:info@innovationsummit.com" className="hover:text-cyan-400 transition duration-150">Contact Us</a>
      </div>
    </div>
  </footer>
);

const UserDashboard = () => {
  return (
    <div className="min-h-screen antialiased font-sans">
      <HeroSection />
      <FeaturesSection />
      <SpeakerSection />
      <RegistrationSection />
      <Footer />
    </div>
  );
};

export default UserDashboard;
