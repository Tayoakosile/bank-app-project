import React from "react";
import { Box } from "@chakra-ui/react";
import useFundAccountSuccess from "../../hooks/useFundAccountSuccess";

const FundSuccess = () => {
  const { ref } = useFundAccountSuccess();
  console.log(ref);
  return <Box>success</Box>;
};

export default FundSuccess;
