import { useState } from "react";
import { NavLink } from "react-router-dom";
import menuItems from "../assets/data/menuItems.json";

const NavBar = () => {
  const activeClass = "text-white";
  const inactiveClass = "text-gray-300 hover:text-white";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <aside className="w-full md:w-1/4 bg-gray-500 text-white p-4 min-w-40 md:max-w-60 md:min-h-dvh">
      <div className="flex justify-between items-start">
        <h1 className="text-xl font-bold">Drive Track</h1>
        <button
          onClick={toggleMenu}
          className="text-white hover:underline md:hidden"
        >
          {isMenuOpen ? "Close" : "Menu"}
        </button>
      </div>
      <ul
        className={`mt-4 space-y-2 md:block md:space-y-0 md:space-x-4 ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        {menuItems.data.map((item, index) => (
          <li key={index} className="mb-4 hover:text-gray-300 cursor-pointer">
            <NavLink
              to={item.url}
              className={({ isActive }) =>
                isActive ? activeClass : inactiveClass
              }
            >
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default NavBar;
