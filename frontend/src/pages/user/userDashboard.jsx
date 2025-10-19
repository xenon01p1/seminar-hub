import React, { useState } from 'react';
import { Brain, Zap, UserCheck } from 'lucide-react';
const PRIMARY_COLOR = 'blue-500';
const PRIMARY_COLOR_DARK = 'blue-600';
const PRIMARY_COLOR_HOVER = 'blue-400';

const CalendarIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
);


// --- Mock Data ---

const SEMINARS_DATA = [
  {
    id: 1,
    img: "https://placehold.co/400x200/2563eb/ffffff?text=AI+Ethics",
    title: "Ethical AI: Beyond Compliance",
    description: "A deep dive into building bias-free, transparent, and responsible AI systems that stand up to scrutiny.",
    category: "Policy & Governance",
    startDate: "Nov 1, 2024",
  },
  {
    id: 2,
    img: "https://placehold.co/400x200/1d4ed8/ffffff?text=Prompt+Engineering",
    title: "Mastering Prompt Engineering for LLMs",
    description: "Learn advanced techniques to extract maximum value and predictable output from large language models.",
    category: "Technical Skills",
    startDate: "Nov 8, 2024",
  },
  {
    id: 3,
    img: "https://placehold.co/400x200/1e40af/ffffff?text=Business+Strategy",
    title: "Future-Proofing Your Business Strategy with GenAI",
    description: "How to restructure your organizational processes to leverage generative AI for exponential market growth.",
    category: "Leadership & Strategy",
    startDate: "Nov 15, 2024",
  },
];

const TESTIMONIALS_DATA = [
    {
        quote: "The best seminar I've attended all year. The actionable strategies on AI adoption were invaluable for our Q4 planning.",
        author: "Sarah J.",
        title: "CTO, TechCorp Solutions"
    },
    {
        quote: "Clear, modern, and immediately applicable. We saw a 20% boost in our content creation pipeline within a week!",
        author: "Mark C.",
        title: "Marketing Director, Global Agency"
    }
];


// --- Components for Sections ---

// 1. Modern Navbar
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <nav className="sticky top-0 z-50 bg-white shadow-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo/Title */}
                    <div className="flex items-center">
                        <span className={`text-2xl font-bold text-${PRIMARY_COLOR_DARK}`}>Innovation Summit</span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {['About', 'Seminars', 'Speakers', 'Register'].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className={`text-gray-600 hover:text-${PRIMARY_COLOR_DARK} px-3 py-2 rounded-md text-sm font-medium transition duration-150`}
                                >
                                    {item}
                                </a>
                            ))}
                            <a 
                                href="#register" 
                                className={`ml-4 px-4 py-2 bg-${PRIMARY_COLOR_DARK} text-white rounded-lg text-sm font-medium hover:bg-${PRIMARY_COLOR_HOVER} transition duration-150`}
                            >
                                Get Started
                            </a>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`p-2 rounded-md text-gray-500 hover:text-${PRIMARY_COLOR_DARK} focus:outline-none focus:ring-2 focus:ring-inset focus:ring-${PRIMARY_COLOR_DARK}`}
                        >
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Content */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
                        {['About', 'Seminars', 'Speakers', 'Register'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className={`text-gray-600 hover:text-${PRIMARY_COLOR_DARK} block px-3 py-2 rounded-md text-base font-medium text-center`}
                                onClick={() => setIsOpen(false)}
                            >
                                {item}
                            </a>
                        ))}
                        <a 
                            href="#register" 
                            className={`w-11/12 mt-2 px-3 py-2 bg-${PRIMARY_COLOR_DARK} text-white rounded-lg text-base font-medium text-center hover:bg-${PRIMARY_COLOR_HOVER} transition duration-150`}
                            onClick={() => setIsOpen(false)}
                        >
                            Get Started
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

// ---

// 2. Modern Hero Section
const HeroSection = () => (
    <div className={`relative pt-24 pb-40 bg-gray-50 overflow-hidden border-b-8 border-${PRIMARY_COLOR}`}>
        {/* Background Subtle Gradient Shape */}
        <div className="absolute inset-0 z-0 opacity-10">
            <div className={`w-full h-full bg-gradient-to-br from-white via-white to-${PRIMARY_COLOR}/30`}></div>
        </div>

        <div className="relative container mx-auto px-4 z-10 text-center">
            <p className={`text-md font-semibold uppercase text-${PRIMARY_COLOR_DARK} mb-4 tracking-widest bg-white/50 inline-block px-3 py-1 rounded-full ring-2 ring-${PRIMARY_COLOR_HOVER}`}>
                The 2024 Innovation Summit
            </p>
            <h1 className="text-6xl md:text-8xl font-extrabold text-gray-900 leading-none mb-6">
                Mastering the <span className={`text-${PRIMARY_COLOR_DARK}`}>Generative Era</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-10">
                Unlock **practical strategies** to integrate AI into your workflow, boost productivity, and drive exponential growth in the next quarter.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <a href="#register" className={`w-full sm:w-auto px-12 py-5 bg-${PRIMARY_COLOR_DARK} text-white font-extrabold text-lg rounded-xl shadow-2xl hover:bg-${PRIMARY_COLOR_HOVER} transition duration-300 transform hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-${PRIMARY_COLOR_DARK} focus:ring-opacity-50`}>
                    Secure Your Spot Now
                </a>
                <p className="text-lg font-medium text-gray-700 mt-4 sm:mt-0">
                    October 25, 2024 | **9:00 AM - 5:00 PM EST**
                </p>
            </div>
        </div>
    </div>
);

