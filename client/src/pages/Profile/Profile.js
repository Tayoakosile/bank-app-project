import { Avatar, AvatarBadge } from '@chakra-ui/avatar'
import { Box, Center, VStack } from '@chakra-ui/layout'
import React, { useEffect, useState } from 'react'
import {
 FormControl,
 FormLabel,
 FormErrorMessage,
 FormHelperText,
 Input,
} from '@chakra-ui/react'
import useAuth from '../../auth/useAuth'

const Profile = () => {
 const { data, isSuccess } = useAuth()

 const [userInfo, setUser] = useState()
 useEffect(() => {
  if (isSuccess) {
   setUser(data.authorizedData)
  }
 }, [isSuccess, data])
 console.log(data, userInfo)
 const { firstname, lastname, email, username } =
  userInfo !== undefined && userInfo

 return (
  <>
   {isSuccess && (
    <VStack mt="12" spacing="8" w="80%" mx="auto">
     {/* You can also change the borderColor and bg of the badge */}
     <Avatar size="xl" rounded="8" name={`${firstname} ${lastname}`} />
     <Center>
      <FormControl id="email">
       <FormLabel htmlFor="uploadPic">Change Profile Image|</FormLabel>
       <Input type="file" id="uploadPic" d="none" />
      </FormControl>
     </Center>
    </VStack>
   )}
  </>
 )
}

export default Profile
