import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../mytools/context/context"
import DarkModeToggle from "../../mytools/Toggletheme/Toggletheme";
import Dropdown from './Dropdown'
import { FiMenu } from "react-icons/fi";


const navlist = [
  { title: "Home", path: '/' },
  { title: "Volunteer posts", path:'/all-volunteer-needs'},
  { title: "Donate", path: '/donate' },
];
const navlist2 = [
  { title: "Login", path: '/login' },
  { title: "SignUp", path:'/signup'},
];

const Sidebar=()=>{
    const { user, logout } = useAuthContext();
    return(
      <div className={`z-[999] w-dvw h-fit absolute -right-3 top-10 bg-gray-400 dark:bg-gray-600 flex flex-col justify-start items-start px-4 py-2 gap-6 overflow-auto`}>
        <ul className="flex flex-col gap-6 items-start ">
        {navlist.map((item, idx) => (
          <li key={idx} className=" px-2 py-1 text-xl text-center">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-600 font-semibold underline cursor-pointer'
                  : 'text-gray-900 font-semibold hover:text-blue-600 cursor-pointer'
              }
            >
              {item.title}
            </NavLink>
          </li>
        ))}
          <Dropdown></Dropdown>
      </ul>
      <ul className="flex  gap-6 items-center">
         {
          user?(
            <>
              <li className=" px-2 py-1 text-xl text-center">
                    <button onClick={logout} className="text-gray-900 font-semibold hover:text-blue-600 cursor-pointer">
                        Logout
                    </button>
              </li>
              <li className="group w-14 h-14 outline-none rounded-full ring-offset-2 ring-blue-800 lg:focus:ring-2">
                <img className="w-full h-full rounded-full border-2 border-blue-500/50" src={user?.photoURL} referrerPolicy="no-referrer" alt="profile" />
                <div className="group-hover:block hidden w-fit min-w-50 absolute right-0 h-fit px-4 py-2 bg-gray-400 rounded-md space-y-3">
                    <p className="hover:bg-blue-100 px-3 py-2 w-full text-center rounded-md cursor-pointer">{user.displayName}</p>
                    <button onClick={logout} className="hover:bg-blue-100 text-center px-3 py-2 w-full rounded-md cursor-pointer">logout</button>
                </div>
              </li>
            </>
          ):(
            <>
              {navlist2.map((item, idx) => (
                  <li key={idx} className=" px-2 py-1 text-xl text-center">
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        isActive
                          ? 'text-blue-600 font-semibold underline cursor-pointer'
                          : 'text-gray-900 font-semibold hover:text-blue-600 cursor-pointer'
                      }
                    >
                      {item.title}
                    </NavLink>
                  </li>
              ))}
            </>
          )
         }
      </ul>
      </div>
    )
}

const Navbar = () => {
  const { user, logout } = useAuthContext();
  const[sidebarvalue,setsidebar]=useState(false)
    const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div  className={`z-[999] transition-all duration-300 ease-in-out text-black fixed w-full flex items-center justify-between px-3 py-5  ${isScrolled?'bg-white dark:bg-gray-600 ':"bg-transparent"}`}>
      <div className="logo">
        <h1 className="text-4xl  text-shadow-sm text-shadow-blue-500 ">Charity</h1>
      </div>

      <ul className="md:flex gap-6 items-center hidden">
        {navlist.map((item, idx) => (
          <li key={idx} className=" px-2 py-1 text-xl text-center">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-600 font-semibold underline cursor-pointer'
                  : 'text-gray-900 font-semibold hover:text-blue-600 cursor-pointer'
              }
            >
              {item.title}
            </NavLink>
          </li>
        ))}
          <Dropdown></Dropdown>
      </ul>
      <DarkModeToggle></DarkModeToggle>
      <ul className="md:flex hidden gap-6 items-center">
         {
          user?(
            <>
              <li className=" px-2 py-1 text-xl text-center">
                    <button onClick={logout} className="text-gray-900 font-semibold hover:text-blue-600 cursor-pointer">
                        Logout
                    </button>
              </li>
              <li className=" group w-14 h-14 relative outline-none rounded-full ring-offset-2 ring-blue-800 lg:focus:ring-2 peer:tootip">
                <img className="w-full h-full rounded-full border-2 border-blue-500/50" src={user?.photoURL} referrerPolicy="no-referrer" alt="profile" />
                <div className="group-hover:block hidden w-fit min-w-50 absolute right-0 h-fit px-4 py-2 bg-gray-400 rounded-md space-y-3">
                    <p className="hover:bg-blue-100 px-3 py-2 w-full text-center rounded-md cursor-pointer">{user.displayName}</p>
                    <button onClick={logout} className="hover:bg-blue-100 text-center px-3 py-2 w-full rounded-md cursor-pointer">logout</button>
                </div>
              </li>
            </>
          ):(
            <>
              {navlist2.map((item, idx) => (
                  <li key={idx} className=" px-2 py-1 text-xl text-center">
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        isActive
                          ? 'text-blue-600 font-semibold underline cursor-pointer'
                          : 'text-gray-900 font-semibold hover:text-blue-600 cursor-pointer'
                      }
                    >
                      {item.title}
                    </NavLink>
                  </li>
              ))}
            </>
          )
         }
      </ul>
      <div className="md:hidden block relative">
           <button  onClick={() => setsidebar(!sidebarvalue)}><FiMenu size={24} /></button>
           {sidebarvalue && <Sidebar />}
      </div>
    </div>
  );
};

export default Navbar;
