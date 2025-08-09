import { useEffect, useState } from "react";
import axiosInstance from "../../mytools/axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaThLarge, FaTable } from "react-icons/fa";

const AllVolunteerNeed = () => {
  const categories = ["Healthcare", "Education", "Social Service", "Animal Welfare"];
  const [allNeeds, setAllNeeds] = useState([]);
  const [filteredNeeds, setFilteredNeeds] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [layout, setLayout] = useState("grid");

    useEffect(() => {
      document.title ="All post - Charity"; // your dynamic title
    }, []);

  useEffect(() => {
    axiosInstance
      .get("/all_volunteer_need")
      .then((res) => {
        setAllNeeds(res.data);
        setFilteredNeeds(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const filtered = allNeeds.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(searchTitle.toLowerCase());
      const matchLocation = item.location.toLowerCase().includes(searchLocation.toLowerCase());
      const matchCategory = item.category.toLowerCase().includes(searchCategory.toLowerCase());
      return matchTitle && matchLocation && matchCategory;
    });

    setFilteredNeeds(filtered);
  }, [searchTitle, searchLocation, searchCategory, allNeeds]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <div className="relative max-w-7xl mx-auto px-4 py-20">
        {/* Title and Description */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Volunteer Needs Now</h2>
          <p className="text-gray-500 dark:text-gray-300 mt-2">
            Join volunteer opportunities and make a difference today.
          </p>
        </div>

        {/* Search Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Search by Title"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-white"
          />
          <input
            type="text"
            placeholder="Search by Location"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-white"
          />
          <select
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-white"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Floating Layout Toggle Button */}
        <button
          onClick={() => setLayout(layout === "grid" ? "table" : "grid")}
          className="fixed top-25 right-6 z-50 p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 shadow-md rounded-full hover:scale-110 transition duration-300"
          title="Toggle Layout"
        >
          {layout === "grid" ? (
            <FaTable className="text-gray-700 dark:text-gray-100" size={20} />
          ) : (
            <FaThLarge className="text-gray-700 dark:text-gray-100" size={20} />
          )}
        </button>

        {/* Layout View */}
        {layout === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredNeeds.map((need) => (
              <div
                key={need._id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
              >
                <div className="overflow-hidden rounded-t-xl">
                  <img
                    src={need.thumbnail}
                    alt={need.title}
                    className="w-full h-48 object-cover transform hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{need.title}</h3>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-1">Category: {need.category}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Location: {need.location}</p>
                  <p className="text-sm text-red-500">Deadline: {new Date(need.deadline).toLocaleDateString()}</p>
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
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 text-left text-gray-800 dark:text-gray-200">
                  <th className="py-3 px-4">Thumbnail</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Deadline</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredNeeds.map((need) => (
                  <tr key={need._id} className="border-t border-gray-200 dark:border-gray-600">
                    <td className="py-3 px-4">
                      <img src={need.thumbnail} alt={need.title} className="h-12 w-16 object-cover rounded" />
                    </td>
                    <td className="py-3 px-4">{need.title}</td>
                    <td className="py-3 px-4">{need.category}</td>
                    <td className="py-3 px-4">{need.location}</td>
                    <td className="py-3 px-4 text-red-500">{new Date(need.deadline).toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      <Link
                        to={`/volunteer-needs/${need._id}`}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* No Results */}
        {filteredNeeds.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-300 mt-10">No posts found.</p>
        )}
      </div>
    </motion.div>
  );
};

export default AllVolunteerNeed;