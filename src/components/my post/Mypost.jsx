import { useEffect, useState } from "react";
import { useAuthContext } from "../../mytools/context/context";
import axiosInstance from "../../mytools/axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {  useNavigate } from "react-router-dom";
import { Unauthorize } from "../../mytools/unauthorizehandle";

const ManageMyPosts = () => {
  const navigate = useNavigate();
  const { user ,logout } = useAuthContext();
  const [needPosts, setNeedPosts] = useState([]);
  const [requestPosts, setRequestPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("need");

      useEffect(() => {
      document.title ="My post - Charity"; // your dynamic title
    }, []);

  useEffect(() => {
    if (user?.email) {
    try{  
      axiosInstance.get(`/api/private/my-volunteer-posts/${user?.email}`).then(res => {
        setNeedPosts(res.data || []);
      }).catch(err=>Unauthorize(logout,err,"Can not fetch"));
      axiosInstance.get(`/api/private/my-request-posts/${user?.email}`).then(res => {
        setRequestPosts(res.data || []);
      }).catch(err=>{Unauthorize(logout,err,"Can not fetch")});
    }catch(err){
      console.log("checkpoint:",err)
    }
    }
  },[user]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      await axiosInstance.delete(`/api/private/delete-volunteer-post/${id}`);
      setNeedPosts(prev => prev.filter(post => post._id !== id));
      setRequestPosts(prev => prev.filter(post => post.postId!== id));
      toast.success("Post deleted successfully");
    } catch (err) {
      toast.error("Failed to delete post");
    }
  };

  const handleCancelRequest = async (id) => {
    if (!confirm("Are you sure you want to cancel this request?")) return;
    try {
      await axiosInstance.delete(`/api/private/cancel-volunteer-request/${id}`);
      setRequestPosts(prev => prev.filter(post => post._id !== id));
      toast.success("Request cancelled");
    } catch (err) {
      toast.error("Cancellation failed");
    }
  };

  return (
    <motion.div
      className="p-6 pt-20 max-w-7xl mx-auto  "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
    <div className="fixed top-23 w-full bg-white dark:bg-gray-600 z-[700]">
      <h2 className="text-3xl text-center font-bold mb-6">Manage My Posts</h2>

      {/* Tabs */}
      <div className="flex gap-2 border-b mb-4">
        <button
          className={`px-4 py-2 font-medium border-b-2 transition ${
            activeTab === "need" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500"
          }`}
          onClick={() =>{window.scrollTo({ top:0, left:0,}); setActiveTab("need")}}
        >
          My Volunteer Need Posts
        </button>
        <button
          className={`px-4 py-2 font-medium border-b-2 transition ${
            activeTab === "requests" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500"
          }`}
          onClick={() =>{window.scrollTo({ top:0, left:0,}); setActiveTab("requests")}}
        >
          My Volunteer Request Posts
        </button>
      </div>
    </div>
      {/* My Volunteer Need Posts */}
      {activeTab === "need" && (
            <div className="overflow-auto sm:mt-4 mt-9 pt-25">
              {needPosts.length === 0 ? (
                <p className="text-gray-800 mt-4">You haven’t added any volunteer need posts yet.</p>
              ) : (
                <table className="min-w-full bg-white dark:bg-gray-500 shadow-md rounded-lg overflow-hidden">
                  <thead className="bg-gray-100 dark:bg-gray-600  text-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left">Thumbnail</th>
                      <th className="px-6 py-3 text-left">Title</th>
                      <th className="px-6 py-3 text-left">Category</th>
                      <th className="px-6 py-3 text-left">Location</th>
                      <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {needPosts.map(post => (
                      <tr key={post._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4">
                          <img src={post.thumbnail} alt="thumb" className="h-14 w-20 rounded-md object-cover" />
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-950">{post.title}</td>
                        <td className="px-6 py-4 text-gray-850">{post.category}</td>
                        <td className="px-6 py-4 text-gray-850">{post.location}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md"
                              onClick={() =>navigate('/update', { state: { value: post }, replace: true })}
                            >
                              Update
                            </button>
                            <button
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
                              onClick={() => handleDelete(post._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
      )}

      {/* My Volunteer Request Posts */}
      {activeTab === "requests" && (
          <div className="overflow-x-auto mt-4 pt-25">
            {requestPosts.length === 0 ? (
              <p className="text-gray-800 mt-4">You haven’t made any volunteer requests yet.</p>
            ) : (
              <table className="min-w-full bg-white dark:bg-gray-500 shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-100 dark:bg-gray-600  text-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left">Thumbnail</th>
                    <th className="px-6 py-3 text-left">Post Title</th>
                    <th className="px-6 py-3 text-left">Volunteer</th>
                    <th className="px-6 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {requestPosts.map(req => (
                    <tr key={req._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 ">
                      <td className="px-6 py-4">
                        <img src={req.thumbnail} alt="thumb" className="h-14 w-20 rounded-md object-cover" />
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-950">{req.title}</td>
                      <td className="px-6 py-4 text-gray-850">{req.volunteerEmail}</td>
                      <td className="px-6 py-4">
                        <button
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
                          onClick={() => handleCancelRequest(req._id)}
                        >
                          Cancel Request
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

      )}
    </motion.div>
  );
};

export default ManageMyPosts;
