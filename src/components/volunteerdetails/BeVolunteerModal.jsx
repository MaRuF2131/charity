import {  useEffect, useState } from "react";
import { useAuthContext } from "../../mytools/context/context";
import axiosInstance from "../../mytools/axios";
import {Preloader2} from '../../mytools/loader/loader'
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { Unauthorize } from "../../mytools/unauthorizehandle";

const BeVolunteerModal = ({ post, closeModal }) => {
  const Navigate=useNavigate();
  const {user,logout} = useAuthContext();
  const [suggestion, setSuggestion] = useState("");
  const [loading,setisloading]=useState(false);

      useEffect(() => {
        document.title ="Be volunteer - Charity"; // your dynamic title
      }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisloading(true);
    const requestData = {
      postId: post._id,
      thumbnail: post.thumbnail,
      title: post.title,
      description: post.description,
      category: post.category,
      location: post.location,
      volunteersNeeded: post.volunteersNeeded,
      deadline: post.deadline,
      organizerName: post.organizerName,
      organizerEmail: post.organizerEmail,
      volunteerName: user.displayName,
      volunteerEmail: user.email,
      suggestion,
      status: "requested"
    };

    try {
      await axiosInstance.post('/api/private/request-volunteer', requestData)
      .then(res=>{ Swal.fire({
              icon: "success",
              title: res.statusText,
              text: res.data.message,
            }).then((result)=>{if(result.isConfirmed)Navigate('/all-volunteer-needs')});console.log(res.data.message)}
          )
      .catch(err=>{Swal.fire("Error", err.response.data.message || "request failed", "error").then((result)=>{if(result.isConfirmed) Navigate('/all-volunteer-needs')});console.log(err.response.data.message)});
      setTimeout(()=>{
          closeModal();
      },1000)
    } catch (err) {
      Unauthorize(logout,err,"Request failed.")
      console.error(err);
    }
  }
 
 return(
      <motion.div
        initial={{ opacity: 0,  }}
        animate={{ opacity: 1,  }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="pt-20"
      >
  <div className="fixed w-full pt-25 pb-5  inset-0 bg-white dark:bg-gray-600 bg-opacity-50 flex items-center justify-center z-[700]">
      <div className="bg-white dark:bg-gray-500 p-8 rounded shadow-xl h-full w-full max-w-lg overflow-auto">
        <h2 className="text-2xl mb-4 font-bold">Be a Volunteer</h2>
        <form onSubmit={handleSubmit} className={`space-y-4 ${loading?'opacity-25':'opacity-100'}`}>

          {/* Thumbnail */}
          <div>
            <label>Thumbnail:</label>
            <img src={post.thumbnail} alt="Thumbnail" className="w-full h-48 object-cover rounded" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Title:</label>
              <input type="text" value={post.title} readOnly className="w-full p-2 border rounded" />
            </div>

            <div>
              <label>Category:</label>
              <input type="text" value={post.category} readOnly className="w-full p-2 border rounded" />
            </div>

            <div>
              <label>Location:</label>
              <input type="text" value={post.location} readOnly className="w-full p-2 border rounded" />
            </div>

            <div>
              <label>Volunteers Needed:</label>
              <input type="number" value={post.volunteersNeeded} readOnly className="w-full p-2 border rounded" />
            </div>

            <div>
              <label>Deadline:</label>
              <input type="text" value={new Date(post.deadline).toLocaleDateString()} readOnly className="w-full p-2 border rounded" />
            </div>

            <div>
              <label>Organizer Name:</label>
              <input type="text" value={post.organizerName} readOnly className="w-full p-2 border rounded" />
            </div>

            <div>
              <label>Organizer Email:</label>
              <input type="text" value={post.organizerEmail} readOnly className="w-full p-2 border rounded" />
            </div>
          </div>

          <div>
            <label>Description:</label>
            <textarea value={post.description} readOnly className="w-full p-2 border rounded" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Volunteer Name:</label>
              <input type="text" value={user.displayName} readOnly className="w-full p-2 border rounded" />
            </div>

            <div>
              <label>Volunteer Email:</label>
              <input type="email" value={user.email} readOnly className="w-full p-2 border rounded" />
            </div>
          </div>

          <div>
            <label>Suggestion:</label>
            <textarea placeholder="Enter your suggestion..." value={suggestion} onChange={(e) => setSuggestion(e.target.value)} className="w-full p-2 border rounded" />
          </div>

          <div className="flex justify-between">
            <button type="submit" disabled={loading} className="bg-green-600 text-white py-2 px-4 rounded h-10 w-25">{loading?<Preloader2></Preloader2>:'Request'}</button>
            <button onClick={closeModal} type="button" className="bg-gray-500 text-white py-2 px-4 rounded">Cancel</button>
          </div>
        </form>
      </div>
    </div>
    </motion.div>
  );
}

export default BeVolunteerModal;
