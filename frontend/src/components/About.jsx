import React from 'react'; 

function About() {
    return (
        
        <div id="about" className="relative w-full min-h-screen flex items-center justify-center py-16 px-4">
            
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-blue-600 to-purple-700"></div> 

            
            <div className="relative z-10 max-w-screen-md mx-auto text-white text-center">
                
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