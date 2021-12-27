import { Avatar } from "@chakra-ui/avatar";
import { Box, Center, Heading, HStack, VStack } from "@chakra-ui/layout";
import { FormControl, FormLabel, Icon, Input } from "@chakra-ui/react";
import randomatic from "randomatic";
import React from "react";
import { BsClipboard } from "react-icons/bs";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import Back from "../../components/Back";
import MetaTags from "../../components/MetaTags";
import ProtectedComponent from "../../components/ProtectedComponent";
import useUpdateProfile from "../../hooks/useUpdateProfile";

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
    CopyAccountToClipboard,
    userAccountNumber,
    hasCopied,
k  } = useUpdateProfile();
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
                borderRadius="50%"
                bg="gray.50"
                color="brand.800"
                loading="lazy"
                accept="image/*"
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
                    Change Image {isLoading && `loading ooo `}
                  </FormLabel>
                  <Input
                    type="file"
                    id="file"
                    d="none"
                    onChange={handleImageUpload}
                  />
                </FormControl>
              </Center>
            </VStack>
          </Box>

          <Box mt="32" mx="6">
            <Heading size="sm" color="gray.500" fontWeight="normal">
              Personal Info
            </Heading>
            {/* User Information */}
            <VStack spacing="4" alignItems="flex-start" mt="4">
              <HStack spacing="4">
                <Heading size="sm" fontWeight="normal">
                  Name
                </Heading>
                <Heading size="sm">
                  {firstname} {lastname}
                </Heading>
              </HStack>

              <HStack spacing="4">
                <Heading size="sm" fontWeight="normal">
                  Email
                </Heading>
                <Heading size="sm">{email}</Heading>
              </HStack>

              <HStack spacing="4">
                <Heading size="sm" fontWeight="normal">
                  Acct Number :
                </Heading>

                {/* Account number */}
                {/* Copies account number to clipboard */}
                <HStack
                  as="span"
                  onClick={CopyAccountToClipboard}
                  alignItems="center"
                >
                  <Heading size="sm">
                    {account && account.account_number}
                  </Heading>
                  <Box as="span">
                    <Icon
                      as={!hasCopied ? BsClipboard : IoCheckmarkDoneOutline}
                      w="5"
                      color="brand.500"
                      h="5"
                    />
                  </Box>
                </HStack>
              </HStack>
            </VStack>
          </Box>
        </Box>
      )}
      {/* Acccount number and date joined */}
      {/* <Box w="90%" bg="gray.100" h="24" mx="auto" mt="6"></Box> */}
      {/* Acccount number and date joined */}
    </ProtectedComponent>
  );
};

export default Profile;
