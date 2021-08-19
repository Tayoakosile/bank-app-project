import { Avatar } from '@chakra-ui/avatar'
import { Center, VStack } from '@chakra-ui/layout'
import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'
import useUpdateProfile from '../../hooks/useUpdateProfile'
import ProtectedComponent from '../../components/ProtectedComponent'
import UpdateProfileForm from './UpdateProfileForm'

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
 } = useUpdateProfile()

 return (
  <ProtectedComponent>
   {isSuccess && (
    <VStack mt="12" spacing="4" w="80%" mx="auto">
     <Avatar
      size="2xl"
      rounded="3"
      shadow="md"
      borderRadius="3"
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
       <FormLabel htmlFor="file" fontWeight="normal">
        Change Image {isLoading && `loading ooo `}
       </FormLabel>
       <Input type="file" id="file" d="none" onChange={handleImageUpload} />
      </FormControl>
     </Center>
    </VStack>
   )}
   <UpdateProfileForm />
  </ProtectedComponent>
 )
}

export default Profile
