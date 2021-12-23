import { Box, Heading, HStack, VStack } from "@chakra-ui/layout";
import Headroom from "react-headroom";
import Back from "../../components/Back";
import Transactions from "./Transactions";
import ProtectedComponent from "../../components/ProtectedComponent";
import useNotification from "../../hooks/useNotification";

const Notification = () => {
  const { isLoading, isError, isFetching, isSuccess, data, allNotification } =
    useNotification();
  console.log(allNotification);
  return (
    <Box  h="100%">
      {/* Notification Heading */}
      <Headroom>
        <HStack bg="white" py="6" mb="4" pl={2} spacing="4">
          <Back />
          <Heading size="lg">Notifications</Heading>
        </HStack>
      </Headroom>
      {/* Notification Heading */}

      {/* Notification Body */}
      <VStack spacing="4" mt="8" alignItems="flex-start" px="4">
        {allNotification.length >= 1
          ? allNotification.map((notification) => (
              <Transactions notification={notification} />
            ))
          : "Nothing to show here"}
      </VStack>
      {/* Notification Body */}
      <Box h="12" w="12" mt="20"></Box>
    </Box>
  );
};

export default Notification;
