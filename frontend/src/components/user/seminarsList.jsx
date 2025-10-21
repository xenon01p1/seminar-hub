export default function SeminarsList({ primary_color, primary_dark }) {
    const CalendarIcon = (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
    );

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

    return (
        <div id="seminars" className={`py-24 bg-${ primary_color }/5`}>
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
                                <span className={`inline-block text-xs font-semibold uppercase tracking-wider text-white bg-${primary_color} px-3 py-1 rounded-full mb-3`}>
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
                                    <CalendarIcon className={`w-4 h-4 text-${ primary_dark } mr-2`} />
                                    <span>Starts: {seminar.startDate}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}