// ---

// 3. Modern Benefits/Features List
const FeaturesSection = () => {
    const features = [
        // Using imported Lucide icons
        { icon: Brain, title: "AI-Driven Strategy", description: "Learn how market leaders are leveraging deep learning models for competitive advantage." },
        { icon: Zap, title: "Productivity Boost", description: "Discover toolchains and methods to automate 70% of routine tasks using contemporary AI services." },
        { icon: UserCheck, title: "Ethical Implementation", description: "A deep dive into governance, data privacy, and building responsible AI frameworks for your team." },
    ];

    return (
        <div id="benefits" className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-16">
                    What You Will Master
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`
                                bg-white p-8 rounded-3xl 
                                shadow-xl hover:shadow-2xl 
                                transition duration-300 transform hover:-translate-y-1
                                
                                ring-1 ring-gray-100 hover:ring-2 hover:ring-blue-500/50 
                                
                                flex flex-col items-start
                            `}
                        >
                            {/* Rendering the Lucide icon component */}
                            <feature.icon className={`w-12 h-12 text-blue-600 mb-5`} />
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-700">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ---

// 4. Modern List of Seminars
const SeminarsList = () => (
    <div id="seminars" className={`py-24 bg-${PRIMARY_COLOR}/5`}>
        <div className="container mx-auto px-4">
            <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-16">
                Full Seminar Schedule
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {SEMINARS_DATA.map((seminar) => (
                    <div 
                        key={seminar.id} 
                        className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition duration-300 transform hover:scale-[1.02] border border-gray-100"
                    >
                        {/* Image */}
                        <div className="h-48 overflow-hidden">
                            <img 
                                src={seminar.img} 
                                alt={seminar.title} 
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                            />
                        </div>
                        
                        <div className="p-6">
                            {/* Category Tag */}
                            <span className={`inline-block text-xs font-semibold uppercase tracking-wider text-white bg-${PRIMARY_COLOR} px-3 py-1 rounded-full mb-3`}>
                                {seminar.category}
                            </span>
                            
                            {/* Title */}
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {seminar.title}
                            </h3>
                            
                            {/* Description */}
                            <p className="text-gray-600 text-sm mb-4">
                                {seminar.description}
                            </p>

                            <div className="flex items-center text-sm text-gray-500 font-medium">
                                <CalendarIcon className={`w-4 h-4 text-${PRIMARY_COLOR_DARK} mr-2`} />
                                <span>Starts: {seminar.startDate}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// ---

// 5. Modern Testimonial Section
const TestimonySection = () => (
    <div id="testimony" className="py-24 bg-white">
        <div className="container mx-auto px-4">
            <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-16">
                What Our Attendees Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {TESTIMONIALS_DATA.map((t, index) => (
                    <div 
                        key={index} 
                        className={`bg-white p-8 rounded-3xl shadow-xl border-2 border-${PRIMARY_COLOR}/30`}
                    >
                        <blockquote className={`text-xl italic font-medium text-gray-800 border-l-4 border-${PRIMARY_COLOR_DARK} pl-4 mb-6`}>
                            "{t.quote}"
                        </blockquote>
                        <div className="font-semibold text-lg text-gray-900">
                            {t.author}
                        </div>
                        <div className={`text-sm text-${PRIMARY_COLOR_DARK}`}>{t.title}</div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// ---

// 6. Modern Footer (Using a darker tone for contrast)
const Footer = () => (
    <footer className="bg-gray-900 text-white/70 py-12 border-t-4 border-white/10">
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                {/* Branding/Copyright */}
                <div className="mb-6 md:mb-0">
                    <span className="text-xl font-bold text-white">Innovation Summit</span>
                    <p className="text-sm mt-1 text-white/50">&copy; 2024. All rights reserved.</p>
                </div>
                
                {/* Navigation Links */}
                <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
                    {['About', 'Seminars', 'Speakers', 'Register'].map((item) => (
                        <a 
                            key={item} 
                            href={`#${item.toLowerCase()}`} 
                            className={`hover:text-${PRIMARY_COLOR_HOVER} transition duration-150 mb-2`}
                        >
                            {item}
                        </a>
                    ))}
                </div>
                
                {/* Legal/Contact Links */}
                <div className="flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-6 text-xs mt-6 md:mt-0">
                    <a href="#" className={`hover:text-${PRIMARY_COLOR_HOVER} transition duration-150`}>Privacy Policy</a>
                    <a href="#" className={`hover:text-${PRIMARY_COLOR_HOVER} transition duration-150`}>Terms of Service</a>
                    <a href="mailto:info@innovationsummit.com" className={`hover:text-${PRIMARY_COLOR_HOVER} transition duration-150`}>Contact Us</a>
                </div>
            </div>
        </div>
    </footer>
);


const UserDashboard = () => {
    return (
        <div className="min-h-screen antialiased font-sans">
            <Navbar />
            <HeroSection />
            <FeaturesSection />
            <SeminarsList /> 
            <TestimonySection /> 
            <Footer />
        </div>
    );
};

export default UserDashboard;
