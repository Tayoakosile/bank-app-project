import { Avatar } from "@chakra-ui/avatar";
import { reactLocalStorage } from "reactjs-localstorage";
import { toast, ToastContainer } from "react-toastify";
import {
  Box,
  Center,
  Heading,
  HStack,
  VStack,
  Divider,
  Spacer,
} from "@chakra-ui/layout";
import {
  FormControl,
  Button,
  FormLabel,
  Icon,
  Input,
  useClipboard,
} from "@chakra-ui/react";
import randomatic from "randomatic";
import React from "react";
import { BsClipboard } from "react-icons/bs";
import { IoCheckmarkDoneOutline, IoSettingsOutline } from "react-icons/io5";
import Back from "../../components/Back";
import MetaTags from "../../components/MetaTags";
import ProtectedComponent from "../../components/ProtectedComponent";
import useUpdateProfile from "../../hooks/useUpdateProfile";
import { useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const history = useHistory();
  const {
    handleImageUpload,
    updateUserProfile,
    imageDisplayLink,
    firstname,
    isSuccess,
    isLoading,
    lastname,
    account,
    profileImg,
    email,
    username,
    userAccountNumber,
  } = useUpdateProfile();
  console.log(imageDisplayLink);
  const { hasCopied, onCopy } = useClipboard(userAccountNumber);
  return (
    <ProtectedComponent>
      <MetaTags
        title={`${firstname}'s Profile Page - Moneydais App`}
        id={randomatic("01", 12)}
      />
      {isSuccess && (
        <Box>
          <Box as="section" h="52" className="profile_header">
            <HStack px="2" pr="4" py="6">
              <HStack as="span">
                <Back noBackground={true} />
                <Heading size="md" color="white">
                  {" "}
                  Profile
                </Heading>
              </HStack>
              <Spacer />
              <Icon
                as={IoSettingsOutline}
                w="7"
                h="7"
                color="white"
                onClick={() => {
                  history.push(`/account/setting`);
                }}
              />
            </HStack>

            <VStack my="10" spacing="2" w="80%" mx="auto">
              <Avatar
                size="2xl"
                shadow="lg"
                bg="gray.50"
                color="brand.800"
                loading="lazy"
                name={`${firstname} ${lastname}`}
                src={
                  updateUserProfile.image
                    ? updateUserProfile.image &&
                      URL.createObjectURL(updateUserProfile.image)
                    : imageDisplayLink
                }
              />

              <Center>
                <FormControl id="file">
                  <FormLabel
                    color="brand.800"
                    htmlFor="file"
                    fontWeight="normal"
                  >
                    Change Image
                  </FormLabel>
                  <Input
                    type="file"
                    accept="image/*"
                    id="file"
                    d="none"
                    onChange={handleImageUpload}
                  />
                </FormControl>
              </Center>
            </VStack>
          </Box>
          {/* User account number */}
          <Box w="90%" bg="gray.50" h="24" mt="32" mx="auto">
            <VStack p="4" spacing="0">
              <Heading size="sm" fontWeight="normal">
                Account Number
              </Heading>

              <HStack
                onClick={() => {
                  onCopy();
                  toast.success("Copied Account Number to Clipboard", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                }}
              >
                <Heading size="lg">{account && account.account_number}</Heading>
                <Icon
                  as={!hasCopied ? BsClipboard : IoCheckmarkDoneOutline}
                  w="5"
                  h="5"
                />
              </HStack>
            </VStack>
          </Box>
        </Box>
      )}
      {/* Acccount number and date joined */}
      {/* <Box w="90%" bg="gray.100" h="24" mx="auto" mt="6"></Box> */}
      {/* Acccount number and date joined */}
      <Box mx="5">
        <Box as={ToastContainer} w="90%" mx="auto" mt="3" />
      </Box>
      <Box pl="4" pt="6">
        <Heading size="sm">Contact Details</Heading>
        <VStack alignItems="flex-start" w="full" mt="4" spacing="3">
          <HStack h="12" w="90%">
            <Heading size="sm" fontWeight="normal">
              Name
            </Heading>
            <Spacer />
            <Heading size="sm">
              {firstname} {lastname}
            </Heading>
          </HStack>
          <Divider />
          <HStack h="12" w="90%">
            <Heading size="sm" fontWeight="normal">
              Username
            </Heading>
            <Spacer />
            <Heading size="sm">{username}</Heading>
          </HStack>
          <Divider />
          <HStack h="12" w="96%" mr="4">
            <Heading size="sm" w="80%" fontWeight="normal">
              Email
            </Heading>
            <Spacer />
            <Heading size="sm">{email}</Heading>
          </HStack>
        </VStack>
      </Box>

      <Box w="90%" mt="8">
        <Button
          variant="ghost"
          onClick={() => {
            reactLocalStorage.remove("userToken");
            history.push("/login");
          }}
          textAlign="left"
          h="16"
          size="lg"
        >
          Sign Out
        </Button>
      </Box>
      <Box w="12" h="12" mt="24"></Box>
    </ProtectedComponent>
  );
};

export default Profile;
