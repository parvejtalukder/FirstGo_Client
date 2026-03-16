import React from 'react';
import Logo from '../../components/Logo/Logo';
import { NavLink } from 'react-router';
import { GoArrowUpRight } from 'react-icons/go';

const Header = () => {
  const Links = [
    { name: "Services", to: "/services" },
    { name: "Coverage", to: "/coverage" },
    { name: "About Us", to: "/about" },
    { name: "Pricing", to: "/pricing" },
    { name: "Blog", to: "/blog" },
    { name: "Contact", to: "/contact" },
  ];

  return (
    <header>
      <div className="navbar bg-base-100 shadow-sm rounded-2xl px-4 sm:px-8 py-3 sm:py-4">
        
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden p-2 sm:p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul tabIndex={-1} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
              {Links.map((link, idx) => (
                <li key={idx} className="text-sm sm:text-base font-medium">
                  <NavLink to={link.to}>{link.name}</NavLink>
                </li>
              ))}
            </ul>
          </div>

          <NavLink to={"/"} className="ml-2 sm:ml-4 text-xl sm:text-2xl">
            <Logo />
          </NavLink>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {Links.map((link, idx) => (
              <li key={idx} className="text-sm sm:text-base font-medium mx-1 sm:mx-2">
                <NavLink to={link.to}>{link.name}</NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-end flex items-center gap-2 sm:gap-3">
          <NavLink 
            to={"/sign-in"} 
            className="btn px-3 sm:px-4 py-2 sm:py-3 font-bold text-sm sm:text-base text-[#0B0B0B] bg-white rounded-2xl"
          >
            Sign In
          </NavLink>
          <NavLink 
            to={"/sign-up"} 
            className="btn px-3 sm:px-4 py-2 sm:py-3 font-bold text-sm sm:text-base text-[#0B0B0B] bg-primary rounded-2xl"
          >
            Sign Up
          </NavLink>

          <div className="h-8 w-8 sm:h-10 sm:w-10 bg-secondary rounded-2xl flex items-center justify-center">
            <GoArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;