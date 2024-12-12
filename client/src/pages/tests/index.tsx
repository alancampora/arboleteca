import React from 'react';

const TreeProfilePage = () => {
  const tree = {
    name: "Quercus Robur",
    scientificName: "Oak Tree",
    type: "Street",
    image: "https://via.placeholder.com/150", // Replace with your tree image
    details: [
      { label: "Height", value: "20m" },
      { label: "Diameter", value: "1.5m" },
      { label: "Location", value: "Park Avenue, NYC" },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="bg-blue-200">
        <div className="bg-pattern h-40 w-full"></div>
        <div className="relative -top-16 flex justify-center">
          <img
            src={tree.image}
            alt={tree.name}
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />
        </div>
      </div>

      {/* Profile Info */}
      <div className="text-center mt-4">
        <h1 className="text-2xl font-bold">{tree.name}</h1>
        <p className="text-gray-600">{tree.scientificName}</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center space-x-6 mt-4 border-b pb-2">
        <button className="text-purple-600 font-semibold border-b-2 border-purple-600">
          Profile
        </button>
        <button className="text-gray-500 hover:text-purple-600">Details</button>
        <button className="text-gray-500 hover:text-purple-600">Gallery</button>
      </div>

      {/* Tree Details */}
      <div className="max-w-3xl mx-auto mt-8 bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800">Tree Details</h2>
        <ul className="mt-4 space-y-2">
          {tree.details.map((detail, index) => (
            <li
              key={index}
              className="flex justify-between text-gray-700 border-b pb-2"
            >
              <span className="font-medium">{detail.label}:</span>
              <span>{detail.value}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Optional Footer */}
      <footer className="mt-8 text-center text-gray-500">
        © 2024 Tree Explorer
      </footer>
    </div>
  );
};

export default TreeProfilePage;
