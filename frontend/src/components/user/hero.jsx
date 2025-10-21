export default function Hero ({ primary_color, primary_dark, color_hover }) {
    return (
        <div className={`relative pt-24 pb-40 bg-gray-50 overflow-hidden`}>
            {/* Background Subtle Gradient Shape */}
            <div className="absolute inset-0 z-0 opacity-10">
                <div className={`w-full h-full bg-gradient-to-br from-white via-white to-${ primary_color }/30`}></div>
            </div>

            <div className="relative container mx-auto px-4 z-10 text-center">
                <p className={`text-md font-semibold uppercase text-${ primary_dark } mb-4 tracking-widest bg-white/50 inline-block px-3 py-1 rounded-full ring-2 ring-${ color_hover }`}>
                    The 2024 Innovation Summit
                </p>
                <h1 className="text-6xl md:text-8xl font-extrabold text-gray-900 leading-none mb-6">
                    Mastering the <span className={`text-${ primary_dark }`}>Generative Era</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-10">
                    Unlock **practical strategies** to integrate AI into your workflow, boost productivity, and drive exponential growth in the next quarter.
                </p>

                {/* <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <a href="#register" className={`w-full sm:w-auto px-12 py-5 bg-${PRIMARY_COLOR_DARK} text-white font-extrabold text-lg rounded-xl shadow-2xl hover:bg-${PRIMARY_COLOR_HOVER} transition duration-300 transform hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-${PRIMARY_COLOR_DARK} focus:ring-opacity-50`}>
                        Secure Your Spot Now
                    </a>
                    <p className="text-lg font-medium text-gray-700 mt-4 sm:mt-0">
                        October 25, 2024 | **9:00 AM - 5:00 PM EST**
                    </p>
                </div> */}
            </div>
        </div>
    );
};