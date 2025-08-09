import { useParams } from "react-router-dom";
import { useEffect, useState} from "react";
import axiosInstance from "../../mytools/axios"; // your axios with backend url
import BeVolunteerModal from "./BeVolunteerModal";
import { motion } from "framer-motion";
import { Preloader } from "../../mytools/loader/loader";
import { Unauthorize } from "../../mytools/unauthorizehandle";
import { useAuthContext } from "../../mytools/context/context";

const VolunteerDetails = () => {
  const { id } = useParams();
  const{logout}=useAuthContext();
  const [post, setPost] = useState(null);
  const [openModal, setOpenModal] = useState(false);

      useEffect(() => {
      document.title ="Volunteer details - Charity"; // your dynamic title
    }, []);

  useEffect(() => {
      axiosInstance.get(`/api/private/volunteerdetails/${id}`).then(res => {
      setPost(res.data);
    }).catch(err=>{Unauthorize(logout,err,"Server error")});
  }, [id]);


  return (
    post?
    <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="pt-20 pb-10"
      >
    <div className="max-w-4xl mx-auto p-8  h-full bg-white dark:bg-gray-500 shadow rounded">
      <img src={post.thumbnail} alt="thumbnail" className="w-full h-80 object-cover rounded mb-6" />
      <h2 className="text-3xl font-bold mb-4">{post.title}</h2>
      <p className="mb-2"><b>Category:</b> {post.category}</p>
      <p className="mb-2"><b>Deadline:</b> {new Date(post.deadline).toLocaleDateString()}</p>
      <p className="mb-2"><b>Location:</b> {post.location}</p>
      <p className="mb-2"><b>Organizer:</b> {post.organizerName} ({post.organizerEmail})</p>
      <p className="mb-4"><b>Volunteers Needed:</b>{post.volunteersNeeded}</p>
      <p className="mb-6">{post.description}</p>
      
      <button onClick={() => setOpenModal(true)} className="bg-blue-600 text-white py-2 px-4 rounded">Be a Volunteer</button>

      {openModal && <BeVolunteerModal post={post} closeModal={() => setOpenModal(false)} />}
    </div>
  </motion.div>
  :
   <Preloader></Preloader>
  )
};

export default VolunteerDetails;
