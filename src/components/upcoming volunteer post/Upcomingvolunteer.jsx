import { useEffect, useState } from "react";
import axiosInstance from '../../mytools/axios'
import { Link } from "react-router-dom"; // assuming you're using React Router

const UpcomingVolunteerNeeds = () => {
  const [needs, setNeeds] = useState([]);

  useEffect(() => {
    axiosInstance.get("/upcoming")
      .then(res => setNeeds(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">
          Volunteer Needs Now
        </h2>
        <p className="text-gray-500 mt-2">
          Join upcoming volunteer opportunities and make a difference today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {needs.map((need) => (
          <div
            key={need._id}
            className="bg-white dark:bg-gray-500 rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
          >
            <div className="overflow-hidden rounded-t-xl">
              <img
                src={need.thumbnail}
                alt={need.title}
                className="w-full h-48 object-cover transform hover:scale-105 transition duration-300"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {need.title}
              </h3>
              <p className="text-sm text-indigo-600 mb-1">
                Category: {need.category}
              </p>
              <p className="text-sm text-red-500">
                Deadline: {new Date(need.deadline).toLocaleDateString()}
              </p>

              <Link
                to={`/volunteer-needs/${need._id}`}
                className="inline-block mt-4 bg-gradient-to-r from-green-400 to-green-600 text-white px-5 py-2 rounded-full font-semibold transition hover:opacity-90"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          to="/all-volunteer-needs"
          className="inline-block bg-gradient-to-r from-blue-400 to-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg transition hover:opacity-90"
        >
          See All
        </Link>
      </div>
    </div>
  );
};

export default UpcomingVolunteerNeeds;
