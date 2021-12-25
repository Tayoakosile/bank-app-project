import randomatic from "randomatic";
import React from "react";
import { Avatar, AvatarBadge } from "@chakra-ui/avatar";
import { Box, Center, Heading, HStack, VStack } from "@chakra-ui/layout";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { BsCamera } from "react-icons/bs";
import Back from "../../components/Back";
import MetaTags from "../../components/MetaTags";
import ProtectedComponent from "../../components/ProtectedComponent";
import useUpdateProfile from "../../hooks/useUpdateProfile";
import UpdateProfileForm from "./UpdateProfileForm";

const Profile = () => {
  const {
    handleImageUpload,
    updateUserProfile,
    imageDisplayLink,
    firstname,
    isSuccess,
    isLoading,
    lastname,
    profileImg,
    email,
    username,
  } = useUpdateProfile();

  return (
    <ProtectedComponent>
      <MetaTags
        title={`${firstname}'s Profile Page - Moneydais App`}
        id={randomatic("01", 12)}
      />
      {isSuccess && (
        <Box>
          <Box h="64" bg="brand.500">
            <HStack px="2" py="6">
              <Back noBackground={true} />
              <Heading size="md" color="white">
                {" "}
                Profile
              </Heading>
            </HStack>

            <VStack mt="4" spacing="2" w="80%" mx="auto">
              <Avatar
                size="xl"
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
                  <FormLabel color="white" htmlFor="file" fontWeight="normal">
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
        </Box>
      )}
      {/* Acccount number and date joined */}
      <Box w="90%" bg="gray.100" h="24" mx="auto" mt="6"></Box>
      {/* Acccount number and date joined */}
      <UpdateProfileForm />
    </ProtectedComponent>
  );
};

export default Profile;
