import React from 'react'; 

function Footer() {
    return (
        
        <footer id="contact" className="w-full bg-gray-900 text-gray-300 py-12 px-4 text-center">
            
            <div className="max-w-screen-lg mx-auto">

                {/* Heading for contact/socials */}
                <h1 className="text-2xl font-bold mb-6 text-white">
                    Connect With Us
                </h1>

                
                <ul className="flex justify-center space-x-6 mb-8 list-none p-0"> {/* list-none p-0 removes default list styles */}
                    <li>
                        
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