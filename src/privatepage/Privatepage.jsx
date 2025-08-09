import {  useEffect, useState } from 'react'
import { Navigate, useLocation} from 'react-router-dom';
import {useAuthContext} from'../mytools/context/context'
import { Preloader } from '../mytools/loader/loader';
import { setUserInterceptor } from '../mytools/axios';

const Privatepage = ({children}) => {
   const{user}=useAuthContext();
   const location=useLocation();
   const[waiting,setwaiting]=useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
        setwaiting(false);
    }, 1000); 
    return () => clearTimeout(timer); 
  }, []);
    if(waiting) return <Preloader></Preloader>
    if(!user) return <Navigate to='/login' state={{from:location.pathname}} replace></Navigate>
    return children
}

export default Privatepage
