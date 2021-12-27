import { Avatar } from "@chakra-ui/avatar";
import { toast, ToastContainer } from "react-toastify";
import { Box, Center, Heading, HStack, VStack } from "@chakra-ui/layout";
import {
  FormControl,
  FormLabel,
  Icon,
  Input,
  useClipboard,
} from "@chakra-ui/react";
import randomatic from "randomatic";
import React from "react";
import { BsClipboard } from "react-icons/bs";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import Back from "../../components/Back";
import MetaTags from "../../components/MetaTags";
import ProtectedComponent from "../../components/ProtectedComponent";
import useUpdateProfile from "../../hooks/useUpdateProfile";
import "react-toastify/dist/ReactToastify.css";
const Profile = () => {
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
            <HStack px="2" py="6">
              <Back noBackground={true} />
              <Heading size="md" color="white">
                {" "}
                Profile
              </Heading>
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
      <Box pl="4" pt ='6'>
        <Heading size="sm">Contact Details</Heading>
      </Box>
    </ProtectedComponent>
  );
};

export default Profile;
