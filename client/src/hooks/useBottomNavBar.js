import React, { useEffect, useState } from "react";
import { IoHomeSharp } from "react-icons/io5";
import { FiBarChart } from "react-icons/fi";
import { useHistory, useLocation } from "react-router-dom";
const useBottomNavBar = () => {
  // Manages nav visibility based on page url
  const [ToggleBottomNavVisibility, setToggleNavVisibility] = useState(false);
  // Manages nav visibility based on page url
  const history = useHistory();
  const location = useLocation().pathname;

  useEffect(() => {
    location === "/" ||
    location.includes("account/fund-success/") ||
    location === "/account/fund-account" ||
    location === "/signup" ||
    location === "/login" ||
    location === "/account/transfer/monsecure-success" ||
    location === "/account/transfer/monsecure-success" ||
    location === "/account/transfer/monsecure/confirm" ||
    location === "/account/transfer/monsecure/confirm/pin" ||
    location === "/verifyaccount" ||
    location === "/account/transfer/monsecure"
      ? setToggleNavVisibility(false)
      : setToggleNavVisibility(true);
  }, [location]);

  const bottomNavItems = [
    {
      title: "Home",

      icon: <IoHomeSharp style={{ fontSize: "18px", color: "yellow" }} />,

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
      onClick: () => history.push("/transactionhistory"),
    },

    {
      title: "Profile",
      icon: <FiBarChart style={{ fontSize: "18px" }} />,
      activeIcon: <FiBarChart style={{ fontSize: "18px", color: "red" }} />,
      activeBgColor: "red",
      onClick: () => history.push("/setting"),
      //   onClick: () => alert(" clicked"),
    },
  ];
  return { bottomNavItems, ToggleBottomNavVisibility };
};

export default useBottomNavBar;
