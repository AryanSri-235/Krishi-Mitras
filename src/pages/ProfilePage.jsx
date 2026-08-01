import React from 'react';
import { useSelector } from 'react-redux';
import { FaLeaf, FaMapMarkerAlt, FaUser } from 'react-icons/fa';
//import { motion } from 'framer-motion';  

const ProfilePage = () => {
  const { userInfo, location } = useSelector(state => state.user);

  if (!userInfo) {
    return <div className="text-center mt-10 text-green-700">Loading profile...</div>;
  }

  return (
    <div className="space-y-10 max-w-3xl mx-auto px-4 py-10 bg-green-50 min-h-screen">
      
      <div className="flex items-center space-x-3 border-b border-green-300 pb-4">
        <FaUser className="text-green-700 text-3xl" />
        <h1 className="text-4xl font-extrabold text-green-800 tracking-tight">
          My Profile
        </h1>
      </div>
      <div className="bg-yellow-50 p-6 rounded-xl shadow-md flex items-center space-x-6 border border-green-200">
        <motion.img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToocdF3U98XkeyWh4ZzWP2yuNGyyV32-dDIA&s"
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-green-500"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, rotate: [0, 5, -5, 0] }}
          transition={{ duration: 1, ease: "easeInOut" }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        />
        <div>
          <h2 className="text-2xl font-bold text-green-800">{userInfo.displayName}</h2>
          <p className="text-md text-green-600">{userInfo.email}</p>
        </div>
      </div>
      <div className="bg-yellow-50 p-6 rounded-xl shadow-md border border-green-200">
        <div className="flex items-center space-x-2 mb-4">
          <FaMapMarkerAlt className="text-green-600" />
          <h3 className="text-xl font-semibold text-green-800">Farm Location</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-green-500">City</p>
            <p className="text-lg font-medium text-green-800">{location.city || 'Not available'}</p>
          </div>
          <div>
            <p className="text-sm text-green-500">Coordinates</p>
            <p className="text-lg font-medium text-green-800">
              {location.latitude ? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}` : 'Not available'}
            </p>
          </div>
        </div>
      </div>
      <div className="text-center text-sm text-green-500 mt-10 flex justify-center items-center space-x-2">
        <FaLeaf className="text-green-400" />
        <span>Growing with technology 🌱</span>
      </div>
    </div>
  );
};

export default ProfilePage;
