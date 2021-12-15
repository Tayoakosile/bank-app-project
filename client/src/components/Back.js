import { IconButton } from '@chakra-ui/button'
import React from 'react'
import { useHistory } from 'react-router'
const Back = () => {
 const history = useHistory()
 const BackArrow = () => {
  return (
   <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
   >
    <path
     strokeLinecap="round"
     strokeLinejoin="round"
     strokeWidth="2"
     d="M7 16l-4-4m0 0l4-4m-4 4h18"
    />
   </svg>
  )
 }
 return (
  <>
   <IconButton
    bg="brand.500"
    p="2"
    rounded="full"
    icon={<BackArrow />}
    color="white"
    size="md"
    onClick={() => history.goBack()}
   />
  </>
 )
}

export default Back
