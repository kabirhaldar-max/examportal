import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2025{" "}
        <Link to={"/"} className="hover:underline">
          ISUCCESSNODE
        </Link>
        . All Rights Reserved.
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <a href="https://www.isuccessnode.com/refund-policy" className="hover:underline me-4 md:me-6">
            Refund Policy
          </a>
        </li>
        <li>
          <a href="https://www.isuccessnode.com/privacy-policy" className="hover:underline me-4 md:me-6">
            Privacy Policy
          </a>
        </li>
        <li>
          <a href="https://www.isuccessnode.com/terms-and-conditions" className="hover:underline me-4 md:me-6">
          Terms and Conditions
          </a>
        </li>
        <li>
          <a href="https://www.pmiusservices.com/contact" className="hover:underline">
            Contact
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
