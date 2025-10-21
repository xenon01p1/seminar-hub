import { Brain, Zap, UserCheck, Twitter, Linkedin, Mail } from 'lucide-react'; 

export default function Footer ({ color_hover }) {
    return (
        <footer className="bg-gray-900 text-white py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 border-b pb-10 border-gray-800">
                    
                    {/* 1. Branding / Description */}
                    <div className="col-span-2 lg:col-span-2 pr-8">
                        <span className="text-2xl font-bold text-white">Innovation Summit</span>
                        <p className="text-sm mt-4 text-white/60">
                            Driving the future of business with cutting-edge AI and Generative technologies. Your essential annual guide to innovation.
                        </p>
                        <div className="flex space-x-4 mt-6">
                            <Twitter className={`w-6 h-6 text-white/70 hover:text-${ color_hover } transition cursor-pointer`} />
                            <Linkedin className={`w-6 h-6 text-white/70 hover:text-${ color_hover } transition cursor-pointer`} />
                            <Mail className={`w-6 h-6 text-white/70 hover:text-${ color_hover } transition cursor-pointer`} />
                        </div>
                    </div>

                    {/* 2. Quick Links */}
                    <div className="col-span-1">
                        <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-3 text-sm text-white/70">
                            {['About', 'Seminars', 'Speakers', 'Testimony'].map((item) => (
                                <li key={item}>
                                    <a 
                                        href={`#${item.toLowerCase()}`} 
                                        className={`hover:text-${ color_hover } transition duration-150`}
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3. Resources */}
                    <div className="col-span-1">
                        <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
                        <ul className="space-y-3 text-sm text-white/70">
                            <li><a href="#" className={`hover:text-${ color_hover } transition duration-150`}>Sponsorship</a></li>
                            <li><a href="#" className={`hover:text-${ color_hover } transition duration-150`}>FAQ</a></li>
                            <li><a href="#" className={`hover:text-${ color_hover } transition duration-150`}>Venue Details</a></li>
                            <li><a href="#" className={`hover:text-${ color_hover } transition duration-150`}>Media Kit</a></li>
                        </ul>
                    </div>
                    
                    {/* 4. Legal */}
                    <div className="col-span-2 md:col-span-1">
                        <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
                        <ul className="space-y-3 text-sm text-white/70">
                            <li><a href="#" className={`hover:text-${ color_hover } transition duration-150`}>Privacy Policy</a></li>
                            <li><a href="#" className={`hover:text-${ color_hover } transition duration-150`}>Terms of Service</a></li>
                            <li><a href="#" className={`hover:text-${ color_hover } transition duration-150`}>Refund Policy</a></li>
                        </ul>
                    </div>

                </div>
                
                {/* Bottom Copyright Row */}
                <div className="pt-8 text-center text-sm text-white/50">
                    &copy; 2024 Innovation Summit. All Rights Reserved. | Designed with 💙
                </div>
            </div>
        </footer>
    );
}