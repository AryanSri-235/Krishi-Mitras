import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FaCloudSun, FaChalkboardTeacher, FaTag, FaUserCircle, FaSeedling } from "react-icons/fa";
import { Link } from 'react-router-dom';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: 'easeInOut',
    },
  }),
};

const DashboardPage = () => {
  const user = useSelector(state => state.user.userInfo);
  const location = useSelector(state => state.user.location);

  const features = [
    {
      title: "Weather Forecast",
      to: "/weather",
      icon: <FaCloudSun className="text-4xl text-blue-500" />,
      description: "Check the 7-day forecast for your area.",
      bgColor: "bg-blue-50",
      border: "border-blue-200"
    },
    {
      title: "Training Videos",
      to: "/training",
      icon: <FaChalkboardTeacher className="text-4xl text-yellow-500" />,
      description: "Watch tutorials to improve your farming skills.",
      bgColor: "bg-yellow-50",
      border: "border-yellow-200"
    },
    {
      title: "Mandi Prices",
      to: "/mandi-prices",
      icon: <FaTag className="text-4xl text-green-500" />,
      description: "Get the latest real-time market prices.",
      bgColor: "bg-green-50",
      border: "border-green-200"
    },
    {
      title: "My Profile",
      to: "/profile",
      icon: <FaUserCircle className="text-4xl text-purple-500" />,
      description: "View and manage your user details.",
      bgColor: "bg-purple-50",
      border: "border-purple-200"
    }
  ];

  return (
    <div className=" px-6 pt-8 pb-30 bg-gradient-to-br from-green-50 via-yellow-50 to-amber-50 flex flex-col">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-green-100 p-6 rounded-xl shadow-md text-center border border-green-200"
      >
        <h1 className="text-4xl font-extrabold text-green-900">
          Welcome back, <span className="text-green-700">{user?.displayName}!</span>
        </h1>
        <p className="text-green-700 mt-2 text-lg">
          🌾 Location detected: <span className="font-semibold">{location.city || 'Loading...'}</span>
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        {features.map((feature, i) => (
          <motion.div
            key={feature.to}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Link
              to={feature.to}
              className={`block p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center ${feature.bgColor} ${feature.border} border hover:-translate-y-2`}
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h2 className="text-xl font-semibold text-green-900">{feature.title}</h2>
              <p className="text-green-700 mt-2 text-sm">{feature.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 text-center text-green-700 text-sm flex justify-center items-center gap-2">
        <FaSeedling className="text-green-500" />
        <p className="m-0">Empowering farmers with smart solutions 🌱</p>
      </div>
    </div>
  );
};

export default DashboardPage;
