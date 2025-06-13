import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import img1 from "./../../assets/404-error-page.png";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Animated 404 Text */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">
            404
          </h1>
        </motion.div>

        {/* Error Image */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-10"
        ></motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            The page you're looking for doesn't exist or has been moved. Don't
            worry, let's get you back on track.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-3 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 rounded-lg font-semibold transition-all duration-300 shadow-lg"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-lg font-semibold transition-all duration-300 shadow-lg"
          >
            Return Home
          </button>
        </motion.div>

        {/* Additional Help */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-12 text-gray-400 text-sm"
        >
          <p>
            Need help?{" "}
            <a href="/contact" className="text-red-400 hover:underline">
              Contact our support team
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;
