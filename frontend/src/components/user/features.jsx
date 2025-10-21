import { Brain, Zap, UserCheck, Twitter, Linkedin, Mail } from 'lucide-react'; 

export default function Features() {
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