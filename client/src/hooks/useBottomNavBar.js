import React, { useEffect, useState } from "react";
import { IoHomeSharp } from "react-icons/io5";
import { FiBarChart } from "react-icons/fi";
import useStore from "../zustand/index";
import { useHistory, useLocation } from "react-router-dom";
const useBottomNavBar = () => {
  // Manages nav visibility based on page url
  const [ToggleBottomNavVisibility, setToggleNavVisibility] = useState(false);
  // Manages nav visibility based on page url
  const history = useHistory();
  const location = useLocation().pathname;
  const { userId } = useStore((state) => state);

  const homeIcon = () => {
    return (
      <>
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          ></path>
        </svg>
      </>
    );
  };

  useEffect(() => {
    location === "/" ||
    location.includes("account/fund-success/") ||
    location.includes("/verification/verify-account/") ||
    location === "/account/fund-account" ||
    location === "/signup" ||
    location.includes("/reset-password") ||
    location === "/reset-confirm" ||
    location === "/login" ||
    location === "/account/transfer/monsecure-success" ||
    location === "/account/transfer/monsecure-success" ||
    location === "/account/transfer/monsecure/confirm" ||
    location === "/account/transfer/monsecure/confirm/pin" ||
    location === "/account/transfer/monsecure/confirm/pin" ||
    location === "/verifyaccount" ||
    location === "/account/transfer/monsecure"
      ? setToggleNavVisibility(false)
      : setToggleNavVisibility(true);
  }, [location]);

  const bottomNavItems = [
    {
      title: "Home",

      icon: <homeIcon style={{ fontSize: "18px", color: "yellow" }} />,

      activeIcon: (
        <IoHomeSharp
          style={{ fontSize: "18px", fill: "#a0b8db", strokeWidth: "1" }}
        />
      ),
      onClick: () => history.push("/dashboard"),
    },

    {
      title: "Transaction History",

      icon: <FiBarChart style={{ fontSize: "18px" }} />,

      activeIcon: <FiBarChart style={{ fontSize: "18px", color: "red" }} />,
      onClick: () => history.push(`/transactionhistory/${userId}`),
    },

    {
      title: "Profile",
      icon: <FiBarChart style={{ fontSize: "18px" }} />,
      activeIcon: <FiBarChart style={{ fontSize: "18px", color: "red" }} />,
      activeBgColor: "red",
      onClick: () => history.push("/account/profile"),
      //   onClick: () => alert(" clicked"),
    },
  ];
  return { bottomNavItems, ToggleBottomNavVisibility };
};

export default useBottomNavBar;
