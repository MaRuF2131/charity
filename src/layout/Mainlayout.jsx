
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import  {Preloader} from '../mytools/loader/loader'
import { Outlet, useLocation } from 'react-router-dom'
import { useLayoutEffect, useState, useEffect } from 'react';
import { Theme } from '@radix-ui/themes';

const Mainlayout = () => {
  const location = useLocation();
  const [isloading, setisloading] = useState(true);
       window.scrollTo({
        top:0,
        left:0,
      });
  useEffect(() => {
    setisloading(true);
    const time = setTimeout(() => {
      setisloading(false);
    }, 1500);
    return () => clearTimeout(time);
  }, [location]);

  useLayoutEffect(() => {
     window.scrollTo({
        top:0,
        left:0,
        behavior: 'smooth'
      });

  }, [location]);
  return (
    <div className='dark:bg-gray-600 ' >
        <Navbar></Navbar>
          <div className=''>
            {isloading?<Theme> <Preloader></Preloader> </Theme>:
                        <Outlet key={location.pathname} ></Outlet>
            }
          </div>
        <Footer></Footer>

    </div>
  )
}

export default Mainlayout
