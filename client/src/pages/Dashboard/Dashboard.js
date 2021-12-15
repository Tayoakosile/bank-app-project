import { Box } from "@chakra-ui/layout";
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
      <Box h="full" mb="64" as="section">
        <Account />
        <Box py="6">
          <AccountButton />
        </Box>
        <Box mb="12">
          <TransactionHistory />
          <TransactionHistory />
          <Box h="12" mt ="12"></Box>
        </Box>
      </Box>
    </ProtectedComponent>
  );
};

export default Dashboard;
