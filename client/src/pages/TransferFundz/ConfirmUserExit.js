import { Button } from '@chakra-ui/button'
import { HStack, PinInput, PinInputField, Spacer, Text } from '@chakra-ui/react'
import {
 Modal,
 ModalBody,
 ModalCloseButton,
 ModalContent,
 ModalFooter,
 ModalHeader,
 ModalOverlay,
} from '@chakra-ui/modal'
import React, { useEffect, useState } from 'react'
import useTransferFundz from './useTransferFundz'
import useStore from '../../zustand'
import { Redirect } from 'react-router'
import ProtectedComponent from '../../components/ProtectedComponent'

export default function InitialFocus({ isOpen, onOpen, onClose }) {
 const { handlePinValidation, isError, isLoading } = useTransferFundz()
 const [userPin, setUserPin] = useState(undefined)
 const [redirectToUserSetPin, setRedirectToUserSetPin] = useState(false)
 const { user } = useStore(state => state)

 useEffect(() => {
  if (user) {
   setUserPin(user.transaction_pin)
  }
 }, [user])

 return (
  <ProtectedComponent>
   <Modal
    blockScrollOnMount={true}
    isCentered={true}
    closeOnOverlayClick={false}
    isOpen={isOpen}
    onClose={onClose}
   >
    <ModalOverlay />

    {userPin ? (
     <ModalContent d="flex">
      <ModalHeader>Enter Transaction pin</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
       <HStack>
        <PinInput isInvalid={isError} mask onComplete={handlePinValidation}>
         <PinInputField />
         <PinInputField />
         <PinInputField />
         <PinInputField />
        </PinInput>
       </HStack>
      </ModalBody>

      <ModalFooter>
       <Button colorScheme="blue" mr={3} isLoading={isLoading}>
        Transfer
       </Button>
      </ModalFooter>
     </ModalContent>
    ) : (
     <ModalContent>
      <ModalHeader> Transaction Pin not set</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
       You need to set Transaction pin in order to continue with the transaction
      </ModalBody>

      <ModalFooter>
       <Spacer />
       <Spacer />
       <Spacer />
       <Spacer />
       <Button variant="link" mr={3} onClick={onClose}>
        Cancel
       </Button>
       <Spacer />

       <Button colorScheme="blue" onClick={() => setRedirectToUserSetPin(true)}>
        Set Pin
       </Button>
      </ModalFooter>
     </ModalContent>
    )}
   </Modal>
   {redirectToUserSetPin && (
    <Redirect to="/account/transaction-pin/set"></Redirect>
   )}
  </ProtectedComponent>
 )
}
