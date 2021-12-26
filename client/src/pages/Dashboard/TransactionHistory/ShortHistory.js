import { Box } from "@chakra-ui/layout";
import React from "react";
import ProtectedComponent from "../../../components/ProtectedComponent";

const ShortHistory = () => {
  return (
    <ProtectedComponent>
      <Box>history</Box>
    </ProtectedComponent>
  );
};

export default ShortHistory;
