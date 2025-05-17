import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Import useNavigate
import { User } from 'lucide-react';

function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate(); // <-- Create navigate function

  useEffect(() => {
    setIsVisible(true); // Initial animation visibility
  }, []);

  function handleGetStartedClick() {
    setIsVisible(false);

    setTimeout(() => {
      navigate('/tasks'); // <-- Navigate to Tasks page
    }, 300); // Optional delay for animation effect
  }

  return (
    <div id="hero" className="relative flex flex-col items-center justify-center w-full min-h-screen px-4 py-12 ">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-500 to-blue-600"></div>

      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-white"></div>
        <div className="absolute bottom-20 right-32 w-24 h-24 rounded-full bg-white"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-white"></div>
      </div>

      {/* Hero content */}
      <div className={`relative z-10 w-full max-w-full px-4 text-center transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
          MealPlanner
        </h1>
        <h3 className="text-xl font-medium text-white md:text-2xl">
          Track, Plan and Achieve your diet goals
        </h3>

        {/* Call to action button */}
        <div className="mt-8">
          <button
            onClick={handleGetStartedClick}
            className="px-6 py-3 font-medium text-teal-900 transition-all bg-white rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-100"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
