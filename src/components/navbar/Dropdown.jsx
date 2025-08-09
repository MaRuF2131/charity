import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';

const CustomDropdown = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = ["/my-post", "/add-volunteer"].includes(location.pathname);

  return (
    <li className="z-[999] px-2 py-1 text-xl text-center">
      <DropdownMenu.Root open={open} onOpenChange={setOpen}>
        <DropdownMenu.Trigger asChild>
          <button
            className={`font-semibold cursor-pointer transition-colors duration-200 ${
              isActive ? "text-blue-600 underline" : "text-gray-900 hover:text-blue-600"
            }`}
          >
            Profile
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content asChild sideOffset={8}>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white dark:bg-gray-500 z-[999] rounded-lg shadow-xl p-2 border border-gray-200 w-56"
            >
              <DropdownMenu.Item className="px-3 py-2 rounded-md cursor-pointer hover:bg-blue-100">
                <NavLink
                  to="/my-post"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-semibold underline"
                      : "text-gray-900 font-semibold hover:text-blue-600"
                  }
                >
                  My Posts
                </NavLink>
              </DropdownMenu.Item>

              <DropdownMenu.Item className="px-3 py-2 rounded-md cursor-pointer hover:bg-blue-100">
                <NavLink
                  to="/add-volunteer"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-semibold underline"
                      : "text-gray-900 font-semibold hover:text-blue-600"
                  }
                >
                  Add Volunteer
                </NavLink>
              </DropdownMenu.Item>
            </motion.div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </li>
  );
};

export default CustomDropdown;
