import React from 'react'; // Import React if not already imported by your setup

function Footer() {
    return (
        // Footer container: full width, dark background, light text, padding, text centered
        <footer id="contact" className="w-full bg-gray-900 text-gray-300 py-12 px-4 text-center">
            {/* Optional: Inner container to limit width on large screens, centered */}
            {/* This keeps the text from stretching too wide for readability */}
            <div className="max-w-screen-lg mx-auto">

                {/* Heading for contact/socials */}
                <h1 className="text-2xl font-bold mb-6 text-white">
                    Connect With Us
                </h1>

                {/* Social Links List: use flex to make horizontal, center items, add space between items */}
                <ul className="flex justify-center space-x-6 mb-8 list-none p-0"> {/* list-none p-0 removes default list styles */}
                    <li>
                        {/* Link styling: text color, hover effect, transition */}
                        <a href="#" className="hover:text-white transition-colors duration-200">Facebook</a>
                    </li>
                    <li>
                        <a href="#" className="hover:text-white transition-colors duration-200">X</a>
                    </li>
                    <li>
                        <a href="#" className="hover:text-white transition-colors duration-200">Instagram</a>
                    </li>
                    <li>
                        <a href="#" className="hover:text-white transition-colors duration-200">Threads</a>
                    </li>
                    {/* Add actual hrefs when ready */}
                </ul>

                {/* Copyright notice */}
                <p className="text-sm text-gray-400 mt-8">
                    © 2025 MealPlanner. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;