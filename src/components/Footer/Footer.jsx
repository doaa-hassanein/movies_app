const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white border-t border-gray-800 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Left Section */}
        <div className="md:col-span-6 lg:col-span-5">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-red-600 mb-2">STREAMIT</h2>
            <p className="text-gray-400">Your Ultimate Streaming Experience</p>
          </div>

          <ul className="flex flex-wrap gap-4 mb-6 text-base font-medium">
            {[
              "Terms of Use",
              "Privacy Policy",
              "Blog",
              "FAQ",
              "Watch List",
            ].map((item) => (
              <li
                key={item}
                className="hover:text-red-500 transition-colors cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>

          <p className="text-gray-500 text-sm leading-relaxed max-w-md">
            © {new Date().getFullYear()} STREAMIT. All Rights Reserved. All
            videos and shows on this platform are trademarks of, and all related
            images and content are the property of Streamit Inc. Duplication and
            copy of this is strictly prohibited.
          </p>
        </div>

        {/* Follow Us */}
        <div className="md:col-span-3 lg:col-span-3">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <svg
              className="w-6 h-6 mr-2 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                clipRule="evenodd"
              />
            </svg>
            Follow Us
          </h3>

          <div className="flex gap-4">
            {[
              { icon: "fab fa-facebook-f", color: "bg-blue-600" },
              { icon: "fab fa-twitter", color: "bg-blue-400" },
              {
                icon: "fab fa-instagram",
                color: "bg-gradient-to-r from-purple-500 to-pink-500",
              },
              { icon: "fab fa-youtube", color: "bg-red-600" },
            ].map((social, index) => (
              <a
                key={index}
                href="#"
                className={`w-10 h-10 rounded-full flex items-center no-underline justify-center text-white hover:scale-110 transition-all ${social.color}`}
              >
                <i className={`${social.icon} text-lg`}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Download App */}
        <div className="md:col-span-3 lg:col-span-4">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <svg
              className="w-6 h-6 mr-2 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M2.94 6.94a1.5 1.5 0 012.12 0L10 11.88l4.94-4.94a1.5 1.5 0 112.12 2.12l-6 6a1.5 1.5 0 01-2.12 0l-6-6a1.5 1.5 0 010-2.12z"
                clipRule="evenodd"
              />
            </svg>
            Subscribe to Newsletter
          </h3>

          <p className="text-gray-400 text-sm mb-4">
            Get the latest updates, movie releases, and exclusive offers
            straight to your inbox.
          </p>

          <form className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:flex-1 px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="submit"
              className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-gray-800">
        <p className="text-gray-500 text-sm text-center">
          Made with ❤️ by Streamit Team | All trademarks are property of their
          respective owners.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
