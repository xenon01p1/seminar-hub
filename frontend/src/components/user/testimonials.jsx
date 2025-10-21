export default function Testimonials ({ primary_color, primary_dark }) {
    const TESTIMONIALS_DATA = [
        {
            quote: "The best seminar I've attended all year. The actionable strategies on AI adoption were invaluable for our Q4 planning.",
            author: "Sarah J.",
            title: "CTO, TechCorp Solutions",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg" // Example avatar URL
        },
        {
            quote: "Clear, modern, and immediately applicable. We saw a 20% boost in our content creation pipeline within a week!",
            author: "Mark C.",
            title: "Marketing Director, Global Agency",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg" // Example avatar URL
        },
        {
            quote: "An insightful and energizing event! The speakers were top-notch, and the content was incredibly relevant.",
            author: "Emily R.",
            title: "Head of Product, InnovateX",
            avatar: "https://randomuser.me/api/portraits/women/68.jpg" // Example avatar URL
        }
    ];

    return (
        <div id="testimony" className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-16">
                    What Our Attendees Say
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {TESTIMONIALS_DATA.map((t, index) => (
                        <div 
                            key={index} 
                            className={`bg-white p-8 rounded-3xl shadow-xl border-2 border-${ primary_color }/30`}
                        >
                            <blockquote className={`text-xl italic font-medium text-gray-800 border-l-4 border-${ primary_dark } pl-4 mb-6`}>
                                "{t.quote}"
                            </blockquote>
                            <div className="flex items-center mt-4"> {/* Flex container for avatar and text */}
                                {t.avatar && ( // Conditionally render avatar if available
                                    <img 
                                        src={t.avatar} 
                                        alt={t.author} 
                                        className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-gray-200"
                                    />
                                )}
                                <div>
                                    <div className="font-semibold text-lg text-gray-900">
                                        {t.author}
                                    </div>
                                    <div className={`text-sm text-${ primary_dark }`}>{t.title}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}