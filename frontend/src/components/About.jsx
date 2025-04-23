import React from 'react'; // Import React if not already imported by your setup

function About() {
    return (
        // Main container: full width, minimum full height, relative for background positioning
        <div id="about" className="relative w-full min-h-screen flex items-center justify-center py-16 px-4">
            {/* Beautiful gradient background (consistent with Hero) */}
            {/* Use absolute inset-0 to cover the entire parent div */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-blue-600 to-purple-700"></div> {/* Changed gradient slightly for variety, feel free to use Hero's */}

            {/* Content container: relative z-index to appear above background, max width for readability, auto margins to center, padding, text color and alignment */}
            <div className="relative z-10 max-w-screen-md mx-auto text-white text-center">
                {/* Heading with improved typography */}
                <h1 className="font-serif font-extrabold text-4xl md:text-5xl lg:text-6xl mb-8">
                    About MealPlanner
                </h1>

                {/* Paragraphs with improved readability */}
                <p className="text-lg md:text-xl mb-6 leading-relaxed">
                    We are a team of passionate developers dedicated to helping you achieve your dietary goals.
                </p>

                <p className="text-lg md:text-xl leading-relaxed">
                    Our mission is to provide you with the best tools and resources to track, plan, and achieve your diet goals effectively and enjoyably.
                </p>

                {/* You could add more content here if needed, like team photos, values, etc. */}
            </div>
        </div>
    );
}

export default About;