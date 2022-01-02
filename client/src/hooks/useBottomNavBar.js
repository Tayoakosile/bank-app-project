import React, { useEffect, useState } from "react";
import { IoHomeSharp } from "react-icons/io5";
import { FiBarChart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
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
    location === "/account/transfer/moneydais-success" ||
    location === "/account/transfer/moneydais-success" ||
    location === "/account/transfer/moneydais/confirm" ||
    location === "/account/transfer/moneydais/confirm/pin" ||
    location === "/account/transfer/moneydais/confirm/pin" ||
    location === "/verifyaccount" ||
    location === "/account/transfer/moneydais"
      ? setToggleNavVisibility(false)
      : setToggleNavVisibility(true);
  }, [location]);

  const bottomNavItems = [
    {
      title: "Home",

      icon: <IoHomeSharp style={{ fontSize: "18px", color: "#e2e8f0" }} />,

      activeIcon: (
        <IoHomeSharp
          style={{
            fontSize: "18px",
            fill: "#0e3e84",
            color: "#0e3e84",
            strokeWidth: "1",
          }}
        />
      ),
      onClick: () => history.push("/dashboard"),
    },

    {
      title: "Transaction History",

      icon: <FiBarChart style={{ fontSize: "18px", color: "#e2e8f0" }} />,

      activeIcon: (
        <FiBarChart
          style={{ fontSize: "18px", fill: "#0e3e84", color: "#0e3e84" }}
        />
      ),
      onClick: () => history.push(`/transactionhistory/${userId}`),
    },

    {
      title: "Profile",
      icon: <CgProfile style={{ fontSize: "18px", color: "#e2e8f0" }} />,
      activeIcon: (
        <CgProfile
          style={{ fontSize: "18px", fill: "#0e3e84", color: "#0e3e84" }}
        />
      ),
      activeBgColor: "red",
      onClick: () => history.push("/account/profile"),
      //   onClick: () => alert(" clicked"),
    },
  ];
  return { bottomNavItems, ToggleBottomNavVisibility };
};

export default useBottomNavBar;
