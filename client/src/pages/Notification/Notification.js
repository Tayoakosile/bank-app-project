import { Box, Heading, HStack, VStack } from "@chakra-ui/layout";
import Headroom from "react-headroom";
import Back from "../../components/Back";
import Transactions from "./Transactions";
import ProtectedComponent from "../../components/ProtectedComponent";
import useNotification from "../../hooks/useNotification";
import randomatic from "randomatic";

const Notification = () => {
  const { isLoading, isError, isSuccess, data, allNotification } =
    useNotification();
  console.log(allNotification);
  if (isError) {
    return <div>An error occured</div>;
  }
  return (
    <Box h="100%">
      {/* Notification Heading */}
      <Headroom>
        <HStack bg="brand.500" py="6" mb="4" pl={2} spacing="4">
          <Back color="white" />
          <Heading size="md" color="white">
            Notifications
          </Heading>
        </HStack>
      </Headroom>
      {/* Notification Heading */}

      {/* Notification Body */}
      <VStack spacing="4" mt="8" alignItems="flex-start" px="4">
        {!isLoading && isSuccess && allNotification.length >= 1
          ? allNotification.map((notification) => (
              <Transactions
                notification={notification}
                key={randomatic("0a", 6)}
              />
            ))
          : "Nothing to show here"}
      </VStack>
      {/* Notification Body */}

      <Box h="12" w="12" mt="20"></Box>
    </Box>
  );
};

export default Notification;
