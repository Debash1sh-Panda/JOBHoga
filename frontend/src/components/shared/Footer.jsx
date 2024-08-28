import React from "react";
import { FaPortrait, FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-t-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h1 className="text-md font-bold">
              Job<span className="text-red-600">Hoga</span>
            </h1>
            <p className="text-sm">
              © {currentYear} JobHoga{" "}
              Company. All rights reserved.
            </p>
          </div>

          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://www.linkedin.com/in/debasishpanda1/"
              className="text-white bg-gradient-to-r from-black to-red-500 rounded-md hover:from-gray-600 hover:to-red-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="LinkedIn"
              title="LinkedIn"
              target="_blank"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
            <a
              href="https://debash1sh-panda.github.io/Deb-PortfOlio/"
              className="text-white bg-gradient-to-r from-black to-red-500 rounded-md hover:from-gray-600 hover:to-red-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Portfolio"
              title="Portfolio"
              target="_blank"
            >
              <FaPortrait className="w-6 h-6" />
            </a>
            <a
              href="https://github.com/Debash1sh-Panda"
              className="text-white bg-gradient-to-r from-black to-red-500 rounded-md hover:from-gray-600 hover:to-red-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Github"
              title="Github"
              target="_blank"
            >
              <FaGithub className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
