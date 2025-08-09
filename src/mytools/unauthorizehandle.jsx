import Swal from "sweetalert2";

export const Unauthorize=(logout,err,err2)=>{
  if(err.response.data.message==='Unauthorized')Swal.fire("Error", "Unauthorized or server error login again", "error")
    .then((result)=>{
          if(result.isConfirmed){ logout() }
       }
      );
   else{
       Swal.fire("Error",err2, "error")
   }   
}