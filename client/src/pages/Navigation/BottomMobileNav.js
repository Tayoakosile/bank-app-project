import React from "react";
import { HStack, Box, Text } from "@chakra-ui/layout";
import BottomNavigation from "reactjs-bottom-navigation";
import "reactjs-bottom-navigation/dist/index.css";
import useBottomNavBar from "../../hooks/useBottomNavBar";
import ProtectedComponent from "../../components/ProtectedComponent";

const BottomMobileNav = () => {
  const { ToggleBottomNavVisibility, bottomNavItems } = useBottomNavBar();
  console.log("nave here", ToggleBottomNavVisibility);
  return (
    <>
      {ToggleBottomNavVisibility && (
        <ProtectedComponent>
          <Box
            position="fixed"
            zIndex="12"
            bottom="0"
            h="12"
            overflow=" hidden"
            as="nav"
            _before={{
              content:"''",
              position: "absolute",
              top: "0px",
              left: "0px",
              bottom: "0px",
              right: "0px",
              border: "1px solid orange",
            }}
          >
            <BottomNavigation
              items={bottomNavItems}
              activeBgColor="transparent"
              activeTextColor="#0e3e84"
              defaultSelected={0}
            ></BottomNavigation>
          </Box>
        </ProtectedComponent>
      )}
    </>
  );
};

export default BottomMobileNav;
