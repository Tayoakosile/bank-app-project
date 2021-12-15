import React, { useEffect, useState } from "react";
import { GrHomeRounded } from "react-icons/gr";
import { FiBarChart } from "react-icons/fi";
import { useHistory, useLocation } from "react-router-dom";
const useBottomNavBar = () => {
  // Manages nav visibility based on page url
  const [ToggleBottomNavVisibility, setToggleNavVisibility] = useState(null);
  // Manages nav visibility based on page url
  const history = useHistory();
  const location = useLocation().pathname;

  useEffect(() => {
    location === "/" || location === "/signup" || location === "/login"
      ? setToggleNavVisibility(false)
      : setToggleNavVisibility(true);
  }, [location]);

  const bottomNavItems = [
    {
      title: "Home",

      icon: (
        <GrHomeRounded bg="red" style={{ fontSize: "18px", color: "yellow" }} />
      ),

      activeIcon: (
        <GrHomeRounded
          style={{ fontSize: "18px", fill: "#cfdced78", strokeWidth: "1" }}
        />
      ),
      onClick: () => history.push("/dashboard"),
    },

    {
      title: "Transaction History",

      icon: <FiBarChart style={{ fontSize: "18px" }} />,

      activeIcon: <FiBarChart style={{ fontSize: "18px", color: "#fff" }} />,
      onClick: () => history.push("/transactionhistory"),
    },

    {
      title: "Profile",
      icon: <FiBarChart style={{ fontSize: "18px" }} />,
      activeIcon: <FiBarChart style={{ fontSize: "18px", color: "#fff" }} />,
      activeBgColor: "red",
      onClick: () => history.push("/setting"),
      //   onClick: () => alert(" clicked"),
    },
  ];
  return { bottomNavItems, ToggleBottomNavVisibility };
};

export default useBottomNavBar;
