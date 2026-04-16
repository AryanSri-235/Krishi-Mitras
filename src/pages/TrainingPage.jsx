import React from 'react';

const youtubeVideos = [
  { id: 'heTxEsrPVdQ', title: 'How to Start a Small Farm: A Step-by-Step Guide' },
  { id: '26qTgXJKMAE', title: 'He Farms 35 Hours a Week By Himself and Makes 6 Figures' },
  { id: 'iloAQmroRK0', title: 'What is Sustainable Agriculture?' },
  { id: 'K105xluiB8s', title: 'Amazing Agriculture Machines Operating At An INSANE LEVEL' },
  { id: 'BGVU75oRKyo', title: 'NPK Fertilizer Numbers - What They Really Mean' },
  { id: 'sEYezr_FnDQ', title: 'What Do the Numbers on Fertilizer Mean?' },
  { id: 'eHbWKGe1Uv0', title: 'Amazing Chinese and Japanese vegetables farming techniques' },
  { id: 'trYLhTCP9jM', title: 'NPK Explained' },
  { id: 'YK3LquuKj6E', title: '55 Most Unbelievable Agriculture Machines and Ingenious Tools' },
  { id: '8pYsoIcMfck', title: 'Best Agriculture Spray Drone' },
  { id: 'SNGS9aieN6s', title: 'Best Grass Harvesting Machine' },
  { id: 'STx-9k3y380', title: 'Manual Ploughing Tool' },
  { id: 'Xxzvj2f7mkU', title: 'What is Sustainable Agriculture? And How We Practice It?' },
  { id: '78_1abjPvHk', title: 'Introduction to Sustainable Farming Practices' },
  { id: 'w9ARD0Ijd8Y', title: 'Easy Method for Planting to Harvest more Chilies peppers' },
];

const VideoThumbnail = ({ videoId, title }) => (
  <a
    href={`https://www.youtube.com/watch?v=${videoId}`}
    target="_blank"
    rel="noopener noreferrer"
    className="block group rounded-lg shadow-lg bg-gradient-to-b from-yellow-50 via-yellow-100 to-yellow-200
               border border-yellow-300 hover:shadow-2xl hover:scale-[1.03] transform transition-transform duration-300"
  >
    <div className="relative overflow-hidden rounded-t-lg border-b border-yellow-400">
      <img
        src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
        alt={title}
        className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-green-900 bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg
          className="w-16 h-16 text-yellow-300"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
    <h3 className="p-3 text-md font-semibold text-green-900 group-hover:text-green-700">
      {title}
    </h3>
  </a>
);

const TrainingPage = () => {
  return (
    <div
      className="min-h-screen py-10 px-6 sm:px-10 bg-gradient-to-b from-green-100 to-yellow-50
                 bg-[url('/textures/field-texture.png')] bg-repeat"
      style={{
        backgroundSize: 'auto',
      }}
    >
      <h1 className="mb-8 text-4xl font-bold text-green-900 text-center">
        🌾 Training Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-[1300px] mx-auto">
        {youtubeVideos.map((video) => (
          <VideoThumbnail key={video.id} videoId={video.id} title={video.title} />
        ))}
      </div>
    </div>
  );
};

export default TrainingPage;
