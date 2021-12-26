import { Box } from "@chakra-ui/layout";
import randomatic from "randomatic";
import React from "react";
import MetaTags from "../../components/MetaTags";
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
      <MetaTags
        title={`${user.firstname} ${user.lastname}'s user Dashboard`}
        id={randomatic("01", 12)}
      />
      <Box h="full" mb="64" as="section">
        <Account />
        <Box py="6">
          <AccountButton />
        </Box>
        <Box mb="12">
          <TransactionHistory />
          <Box h="12" mt="12"></Box>
        </Box>
      </Box>
    </ProtectedComponent>
  );
};

export default Dashboard;
