import ProtectedComponent from '../../../client/src/components/ProtectedComponent'

const TransitionExample = () => {
 const { isOpen, onOpen, onClose } = useDisclosure()
 const cancelRef = React.useRef()

 return (
  <ProtectedComponent>
   <AlertDialog
    motionPreset="slideInBottom"
    leastDestructiveRef={cancelRef}
    onClose={onClose}
    isOpen={isOpen}
    isCentered
   >
    <AlertDialogOverlay />

    <AlertDialogContent>
     <AlertDialogHeader>Set Transaction Pin</AlertDialogHeader>
     <AlertDialogCloseButton />
     <AlertDialogBody>
      You need to set your Transaction pin to be able to make a transaction so
      as to further security to you money
     </AlertDialogBody>
     <AlertDialogFooter>
      <Button ref={cancelRef} onClick={onClose}>
       Maybe Later
      </Button>
      <Button colorScheme="red" ml={3}>
       Set now
      </Button>
     </AlertDialogFooter>
    </AlertDialogContent>
   </AlertDialog>
  </ProtectedComponent>
 )
}
export default TransitionExample
