import { Button } from "../components/ui/button";

function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-gray-900 shadow-lg  p-4">
      <ul className="flex justify-between items-center flex-wrap gap-4">
        {/* Logo Section */}
        <li className="text-3xl font-semibold text-white">
          <a href="/" className="hover:text-blue-300 transition duration-300">
            MealPlanner
          </a>
        </li>

        {/* Navigation Links */}
        <div className="flex gap-6 items-center">
          <li>
            <a
              href="#hero"
              className="text-lg font-medium text-white hover:text-blue-500 transition duration-300"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="text-lg font-medium text-white hover:text-blue-500 transition duration-300"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-lg font-medium text-white hover:text-blue-500 transition duration-300"
            >
              Contact
            </a>
          </li>

          
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
