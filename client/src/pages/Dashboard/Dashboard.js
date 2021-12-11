import { Box, Heading } from "@chakra-ui/layout";
import React from "react";
import ProtectedComponent from "../../components/ProtectedComponent";
import useStore from "../../zustand";
import Account from "./Account/Account";
import AccountButton from "./Account/AccountButton";
import TransactionHistory from "./TransactionHistory/TransactionHistory";
const Dashboard = () => {
  // Get users details from global state
  const { user } = useStore((state) => state);

  return (
    <ProtectedComponent>
      <Account />
      <Box  py="6">
        <AccountButton />
      </Box>
        <TransactionHistory />
    </ProtectedComponent>
  );
};

export default Dashboard;
    