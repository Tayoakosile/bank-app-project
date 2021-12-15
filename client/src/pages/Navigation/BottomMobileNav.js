import React from "react";
import { HStack, Box, Text } from "@chakra-ui/layout";
import BottomNavigation from "reactjs-bottom-navigation";
import "reactjs-bottom-navigation/dist/index.css";
import useBottomNavBar from "../../hooks/useBottomNavBar";

const BottomMobileNav = () => {
  const { ToggleBottomNavVisibility, bottomNavItems } = useBottomNavBar();
  console.log("nave here", ToggleBottomNavVisibility);
  return (
    <>
      {ToggleBottomNavVisibility && (
        <Box position="fixed" zIndex="12" bottom="0" h="12" as="nav">
          <BottomNavigation
            items={bottomNavItems}
            activeBgColor="#cfdced78"
            activeTextColor="#0e3e84"
            defaultSelected={0}
          ></BottomNavigation>
        </Box>
      )}
    </>
  );
};

export default BottomMobileNav;
