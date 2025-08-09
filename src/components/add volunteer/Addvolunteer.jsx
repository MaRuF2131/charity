import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuthContext } from "../../mytools/context/context";
import axiosInstance from '../../mytools/axios'
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import { Unauthorize } from "../../mytools/unauthorizehandle";

const categories = ["Healthcare", "Education", "Social Service", "Animal Welfare"];

const AddPost = () => {
  const {user,logout} = useAuthContext();

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const [deadline, setDeadline] = useState(new Date());
  const thumbnailUrl = watch("thumbnail");

      useEffect(() => {
        document.title ="Add post - Charity"; // your dynamic title
      }, []);

  const onSubmit = (data) => {
    console.log(data.volunteersNeeded)
    data.volunteersNeeded=parseInt(data.volunteersNeeded);
    const postData = {
      ...data,
      deadline,
      organizerName: user.displayName,
      organizerEmail: user.email,
    };
    
    axiosInstance.post('/api/private/add-volunteer',postData)
        .then(response => 
          { Swal.fire({
                        icon: "success",
                        title:"Add Post",
                        text: "Created successfully",
                      })
           reset();
          console.log("Callback response:", response.data);
        })
        .catch(error => {
          Unauthorize(logout,error,'request failed')
         /*  Swal.fire("Error", "request failed", "error") */
          console.error("Callback error:", error);
        });

      console.log("Submitted Post:", postData);
  };

  return (
    <div className="min-h-screen  py-16 px-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative max-w-5xl w-full p-10  mt-10 rounded-3xl bg-white/60 dark:bg-gray-500 backdrop-blur-xl shadow-2xl border border-white/30"
      >
        {/* Glowing gradient ring */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 opacity-20 blur-3xl z-[-1]" />

        <motion.h2
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold text-center text-indigo-800 mb-10"
        >
          📝 Add a Volunteer Need Post
        </motion.h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm md:text-base">
          {/* Thumbnail URL */}
          <div className="col-span-2">
            <label className="font-semibold mb-1 block">Thumbnail URL</label>
            <input {...register("thumbnail", { required: true })} className="input input-bordered w-full shadow-sm" placeholder="https://example.com/image.jpg" />
            {errors.thumbnail && <p className="text-red-500 text-sm mt-1">This field is required</p>}
            {thumbnailUrl && (
              <img src={thumbnailUrl} alt="Preview" className="w-full h-52 object-cover mt-3 rounded-xl border shadow-md" />
            )}
          </div>

          {/* Title */}
          <div className="col-span-2">
            <label className="font-semibold mb-1 block">Post Title</label>
            <input {...register("title", { required: true })} className="input input-bordered w-full shadow-sm" placeholder="Volunteer for Beach Cleanup" />
            {errors.title && <p className="text-red-500 text-sm mt-1">This field is required</p>}
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="font-semibold mb-1 block">Description</label>
            <textarea {...register("description", { required: true })} className="textarea textarea-bordered w-full shadow-sm" rows="4" placeholder="Tell us more about the event..."></textarea>
            {errors.description && <p className="text-red-500 text-sm mt-1">This field is required</p>}
          </div>

          {/* Category */}
          <div>
            <label className="font-semibold mb-1 block">Category</label>
            <select {...register("category", { required: true })} className=" outline-0 w-full shadow-sm rounded-sm">
              <option value="">Choose a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-1">This field is required</p>}
          </div>

          {/* Location */}
          <div>
            <label className="font-semibold mb-1 block">Location</label>
            <input {...register("location", { required: true })} className="input input-bordered w-full shadow-sm" placeholder="Dhaka, Bangladesh" />
            {errors.location && <p className="text-red-500 text-sm mt-1">This field is required</p>}
          </div>

          {/* Volunteers Needed */}
          <div>
            <label className="font-semibold mb-1 block">Volunteers Needed</label>
            <input type="number" {...register("volunteersNeeded", { required: true })} className="input input-bordered w-full shadow-sm" placeholder="e.g. 10" />
            {errors.volunteersNeeded && <p className="text-red-500 text-sm mt-1">This field is required</p>}
          </div>

          {/* Deadline */}
          <div>
            <label className="font-semibold mb-1 block">Deadline</label>
            <DatePicker
              selected={deadline}
              onChange={(date) => setDeadline(date)}
              className="input input-bordered w-full shadow-sm"
              dateFormat="yyyy-MM-dd"
            />
          </div>

          {/* Organizer Info */}
          <div>
            <label className="font-semibold mb-1 block">Organizer Name</label>
            <input value={user.displayName} readOnly className="input input-bordered w-full bg-gray-100 shadow-sm" />
          </div>

          <div>
            <label className="font-semibold mb-1 block">Organizer Email</label>
            <input value={user.email} readOnly className="input input-bordered w-full bg-gray-100 shadow-sm" />
          </div>

          {/* Submit Button */}
          <div className="col-span-2 mt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg transition duration-200"
            >
              🚀 Add Post
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddPost;
