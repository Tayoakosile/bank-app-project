import {
 AlertDialog,
 AlertDialogBody,
 AlertDialogContent,
 AlertDialogFooter,
 AlertDialogHeader,
 AlertDialogOverlay,
 Button,
} from '@chakra-ui/react'
import React from 'react'
import useAuth from '../../auth/useAuth'
export default function BasicUsage() {
 const { isUserInActive } = useAuth()
 const onClose = () => {}
 console.log(isUserInActive)
 const cancelRef = React.useRef()

 return (
  <>
   <AlertDialog
    isOpen={isUserInActive}
    leastDestructiveRef={cancelRef}
    onClose={onClose}
   >
    <AlertDialogOverlay>
     <AlertDialogContent>
      <AlertDialogHeader fontSize="lg" fontWeight="bold">
       Delete Customer
      </AlertDialogHeader>

      <AlertDialogBody>
       Are you sure? You can't undo this action afterwards.
      </AlertDialogBody>

      <AlertDialogFooter>
       <Button ref={cancelRef} onClick={onClose}>
        Cancel
       </Button>
       <Button colorScheme="red" onClick={onClose} ml={3}>
        Delete
       </Button>
      </AlertDialogFooter>
     </AlertDialogContent>
    </AlertDialogOverlay>
   </AlertDialog>
  </>
 )
}
