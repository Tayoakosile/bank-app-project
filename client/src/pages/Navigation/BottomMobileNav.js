import React from "react";
import { HStack, Box, Text } from "@chakra-ui/layout";
import BottomNavigation from "reactjs-bottom-navigation";
import "reactjs-bottom-navigation/dist/index.css";
import useBottomNavBar from "../../hooks/useBottomNavBar";
import ProtectedComponent from "../../components/ProtectedComponent";

const BottomMobileNav = () => {
  const { ToggleBottomNavVisibility, bottomNavItems } = useBottomNavBar();
  return (
    <>
      {ToggleBottomNavVisibility && (
        <ProtectedComponent>
          <Box
            position="fixed"
            zIndex="12"
            bottom="0"
            h="12"
            bg="brand.500"
            overflow="hidden"
            as="nav"
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
